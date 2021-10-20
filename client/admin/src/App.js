import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Login} from './auth/Login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
