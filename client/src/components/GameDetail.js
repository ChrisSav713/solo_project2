import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../App'

const GameDetail = () => {
    const navigate = useNavigate()
    const { gameSession, setGameSession } = useContext(GameContext)

    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
            </div>
            <div className="row">
                <div className="col d-flex d-lg-flex flex-column flex-grow-1">
                    <img alt="Cover art" style={{width: "auto;"}} src=
                {gameSession?.game?.cover ? gameSession.game.cover.url :
            gameSession?.game?.artworks ? gameSession.game.artworks[0].url :
                gameSession?.game?.screenshots ? gameSession?.game?.screenshots[0].url : ""
            }></img>
                    <div className="d-flex flex-grow-1" style={{height: "50px width: auto "}}></div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-grow-1" style={{height: "50px width: auto"}}>
                                <h1>{gameSession?.game?.name ? gameSession.game.name : ""}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col d-flex flex-grow-1">
                            <div className="d-flex flex-grow-1" style={{height: "50px width: auto"}}>
                                <p>{gameSession.greeting}</p>
                                {gameSession?.game?.genres && gameSession.game.genres.map(item => { 
                                    <p key={item.id}>{item.name}</p> 
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-grow-1" style={{height: "50px width: auto"}}>
                                <p>Paragraph</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 d-flex flex-column align-self-stretch">
                    <div className="d-flex flex-grow-1" style={{height: "50px width: auto"}}>
                        <p>Platforms</p>
                        {gameSession?.game?.platforms && gameSession.game.platforms.map(item => { 
                            <p key={item.id}>{item.name}</p> 
                        })}
                    </div>
                    <div className="d-flex flex-grow-1" style={{height: "50px width: auto"}}>
                        <p>{gameSession?.game?.summary ? gameSession.game.summary : ""}</p>
                    </div>
                </div>
            </div>
            <div className="row"></div>
        </div>
    )
}

export default GameDetail