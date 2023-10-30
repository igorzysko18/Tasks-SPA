import React from 'react'
import Login from '../Pages/Login/index'
import ProtectedRoutes from './ProtectedRoutes'
import Cadastro from '../Pages/Cadastro/index'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Routering = () => {
  return ( 
    <Router>
      <Routes>
        <Route path="*" element={<Login/>} />
        <Route path="/home" element={
          <ProtectedRoutes>
            
          </ProtectedRoutes>
          }
        />
        <Route path="/cadastro" element={<Cadastro/>} />
      </Routes>
    </Router>
   );
}
 
export default Routering;