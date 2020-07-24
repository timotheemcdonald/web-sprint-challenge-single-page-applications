import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-dom'
import styled from 'styled-components'
import * as yup from 'yup'
import axios from 'axios'
import Pizza from './Pizza'
import {Switch, Link, Route} from 'react-router-dom'
import Home from './Home'


const Details = styled.header`

background-color:crimson;
color:ivory;
min-height:10vh;
display:flex;
justify-content:space-around;
align-items:center;

a {
  text-decoration:none;
  color:ivory;
}
`

const App = () => {
  return (
    <>
    <Details>
      <h1>Lambda Eats</h1>
     


      <Link to="/">Home</Link>
      <Link to="/pizza">Pizza</Link>
      </Details>

    <div>
      <Switch>
      <Route path="/pizza">
      <Pizza />
      </Route>
      <Route path="/">
      <Home />
      </Route>
      </Switch>
    </div>
    </>
  );
};
export default App;
