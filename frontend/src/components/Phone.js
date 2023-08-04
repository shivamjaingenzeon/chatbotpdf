import SendIcon from "@mui/icons-material/Send";
import { Paper, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "../css/Input.css";
import "../css/Phone.css";
import Messages from "./Messages";
import { useAppStore } from "./appStore";

const FileUpload = () => {
  const [Usermsg, setUsermsg] = useState("");

  const inputHandler = (e) => {
    setUsermsg(e.target.value);
  };

  const sendHandler = async (e) => {
    let userMessage = Usermsg;
    setUsermsg("");

    useAppStore.getState().appendMessage({ id: "user", message: userMessage });

    let resp;
    try {
      resp = await axios.post(
        "http://127.0.0.1:5000/ask",
        {
          question: userMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }

    useAppStore
      .getState()
      .appendMessage({ id: "bot", message: resp.data.answer });
    console.log(resp);
  };
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      sendHandler();
    }
  };

  return (
    <div className="phone-container">
      <div className="chat-container">
        <Paper
          className="paper"
          sx={{
            height: "28.5rem",
            overflow: "scroll",
            border: "1px solid #ddd",
          }}
          elevation={0}
        >
          <div>
            <div style={{ height: "25.8rem" }}>
              <Messages />
            </div>

            <div style={{ position: "sticky", bottom: 0, left: 0, right: 0 }}>
              <div className="imput" style={{ border: "1px solid #ddd" }}>
                <Stack direction="row" spacing={0}>
                  <input
                    className="chat-input"
                    type="text"
                    placeholder="Type Here.."
                    value={Usermsg}
                    onChange={inputHandler}
                    onKeyDown={handleKeyPress}
                  />
                  <button className="chat-button" onClick={sendHandler}>
                    <SendIcon />
                  </button>
                </Stack>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default FileUpload;
