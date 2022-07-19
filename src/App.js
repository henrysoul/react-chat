import React, { useState } from "react";
function App() {
  const [msg, setMsg] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [msgError, setMsgError] = useState();
  const [hasName, setHasName] = useState(false);

  const inputChangeHandler = (e) => {
    setError(false);
    const val = e.target.value;
    val && setName(e.target.value);
  };

  const msgChangeHandler = (e) => {
    setMsgError(false);
    setMsg(e.target.value);
  };

  const nameSubmitHandler = () => {
    if (name) {
      const names = JSON.parse(localStorage.getItem("names"));
      if (names) {
        if (names.includes(name)) {
          setError(true);
          return;
        }
        localStorage.setItem("names", JSON.stringify([...names, name]));
        setHasName(true);
      } else {
        localStorage.setItem("names", JSON.stringify([name]));
        setHasName(true);
      }
    }
  };

  const sendMessageHandler = () => {
    if (msg) {
      const messages = JSON.parse(localStorage.getItem("messages"));
      if (messages) {
        localStorage.setItem(
          "messages",
          JSON.stringify([...messages, { name: name, message: msg }])
        );
      } else {
        localStorage.setItem(
          "messages",
          JSON.stringify([{ name: name, message: msg }])
        );
      }
      setMsg("");
    } else {
      setMsgError(true);
    }
  };

  return (
    <>
      {!hasName && (
        <>
          <label>Enter your name</label>
          {error && <p>The name entered already exists</p>}
          <input name="name" onChange={inputChangeHandler} />
          <button onClick={nameSubmitHandler}>Submit</button>
        </>
      )}
      {hasName && (
        <>
          <label>Message</label>
          <input name="message" onChange={msgChangeHandler} value={msg || ""} />
          <button onClick={sendMessageHandler}>Send</button>
        </>
      )}
    </>
  );
}

export default App;
