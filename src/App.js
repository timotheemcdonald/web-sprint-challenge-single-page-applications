import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-dom'
import styled from 'styled-components'
import * as yup from 'yup'
import axios from 'axios'
import Pizza from './Pizza'
import {Switch, Link, Route} from 'react-router-dom'
import Home from './Home'



const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>

<div>
      <Link to="/">Home</Link>
      <Link to="/pizza">Pizza</Link>
      </div>

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
