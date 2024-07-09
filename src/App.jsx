import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CadastroPsicologo from './pages/CadastroPsico/CadastroPsicologo';
import Corpo from './pages/Home/corpo';
import PrincipalPsico from './pages/PrincipalPsico/PrincipalPsico';
import PrincipalCliente from './pages/PrincipalCliente/PrincipalCliente';
import Cronometro from './pages/Cronometro/Cronometro';
import Login from './pages/Login/login';
import ListaPaciente from './pages/ListaPaciente/lista';
import Sobre from './pages/About/sobre';
import axios from 'axios';
import CadastroCliente from './pages/CadastroCliente/CadastroCliente';
import RegistroEmocoes from './pages/RegistroEmocoes/RegistroEmocoes';

export const http = axios.create({
  baseURL: 'https://api-mypeace.vercel.app'
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/cadastroCliente' element={<CadastroCliente/>} />
        <Route path='/cadastroPsicologo' element={<CadastroPsicologo />} />
        <Route path='/principalCliente' element={<PrincipalCliente />} />
        <Route path='/principalPsico' element={<PrincipalPsico />} />
        <Route path='/' element={<Corpo />} />
        <Route path='/login' element={<Login />} />
        <Route path='/principalCliente/cronometro' element={<Cronometro />} />
        <Route path='/principalPsico/listapaciente' element={<ListaPaciente />} />
        <Route path='/sobre' element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
