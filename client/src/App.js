import './App.css';
import React, { useState, useContext, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginRes from './components/LoginRes'

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" default element={<LoginRes/>} />
          {/* <Route path="/test" element={<Test/>} />
          <Route path="/test2" element={<Test2/>} />
          <Route path="/list" element={<List/>} />
          <Route path="/new" element={<New/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/:id" element={<Detail/>} />
          <Route path="/delete/:id/" element={<Delete/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
