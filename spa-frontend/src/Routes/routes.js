import React from 'react'
import Login from '../Pages/Login/index'
import Cadastro from '../Pages/Cadastro/index'
import Tarefas from '../Pages/Tarefas/index'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Routering = () => {
  return ( 
    <Router>
      <Routes>
        <Route path="*" element={<Login/>} />
        <Route path="/tarefas" element={<Tarefas/>}/>
        <Route path="/cadastro" element={<Cadastro/>} />
      </Routes>
    </Router>
   );
}
 
export default Routering;