import React, {useEffect, useState} from 'react'
import {Button, FormGroup, Form, Container, Col, Row} from 'react-bootstrap'
import axios from 'axios'
import GameDetail from './GameDetail'
import GameSearchItem from './GameSearchItem'

const LoginRes = () => {
    const [accessToken, setAccessToken] = useState({})
    const [gameData, setGameData] = useState([{}])

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
            setAccessToken(token)
        } else {
            console.log('No token')
            getToken()
        }
    }

    const generateApiRequest = () => {
        document.getElementById("text1").value = JSON.stringify(getTokenPost)
        apiSearchPost.headers.Authorization = 'Bearer ' + accessToken.access_token
        document.getElementById("text2").value = "Access Token " + accessToken.access_token + " \nExpires In " + accessToken.expires_in + "\nToken Type " + accessToken.token_type        
        document.getElementById("text3").value = JSON.stringify(apiSearchPost)
    }

    const sendApiRequest = async () => {
        console.log('sending api request')
        const searchOptions = { 
            token: accessToken.access_token,
            endpoint:'/games', 
            fields:['id', 'name', 'cover.url', 'artworks.url', 'genres.name', 'storyline', 'summary', 
            'screenshots.url', 'platforms.name', 
            'platforms.platform_logo.url', 'tags', 'rating', 'url'],
            search: null, 
            where: null, 
            limit:'10', 
            offset:'10', 
            sort: null
        }
        console.log(searchOptions);
        await axios.post('http://localhost:8000/api/user/comefindme',{searchOptions:searchOptions})
        .then(res => {
        console.log('api finished');
        console.log(res.data);
        setGameData(res.data)
        }).catch(err => console.log(err))
        .finally()
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
            <ul>
            {
            gameData?.map(item => (
                <GameSearchItem key={item.id} props={item}></GameSearchItem>
            ))
            }
            </ul>
        </div>
    )
}

export default LoginRes