import React, { useRef, useState, useEffect } from "react"
import '../../styles/LoginPages.css'
import ReactDom from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import {Button, FormGroup, Form, Container, Col, Row} from 'react-bootstrap'
import axios from 'axios'

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/

const Login = () => {
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)

    const [success, setSuccess] = useState(false)
    const [backendMsg, setBackendMsg] = useState('')

    useEffect (() => {
        emailRef.current.focus(); 
    }, [])

    useEffect (() => {
        const result = EMAIL_REGEX.test(email)
        setEmailValid(result)
    }, [email])

    useEffect (() => {
        const result = PASSWORD_REGEX.test(password)
        setPasswordValid(result)
    }, [password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:8000/api/user/login', {email:email, password:password})
                if(response) {
                    console.log(JSON.stringify(response.data))
                    sessionStorage.setItem("loggedUser", JSON.stringify(response.data))
                    navigate('/users')
                }
        }
        catch (err) { 
            setBackendMsg(err.message) 
        }
    }

    const test = async () => {
        const response = await axios.get('http://localhost:8000/api/user/comefindme')
        console.log(response)
    }

    return (
        <section><button onClick={test}>press please</button>
        <h1>Login<span><p>{ backendMsg ? "  " + backendMsg : "" }</p></span></h1>
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor='emailForm'>Email:
            <span className={emailValid ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={emailValid || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
            </Form.Label>
            <Form.Control
                type='text'
                id='emailForm'
                ref={emailRef}
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={emailValid ? "false" : "true"}
                aria-describedby="emailErrorMsg"
            />
            <p id="emailErrorMsg" className={!emailValid && email ? "instructions show" : "instructions hide"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid email format
            </p> 

            <Form.Label htmlFor='passwordForm'>Password:
            <span className={passwordValid ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={passwordValid || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
            </Form.Label>
            <Form.Control
                type='password'
                id='passwordForm'
                ref={passwordRef}
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={passwordValid ? "false" : "true"}
                aria-describedby="passwordErrorMsg"
            />
            <p id="passwordErrorMsg" className={!passwordValid && password ? "instructions show" : "instructions hide"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Minimum eight characters, at least one uppercase letter, one lowercase, one number and one special character
            </p> 

            <Button type="submit" disabled={!emailValid || !passwordValid ? true : false}>Login</Button>
        </Form>
        <p>Don't have an account?</p>
        <Button type="button" href="/register" variant="link">Register</Button>
    </section>
    )
}

export default Login