import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Login} from './auth/Login'
import {Test} from './Test'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Router>
        <Switch>
          <Route path='/' component={Login}></Route>
          <Route path='/test' component={Test}></Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
