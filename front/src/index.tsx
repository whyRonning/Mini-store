import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import {store} from "./store/store";
import "./components/accets/fontAwesome";
import {createGlobalStyle} from "styled-components";
import {AppContainer} from "./AppContainer";
let GlobalStyle=createGlobalStyle`
    h2{
        font-size:3.4vmin; 
    };
    input[type=text]{
        width:14vw;
        height:2vh;
        border-radius:5px;
    }
    p,label,button{
        font-size:2vmin;
    };
    button{
    user-select: none;
    cursor:pointer;
    border:none;
    background-color:#688daf;
    color:white;
    height:5vh;
    width:9vw;
    font-size:.8vw;
    transition:.2s ease;
    &:hover{
        color:#688daf;
        background:none;
        border:solid 1px #688daf;
    }
    }
    a {
        color:black;
            
        &:active{
            color:white;
        }
        
    }
    label,button,a,h2,p{
            font-family: Roboto,Arial,sans-serif;
    }
`;
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <GlobalStyle/>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
