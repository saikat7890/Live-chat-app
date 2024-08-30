import React, { useEffect, useRef } from 'react'
import './Messages.css';
import Message from '../Message/Message';

const Messages = ({ messages, name }) => {
    const msgEndRef = useRef(null);

    useEffect(() => {
        if(msgEndRef.current){
            msgEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages])

  return (
    <div className='messages'>
        {messages.map((message, i) => 
        <div key={i}>
            <Message message={message} name={name} />
        </div>)}
        <div ref={msgEndRef}></div>
    </div>
    

  )
};

export default Messages;
