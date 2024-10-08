import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://127.0.0.1:3002';

  useEffect(() => {
    const {name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', {name, room}, (error) => {
      if(error) {
        console.log(error);
        
      }
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
    
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  console.log(message, messages);

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input 
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}/>
      </div>
    </div>
  )
}

export default Chat