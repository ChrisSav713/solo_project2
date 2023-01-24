import React, { useEffect } from 'react'
import {Button, Form, Container, Col, Row, FormGroup} from 'react-bootstrap'
import './styles/GameSearchItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPenToSquare, faWater} from '@fortawesome/free-solid-svg-icons'
const GameSearchItem = (props) => {
    
    const { genres, cover, id, name, platforms, screenshots, summary, tags, url } = props
    
    return (
        <div className="item-container">
            <img
                alt="cover art"
                //src={}
                width="150px"
                height="150px"
            />
            <div className="item-description">
                <span className="item-heading">{}</span>
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