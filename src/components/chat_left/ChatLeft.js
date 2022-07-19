import React from "react";
import "./ChatLeft.css";

export default function ChatLeft(props) {
  return (
    <>
      <div>
        <div className="container d-flex mt-4">
          <div className="avatar" />
          <div className="blue-chat p-2 ms-3">
            <div className="white-box" />
            <div className="chat ps-5">{props.children}</div>
          </div>
        </div>
        <div className="clearFix" />
      </div>
    </>
  );
}
