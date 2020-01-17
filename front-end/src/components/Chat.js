import React, { useState, useEffect } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = "ws://localhost:3001"

const Chat = () => {
  const [name, setName] = useState("Matt")
  const [messages, setMessages] = useState([])
  const addMessage = (msg) => {
    setMessages([
      ...messages,
      msg
    ])
  }

  const ws = new WebSocket(URL)

  useEffect(() => {
    ws.onopen = () => {
      console.log('connected')
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      addMessage(message)
    }

    return () => {
      ws.onclose = () => {
        console.log('disconnected')
      }
    }
  }, [])

  const submitMessage = messageString => {
    const newMessage = { name, message: messageString }
    ws.send(JSON.stringify(newMessage))
    addMessage(newMessage)
  }

  return (
    <div>
      <label htmlFor="name">
        Name:&nbsp;
        <input
          type="text"
          id={'name'}
          placeholder={'Enter your name...'}
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <ChatInput
        ws={ws}
        onSubmitMessage={messageString => submitMessage(messageString)}
      />
      {messages.map((message, index) => {
        return (
          <ChatMessage
            key={index}
            message={message.message}
            name={message.name}
          />
        )
      })}
    </div>
  );
}

export default Chat;