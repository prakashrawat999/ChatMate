import React from 'react'
import { Routes, Route } from "react-router-dom"
import Error from "./Pages/Error"
import Home from "./Pages/Home"
import ChatPage from "./Pages/ChatPage"
import "./App.css"

const App = () => {
  return (
    <>
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<ChatPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
    </>
  )
}

export default App

/**
 
In ReactJS, Cross-Origin Resource Sharing (CORS) refers to the method that allows you to make requests to the server deployed at a different domain. As a reference,
 if the frontend and backend are at two different domains, we need CORS there.
 */