import './App.css';
import React, { useState, useContext, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginRes from './components/LoginRes'
import GameDetail from './components/GameDetail'
import Login from './Pages/Login/Login'
import Register from './Pages/Login/Register'
import LandingPage from './Pages/LandingPage'

export const GameContext = React.createContext()

function App() {
  const [gameSession, setGameSession] = useState({greeting:"hello"})

  return (
    <GameContext.Provider value={{gameSession, setGameSession}}>
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" default element={<LandingPage/>} />
          <Route path="/loginRes" element={<LoginRes/>} />
          <Route path="/gameDetail" element={<GameDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
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

    </GameContext.Provider>
  );
}

export default App;
