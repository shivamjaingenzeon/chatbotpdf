from flask import Flask, request, jsonify, session
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
import PyPDF2
import random
from langchain.chat_models import ChatOpenAI
import itertools
from flask_caching import Cache
import logging
from io import StringIO
from dotenv import load_dotenv
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.chains import QAGenerationChain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
# from langchain.llms import GPT4All, LlamaCpp
from pdf2image import convert_from_path
from langchain.callbacks.base import CallbackManager
from pytesseract import image_to_string

retriever_type = "SIMILARITY SEARCH"

load_dotenv()

model_type = os.getenv('MODEL_TYPE')
model_path = os.getenv('MODEL_PATH')
model_n_ctx = os.getenv('MODEL_N_CTX')
model_n_batch = int(os.getenv('MODEL_N_BATCH', 8))
openai_key = os.getenv("OPENAI_API_KEY")

splits=[]

callback_handler = StreamingStdOutCallbackHandler()
callback_manager = CallbackManager([callback_handler])

chat_openai = ChatOpenAI(
            streaming=True, callback_manager=callback_manager, verbose=True, temperature=0)

app = Flask(__name__)
app.secret_key = 'awsmankit'
app.config['CACHE_TYPE']='simple'
cache= Cache(app)
# Allow requests from http://localhost:3000 and any URL starting with this base URL
CORS(app, origins=[
    "http://localhost:3000",
    "http://localhost:3000/*"
])

UPLOAD_FOLDER = 'upload'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}

# Embed using OpenAI embeddings
# embeddings = OpenAIEmbeddings()

# Check and create upload directory if not exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_docs(file_path, pdf_image):
    all_text = ""
    file_extension = os.path.splitext(file_path)[1]
    if file_extension == ".pdf":
        if pdf_image == False:
            try:
                with open(file_path, 'rb') as file:
                    pdf_reader = PyPDF2.PdfReader(file)
                    text = ""
                    for page in pdf_reader.pages:
                        text += page.extract_text()
                    all_text += text
            except FileNotFoundError:
                print(f"File not found: {file_path}")
                return ""
            except IOError:
                print(f"Error opening file: {file_path}")
                return ""
        else:
            def convert_pdf_to_img(pdf_file):
                return convert_from_path(pdf_file)
            
            def convert_image_to_text(file):
                text = image_to_string(file)
                return text
            
            def get_text_from_any_pdf(pdf_file):
                images = convert_pdf_to_img(pdf_file)
                final_text = ""
                for pg, img in enumerate(images):
                    final_text += convert_image_to_text(img)
                return final_text
                
            all_text = get_text_from_any_pdf(file_path)

    elif file_extension == ".txt":
        try:
            with open(file_path, 'r') as file:
                text = file.read()
                all_text += text
        except FileNotFoundError:
            print(f"File not found: {file_path}")
            return ""
        except IOError:
            print(f"Error opening file: {file_path}")
            return ""
    else:
        print('Please provide txt or pdf.')
    return all_text

def split_texts(text, chunk_size, overlap, split_method):
    if text is None or text.strip() == '':
        print("Received empty text. Cannot perform split.")
        return []
    split_method = "RecursiveTextSplitter"
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=overlap)
    splits = text_splitter.split_text(text)
    if not splits:
        print("Failed to split document")
    return splits

def create_retriever(_embeddings, splits, retriever_type):
    try:
        vectorstore = FAISS.from_texts(splits, _embeddings) 
    except (IndexError, ValueError) as e:
        print(f"Error creating vectorstore: {e}")
        return None
    retriever = vectorstore.as_retriever(k=5)
    return retriever

def generate_eval(text, N, chunk):

    # Generate N questions from context of chunk chars
    # IN: text, N questions, chunk size to draw question from in the doc
    # OUT: eval set as JSON list

    # st.info("`Generating sample questions ...`")
    n = len(text)
    starting_indices = [random.randint(0, n-chunk) for _ in range(N)]
    sub_sequences = [text[i:i+chunk] for i in starting_indices]
    chain = QAGenerationChain.from_llm(ChatOpenAI(temperature=0))
    eval_set = []
    for i, b in enumerate(sub_sequences):
        try:
            qa = chain.run(b)
            eval_set.append(qa)
            # st.write("Creating Question:",i+1)
        except:
            print('Error generating question %s.' % str(i+1), icon="⚠️")
    eval_set_full = list(itertools.chain.from_iterable(eval_set))
    return eval_set_full

logging.basicConfig(level=logging.INFO)

@app.route('/upload', methods=['POST'])
def upload_file():
    logging.info('Running upload_file')
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    logging.info('File saved')

    # Process the uploaded file
    pdf_image = False  # Adjust this according to your requirements
    loaded_text = load_docs(file_path, pdf_image)
    if not loaded_text:
        return jsonify({'error': 'Failed to load document text'}), 400
    logging.info('Document text loaded')

    splits = split_texts(loaded_text, chunk_size=1000, overlap=0, split_method="RecursiveCharacterTextSplitter")
    if not splits:
        return jsonify({'error': 'Failed to split document text'}), 400
    logging.info('Document text split')

    #session['splits'] = splits
    cache.set('splits', splits, timeout=3000)
    return jsonify({'message': 'File uploaded and processed', 'splits': splits}), 200

@app.route('/ask', methods=['POST'])
def ask():
    
    logging.info('Running ask')
    embeddings = OpenAIEmbeddings()
    data = request.get_json()
    user_question = data.get('question')
    print(user_question)
    splits = cache.get('splits')  # Retrieve the splits from the session
    print(splits)
    if not splits:
        return jsonify({'error': 'No document uploaded yet'}), 400
    retriever = create_retriever(embeddings, splits, retriever_type= 'SE')
    if not retriever:
        # print("in if 2")
        return jsonify({'error': 'Failed to create retriever'}), 400
    callbacks = [StreamingStdOutCallbackHandler()]
    logging.info('Created retriever')

    # # Prepare the LLM
    # if model_type == "LlamaCpp":
    #     llm = LlamaCpp(model_path=model_path, max_tokens=model_n_ctx, n_batch=model_n_batch, callbacks=callbacks, verbose=False)
    # elif model_type == "GPT4All":
    #     llm = GPT4All(model=model_path, max_tokens=model_n_ctx, backend='gptj', n_batch=model_n_batch, callbacks=callbacks, verbose=False)
    # else:
    #     # raise exception if model_type is not supported
    #     raise Exception(f"Model type {model_type} is not supported. Please choose one of the following: LlamaCpp, GPT4All")
    qa = RetrievalQA.from_chain_type(llm=chat_openai, retriever=retriever, chain_type="stuff", verbose=True)
    logging.info('Prepared LLM and QA')

    # Answer the question
    answer = qa.run(user_question)
    print(answer)
    logging.info('Got answer')
    return {"answer": answer}

@app.route("/generate_questions", methods=["GET"])

def generate_questions():

    num_eval_questions = 5  # Number of questions to generate

    chunk_size = 3000  # Chunk size for generating questions

     # Retrieve the splits from the cache

    splits = cache.get('splits')

    if not splits:

        return jsonify({"error": "No document uploaded yet"}), 400

 

    # Combine the splits to get the loaded text

    loaded_text = ''.join(splits)

    generated_questions = generate_eval(loaded_text, num_eval_questions, chunk_size)

    return jsonify({"questions": generated_questions})


if __name__ == '__main__':
    app.run(port=5000)
