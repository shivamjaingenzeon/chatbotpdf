import React from "react";
import "../css/UserMessage.css";
import UserLogo from "../images/userlogo.png";
export default function UserMessage(props) {
  return (
    <div className="usermessage">
      <div className="usermessageInfo">
        <img className="chatimg" src={UserLogo} />
      </div>

      <div className="usermessageContent">
        <p className="usermessage-p">{props.message}</p>
      </div>
    </div>
  );
}
