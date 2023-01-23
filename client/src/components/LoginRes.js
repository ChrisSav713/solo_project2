import React, {useEffect, useState} from 'react'
import {Button, FormGroup, Form, Container, Col, Row} from 'react-bootstrap'
import axios from 'axios'

const LoginRes = () => {
    const [accessToken, setAccessToken] = useState({})

    let getTokenPost = {
        method:'post',
        url: 'https://id.twitch.tv/oauth2/token',
        data:{
            client_id:'x4rniov57q0741nf6ptq41ohvlvrfs',
            client_secret:'huuyqcxyj40thirl0z9f3iawyhj9yk',
            grant_type:'client_credentials'
        }
    }
    
    let apiSearchPost = {
        method: 'POST',
        url: 'https://api.igdb.com/v4/games',
        // mode: 'no-cors',
        // withCredentials:true,
        // credentials:'same-origin',
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Client-ID': 'x4rniov57q0741nf6ptq41ohvlvrfs',
            'Authorization': 'Bearer '
        },
        body: `fields name; limit 10;`
    }

    const getToken = () => {
        console.log("generating new token")
        console.log(getTokenPost)
        axios(getTokenPost)
        .then(res => { 
            setAccessToken(res.data)
            console.log("new token is " + res.data)
            sessionStorage.setItem("accessToken", JSON.stringify(res.data))
            console.log("saved token to session")
        }).catch(err => { console.log(err) })
    }

    const checkForToken = () => {
        const token = JSON.parse(sessionStorage.getItem("accessToken"))
        if(token) {
            console.log('token exists')
        } else {
            console.log('No token')
            getToken()
        }
    }

    const generateApiRequest = () => {
        document.getElementById("text1").value = JSON.stringify(getTokenPost)
        apiSearchPost.headers.Authorization = 'Bearer ' + accessToken.access_token
        document.getElementById("text2").value = "Access Token " + accessToken.access_token + " \nExpires In " + accessToken.expires_in + " \n Token Type" + accessToken.token_type        
        document.getElementById("text3").value = JSON.stringify(apiSearchPost)
    }

    const sendApiRequest = async () => {
        console.log('sending api request')
        const searchOptions = { 
            token:accessToken.access_token, 
            endpoint:'/games', 
            fields:'*', 
            search: null, 
            where: null, 
            limit:'10', 
            offset:'10', 
            sort: null
        }
        const response = await axios.post('http://localhost:8000/api/user/comefindme',{searchOptions:searchOptions})
        
        console.log(response.data)
        //console.log(apiSearchPost)
        //axios(apiSearchPost).then(res => console.log(res.data).catch(err => console.log(res.data)))
    }

    return (
        <div>
            <Button onClick={checkForToken}>Check For Token</Button>
            <Button onClick={generateApiRequest}>Generate Api Request</Button>
            <Button onClick={sendApiRequest}>Send API Request</Button>
            <Form.Group className="mb-3">
                <Form.Label>Label 1</Form.Label>
                <Form.Control as="textarea" id="text1" rows={5} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Label 2</Form.Label>
                <Form.Control as="textarea" id="text2" rows={5} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Label 3</Form.Label>
                <Form.Control as="textarea" id="text3" rows={5} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Label 4</Form.Label>
                <Form.Control as="textarea" id="text4" rows={5} />
            </Form.Group>
        </div>
    )
}

export default LoginRes