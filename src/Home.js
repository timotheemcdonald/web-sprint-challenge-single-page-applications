import React, { useState, useEffect } from 'react'
import ReactDOM, {render} from "react-dom";
import "./index.css";
import styled from 'styled-components'
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom'
import {Switch, Link, Route, useHistory} from 'react-router-dom'

const Div = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
text-align:center;
`

const Order = styled.button`
color:white;
border:none;
background-color: crimson;
padding:10px;
width:10%;
margin:10px;
border-radius:5px;
`

function Home() {

    const history = useHistory()
    const routeToPizza = () => {
        history.push('/pizza')
    }

    return (
        <Div>
        <p>Welcome to Lambda Eats. The best place to order Pizza online.</p>
        <p>Click the Button to Order a Pizza</p>
        <Order onClick={routeToPizza}>Order Pizza</Order>
        </Div>
    )
}

export default Home;