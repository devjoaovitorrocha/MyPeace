import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Toaster } from 'sonner';
import { ArrowLeft,ExclamationMark } from "@phosphor-icons/react";
import { http } from "../../App";

export default function BordoPaciente() {
  const { state } = useLocation();
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const [pacienteNome, setPacienteNome] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.token || !state?.id || !state?.nome) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
      setPacienteNome(state.nome);
    }
  }, [navigate, state]);

  const handleReturn = () => {
    navigate("/principalCliente", { state: { token, id, nome: pacienteNome } });
  };

  return (
    <div className="bg-[#3c5454] min-h-screen p-6">
      <Toaster
        expand
        position="top-center"
        richColors
        toastOptions={{
          style: {
            margin: "10px",
            padding: "15px",
            maxWidth: "400px",
            borderRadius: "8px",
            gap: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      />

  
      <header className="flex flex-col md:flex-row items-center justify-between max-w-[1440px] mx-auto mb-4 md:mb-6">
        <h1 className="text-2xl md:text-4xl py-4 text-white text-center font-semibold">
          Diario de Bordo
        </h1>
        <span onClick={handleReturn} className="cursor-pointer hover:opacity-95 relative w-fit hidden md:block">
          <Link
            className="cursor-pointer relative w-fit block after:block after:content-[''] 
            after:absolute after:h-[2px] after:bg-white text-white after:w-full after:scale-x-0 
            after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            to="/principalCliente"
            state={{ token, id, nome: pacienteNome }}
          >
            <div className="flex items-center hover:gap-x-1.5 gap-x-1 transition-all text-white font-light">
            <ArrowLeft weight="bold" />
            Voltar
          </div>
          </Link>
        </span>
      </header>

      
      <main className="max-w-[1440px] mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="space-y-6">
          
          <div className="mb-4 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Relatório da sua última consulta</h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-700 font-medium">Tópicos Abordados:</p>
                <p className="text-gray-600">Melhorar a autoestima, enfrentamento de desafios emocionais.</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Desafios e Dificuldades:</p>
                <p className="text-gray-600">Insegurança no ambiente de trabalho, falta de organização.</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Tarefas para o Cliente:</p>
                <p className="text-gray-600">Estabelecer uma rotina de exercícios físicos.</p>
              </div>
            </div>
          </div>


          <div className="p-6 rounded-lg">
            <div className="cursor-pointer w-full p-4 rounded relative overflow-hidden group bg-white shadow-3D" onClick={handleReturn} >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
              <ExclamationMark className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-green-400 group-hover:rotate-12 transition-transform duration-300" />
              <ArrowLeft className="mb-2 text-2xl text-green-600 group-hover:text-white transition-colors relative z-10 duration-300" />
              <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">Continue praticando as tarefas discutidas e nos veremos na próxima consulta.</h3>
              <p className="text-slate-400 group-hover:text-green-200 relative z-10 duration-300 mt-2 group-hover:rotate-1"></p>
            </div>
          </div>
        </div>
      </main>

      
      <div className="flex justify-center md:hidden py-6">
        <span onClick={handleReturn} className="cursor-pointer hover:opacity-95 relative w-fit block">
          <div className="flex items-center hover:gap-x-1.5 gap-x-1 transition-all text-white">
            <ArrowLeft />
            Voltar
          </div>
        </span>
      </div>
    </div>
  );
}
