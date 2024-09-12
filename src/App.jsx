import { BrowserRouter, Route, Routes } from "react-router-dom"
import axios from 'axios';
import Home from "./pages/Home"
import Pagina404 from "./pages/404"
import CadastroPsicologo from "./pages/Cadastro"
import PrincipalCliente from "./pages/PrincipalCliente"
import Login from "./pages/Login";
import PrincipalPsico from "./pages/PrincipalPsico";
import ListaPaciente from "./pages/ListaPaciente";
import CadastroPaciente from "./pages/CadastroCliente";
import Cronometro from "./pages/Cronometro";
import RegistroEmocoes from "./pages/RegistroEmocoes";

export const http = axios.create({
  baseURL: 'https://api-mypeace.vercel.app/'
});

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Home routes*/}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Pagina404 />} />
  
      {/* Psicologo routes */}
      <Route path="/principalPsico" element={<PrincipalPsico />} />
      <Route path="/principalPsico/listapaciente" element={<ListaPaciente />} />
      <Route path="/cadastroPsicologo" element={<CadastroPsicologo />} />
  
      {/* Cliente routes */}
      <Route path="/principalCliente" element={<PrincipalCliente />} />
      <Route path="/principalCliente/cronometro" element={<Cronometro />} />
      <Route path="/principalCliente/registroemocoes" element={<RegistroEmocoes />} />
      {/*<Route path="/principalCliente/diario" element={<Diario />} />*/}
      <Route path="/cadastroCliente" element={<CadastroPaciente />} />
    </Routes>
  </BrowserRouter>
  
  )
}

export default App
