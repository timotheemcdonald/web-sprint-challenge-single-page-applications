import React, { useState, useEffect } from 'react'
import ReactDOM, {render} from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom'
import {Switch, Link, Route, useHistory} from 'react-router-dom'


function Home() {

    const history = useHistory()
    const routeToPizza = () => {
        history.push('/pizza')
    }

    return (
        <div>
        <p>This is Home</p>
        <p>Click the Button to Order a Pizza</p>
        <button onClick={routeToPizza}>Order Pizza</button>
        </div>
    )
}

export default Home;