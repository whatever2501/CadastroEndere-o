import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lista from './pages/Lista';
import Cadastro from './pages/Cadastro';
import Menu from './Menu';


const App = () => {
  return (
        
      <Router>
        <Menu/>
        <Routes>
          <Route path='/' element={<Lista/>}/>
          <Route  path="/Cadastro" element={<Cadastro/>}/>
        </Routes>
        
      </Router>
  );
};

export default App;
