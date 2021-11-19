import './App.css';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import {Login} from './auth/Login'
import {Debug} from './Debug'

import {Example} from './ui/hook_example'

function App() {
  return (
    <div className="app">
      <Router>
        <header className="app-header">
        </header>
        <Example></Example>
        <Example></Example>
        <Switch>
          <Route path='/debug' component={Debug}></Route>
          <Route path='/' component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
