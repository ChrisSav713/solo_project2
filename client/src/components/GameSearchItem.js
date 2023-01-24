import React, { useContext, useEffect } from 'react'
import {Button, Form, Container, Col, Row, FormGroup} from 'react-bootstrap'
import '../styles/GameSearchItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPenToSquare, faWater} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../App'

const GameSearchItem = (prop) => {    
    const { game } = prop
    const navigate = useNavigate()

    return (
        <div className="item-container">
            <img
                alt="cover art"
                src={game?.cover ? game.cover.url :
                    game?.artworks ? game.artworks[0].url :
                        game?.screenshots ? game?.screenshots[0].url : ""
                    }
                width="150px"
                height="150px"
            />
            <div className="item-description">
                <span className="item-heading">{game?.name && game.name}</span>
                <div className="item-buttons">
                    <Button 
                        variant="primary"
                        className="gen-button"
                        // onClick={() => navigate('/')}
                    >
                        <span><FontAwesomeIcon className="fontAwesomeIcon" icon={faMagnifyingGlass}/></span>
                        View Pirate
                    </Button>

                    <Button 
                        variant="primary"
                        className="gen-button"
                        // onClick={() => navigate('/')}
                    >
                        <span><FontAwesomeIcon className="fontAwesomeIcon" icon={faPenToSquare}/></span>
                        Edit Pirate
                    </Button>

                    <Button 
                        variant="danger"
                        className="gen-button"
                        // onClick={() => navigate('/')}
                    >
                        <span><FontAwesomeIcon className="fontAwesomeIcon" icon={faWater}/></span>
                        Walk The Plank!
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default GameSearchItem