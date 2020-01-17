import React, { useState } from 'react';

const ChatInput = (props) => {
  const [message, setMessage] = useState("")

  return (
    <form
      action="."
      onSubmit={e => {
        e.preventDefault()
        props.onSubmitMessage(message)
        setMessage("")
      }}
    >
      <input
        type="text"
        placeholder={"Enter message "}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <input type="submit" value={'Send'} />

    </form>
  );
}
export default ChatInput;