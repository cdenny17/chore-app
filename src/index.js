import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ChoreList from "./ChoreList";
var destination = document.querySelector("#container");
ReactDOM.render( <div>
    <ChoreList/> 
    </div> ,
    destination
);