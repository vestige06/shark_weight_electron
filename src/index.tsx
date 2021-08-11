import React from 'react';
import ReactDOM from 'react-dom';
import {TemplateSetting} from '../src/pages/TemplateSetting';
import DataManage from '../src/pages/DataManage';
import SystemSettings from '../src/pages/SystemSettings'
import LoginPage from '../src/pages/Login'
import App from '../src/pages/App'
import {AlertBox} from '../src/module/AlertBox';
import {HashRouter  as Router,Switch,Route} from "react-router-dom";
import { Register } from './module/register';
import {ChangeNameAndListOrder} from './module/ChangeNameAndListOrder'
import {FormulaEditor} from './module/FormulaEditor'
import {FuzzyRecognition} from './module/FuzzyRecognition'
// import {BrowserRouter as Router,Route} from 'react-router-dom'
require('./index.css');


ReactDOM.render(
  // <React.StrictMode>
  <div>
    <Router>
    <Switch>
        <Route path='/App'><App /></Route>
        <Route path='/login'><LoginPage /></Route>
        <Route path='/DataManage'><DataManage /></Route>
        <Route path='/SystemSettings'><SystemSettings /></Route>
		    <Route path='/TemplateSetting'><TemplateSetting /></Route>
        <Route path='/AlertBox'><AlertBox /></Route>
        <Route path='/Register'><Register /></Route>
        <Route path='/ChangeNameAndListOrder'><ChangeNameAndListOrder /></Route>
        <Route path='/FormulaEditor'><FormulaEditor /></Route>
        <Route path='/FuzzyRecognition'><FuzzyRecognition /></Route>
     </Switch>
    </Router>
    </div>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// export default RouterConfig;
// reportWebVitals();

