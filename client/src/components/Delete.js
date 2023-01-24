import '../App.css'
import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faHouse, faUpload} from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'
import { faTrash, faBan, faPlus, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { UserSessionContext } from '../App'
import {useParams} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

function Delete() {
    const navigate = useNavigate()
    const { userSession, setUserSession } = useContext(UserSessionContext)

    const [isLoading, setIsLoading] = useState(null)
    const [pirate, setPirate] = useState([{
        name:"",
        url:"",
        chests:0,
        phrase:"",
        position:"",
        pegLeg:true,
        eyePatch:true,
        hookHand:true
    }])

    useEffect(() => {     //making sure user is signed in
        if(userSession.loggedIn != true) {
            navigate("/")
        } else {
            console.log("User=")
            console.log(userSession)
        }
    },[])

    const {id} = useParams();
    const [show, setShow] = useState(true);
    
    useEffect(() => {
        const getPirate = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/api/pirates/${id}`)
                .then(res => {
                    console.log("getpirate")
                    console.log(res)
                    setPirate(res.data)
                })
                .catch((err) => {
                    console.error(err)
                })
                .finally(setIsLoading(false))
            } catch (err) {
                console.error(err)
            }
        }
        setIsLoading(true)
        getPirate()
    },[])

    const sendDeleteRequestToDatabase = async () => {
        try{
            const resp = await axios.delete(`http://localhost:8000/api/pirates/delete/${pirate._id}`)
            .then((res) => {
                console.log("Delete Result")
                console.log(res)
            if(res.data.name === "ValidationError") {
                //Failed Validation
                throw new Error.message("Validation Error")
            } else {
                //Passed Validation, field removed, were done
                navigate("/list")
            }
        }).catch(err => console.error(err))
        .finally(setIsLoading(false))
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        try{
            sendDeleteRequestToDatabase()
        } catch (err) {
            console.error(err)
        }
    }

    const handleClose = () => {
        setShow(false);
        navigate("/")
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Pirate</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want delete {pirate.name}?</Modal.Body>
                <Modal.Footer>
                    <Button 
                        style={{width:"100%", marginBottom:"1rem" }} 
                        variant="outline-danger"
                        onClick={handleSubmit}
                    >
                        <span><FontAwesomeIcon style={{marginRight:".5rem"}} icon={faTrash}/>Delete</span>
                    </Button>
                    <Button 
                        style={{width:"100%", marginBottom:"1rem" }} 
                        variant="outline-primary" 
                        onClick={handleClose}
                    >
                        <span><FontAwesomeIcon style={{marginRight:".5rem"}} icon={faBan}/>Cancel</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Delete