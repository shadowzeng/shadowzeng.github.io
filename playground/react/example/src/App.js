// import logo from './logo.svg';
// import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Home} from './components/home'
import {WelcomeDialog} from './components/composition'
import {HooksSample} from './components/hooks'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/hooks' element={<HooksSample/>}></Route>
                <Route path='/composition' element={<WelcomeDialog/>}></Route>
                <Route path='/' element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
