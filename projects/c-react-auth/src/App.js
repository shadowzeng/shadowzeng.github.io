import './App.css';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import {Login} from './auth/Login'
import {Upload} from './upload/Upload'
import {Debug} from './Debug'
import {HttpTest} from './HttpTest'
import {Register} from './auth/register'

function App() {
  return (
    <div className="app">
      <Router>
        <header className="app-header">
        </header>
        <Switch>
          <Route path='/http-test' component={HttpTest}></Route>
          <Route path='/debug' component={Debug}></Route>
          <Route path='/upload' component={Upload}></Route>
          <Route path='/debug' component={Debug}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/' component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
