import './App.css';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import {Login} from './auth/Login'
import {Debug} from './Debug'

function App() {
  return (
    <div className="app">
      <Router>
        <header className="app-header">
        </header>
        <Switch>
          <Route path='/debug' component={Debug}></Route>
          <Route path='/' component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
