import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CadastroPaciente from './pages/CadastroPaciente/CadastroPaciente';
import PacienteHome from './pages/PacienteHome/PacienteHome';
import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import axios from 'axios'
import CadastroPsicologo from './pages/CadastroPsicologo/CadastroPsicologo';
import Login from './pages/Login/login';
import Diario from './pages/Diario/Diario';

export const http = axios.create({
  baseURL: 'https://api-mypeace.vercel.app'
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastroPsicologo' element={<CadastroPsicologo />} />
        <Route path='/cadastroPaciente' element={<CadastroPaciente />} />
        
        <Route path='/pacienteHome' element={<PacienteHome />} />
        
        <Route path='/' element={<PaginaInicial />} />

        <Route path='/login' element={<Login />} />
        <Route path='/diario' element={<Diario />} />
        <Route path='/diario/:day' element={<Diario />} />
      </Routes>    
    </BrowserRouter>
  );
}

export default App;
