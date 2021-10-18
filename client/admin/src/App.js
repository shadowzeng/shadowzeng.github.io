import logo from './logo.svg';
import './App.css';
import {Router, Route} from 'react-router'
import {Login} from './auth/Login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Router>
          <Route path='/' component={Login}></Route>
      </Router>
    </div>
  );
}

export default App;
