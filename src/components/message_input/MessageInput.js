import React from "react";
import "./MessageInput.css";

export default function MessageInput() {
  return (
    <footer className="fixed-bottom p-2">
      <div className="container align-center m-auto">
        <input type="text" placeholder="type here" className="input" />
        <button className="btn btn-light" type="submit">
          send
        </button>
      </div>
    </footer>
  );
}
