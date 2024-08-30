import React from 'react'
import "./Input.css";
const Input = ({message, setMessage, sendMessage}) => {
  return (
    <div>
        <form className='form'>
            <input 
            className='input'
            type="text"
            placeholder='Type a message'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={event => event.key === "Enter" ? sendMessage(event) : null} 
            />
            <button className='sendButton' onClick={(e) => sendMessage(e)}>Send</button>
        </form>
    </div>
  )
}

export default Input