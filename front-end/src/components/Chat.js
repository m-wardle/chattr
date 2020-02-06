import React, { useState, useEffect } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import axios from 'axios';

const URL = "ws://localhost:3001"

const Chat = () => {
  const [name, setName] = useState("")
  const [messages, setMessages] = useState([])
  const addMessage = (msg) => {
    setMessages(messages => [
      ...messages,
      msg
    ])
  }

  const ws = new WebSocket(URL)

  useEffect(() => {
    axios.get('http://localhost:3001/api/messages').then(res => {
      setMessages(res.data)
    })
    ws.onopen = () => {
      console.log('connected')
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      addMessage(message)
    }

    console.log("MESSAGES: ", messages)
    return () => {
      ws.onclose = () => {
        console.log('disconnected')
      }
    }
  }, [])

  const submitMessage = messageString => {
    const newMessage = { name, message: messageString }
    ws.send(JSON.stringify(newMessage))
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
      {messages.map((message) => {
        return (
          <ChatMessage
            key={message._id}
            message={message.message}
            name={message.name}
          />
        )
      })}
    </div>
  );
}

export default Chat;