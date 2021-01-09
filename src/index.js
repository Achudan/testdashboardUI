import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import SuiteDetails from './components/SuiteDetails';
import EachTestCases from './components/EachTestCases';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <Switch > */}
        <Route exact path="/" component={App}/>
        <Route exact path="/:xmlID" render={(props)=><SuiteDetails {...props}/>}/>
        <Route exact path="/:xmlID/:dateTime" render={(props)=><EachTestCases {...props}/>}/>
        {/* <Route path="/:userid" render={(props)=><HomePage {...props}/>}/> */}
    {/* </Switch> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
