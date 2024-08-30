import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Join />} exact />
        <Route path='/chat' element={<Chat />} exact />
      </Routes>
    </>
  )
}

export default App
