import React from "react";
import "./ChatRight.css";
export default function ChatRight(props) {
  return (
    <>
      <div className="container d-flex mt-4">
        <div className="white-chat p-2 me-3">
          <div className="chat ps-2 pe-5">{props.children}</div>
          <div className="white-box_2"></div>
        </div>
        <div className="avatar"></div>
      </div>
      <div className="clearFix"></div>
    </>
  );
}
