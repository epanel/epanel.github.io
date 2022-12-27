import React from 'react';
import {Routes, Route} from 'react-router-dom'

import PasswordGenerator from "./pages/PasswordGenerator";
import Home from "./pages/Home"


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/password-generator' element={<PasswordGenerator/>}/>
      </Routes>
    </>
  );
}

export default App;
