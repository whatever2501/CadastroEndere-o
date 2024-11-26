import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Cadastro from './pages/Cadastro';
import Menu from './Menu';


const App = () => {
  return (
        
      <Router>
        <Menu/>
        <Routes>
          <Route path='/' element={<Home/>}/>
            <Route path='/About' element={<About/>}/>
            <Route  path="/Cadastro" element={<Cadastro/>}/>
        </Routes>
        
      </Router>
  );
};

export default App;
