import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import React from "react";
import "../css/Input.css";

export default function Input() {
  return (
    <div className="outer">
      <Stack direction="row" spacing={0}>
        <input className="chat-input" type="text" placeholder="Type Here.." />
        <button className="chat-button">
          <SendIcon />
        </button>
      </Stack>
    </div>
  );
}
