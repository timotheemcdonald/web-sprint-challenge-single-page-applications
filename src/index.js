import React, { useState, useEffect } from 'react'
import ReactDOM, {render} from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom'
import {Switch, Link, Route} from 'react-router-dom'


ReactDOM.render(

<Router>
<App />
</Router>
, document.getElementById("root"));
