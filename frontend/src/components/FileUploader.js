import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import "../css/FileUploader.css";
import companyLogo from "../images/hip.png";
import { useAppStore } from "./appStore";

const FileUploader = () => {
  const appendQuestion = useAppStore((state) => state.appendQuestions);

  const [selectedFileName, setSelectedFileName] = useState("No file selected");
  const [isImageBased, setIsImageBased] = useState(false);

  const handleFileChange = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFileName(file.name);
      console.log(file);
      uploadFileToBackend(file);
    } else {
      setSelectedFileName("No file selected");
    }
  }, []);

  const handleCheckboxChange = (e) => {
    setIsImageBased(e.target.checked);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
  });

  const uploadFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Replace 'YOUR_BACKEND_ENDPOINT' with the actual URL of your Python backend API
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // You can handle the response from the backend here, if needed
      console.log("File upload success:", response.data);
    } catch (error) {
      // Handle errors that might occur during the file upload
      console.error("Error uploading file:", error);
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/generate_questions"
      );

      appendQuestion(response.data.questions);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="component">
      <div className="logo-container">
        <img className="logo-image" src={companyLogo} alt="Company Logo" />
      </div>
      <div className="content">
        <h3 className="title">Benefit Advocacy Bot - Powered By GenAI</h3>
        <div className="box">
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <FaCloudUploadAlt size={35} />
            <p>Drag and drop your PDF file here, or click to browse</p>
            <span className="limit">Limit 200MB PDF, TXT</span>
            <p className="selected-file-name">{selectedFileName}</p>
          </div>
          <div className="checkbox-container">
            <input
              className="checkbox-input"
              type="checkbox"
              id="imageBasedCheckbox"
              checked={isImageBased}
              onChange={handleCheckboxChange}
            />
            <label className="checkbox-label" htmlFor="imageBasedCheckbox">
              Check this box if the PDF is image-based/scanned
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
