import React, { useEffect } from 'react'
import {Button, Form, Container, Col, Row, FormGroup} from 'react-bootstrap'
import './styles/GameSearchItem.css'

const GameSearchItem = (props) => {
    
    const { characters, covers, genres, platforms } = props
    
    useEffsect (() => {
        
    }, [])

    return (
        <div className="item-container">
            <img
                alt="cover art"
                src={covers[0]}
                width="150px"
                height="150px"
            />
            <div className="item-description">
                <span className="item-heading">{pirate.name}</span>
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