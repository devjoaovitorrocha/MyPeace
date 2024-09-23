import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';  
import { ArrowLeft } from "@phosphor-icons/react";
import { Spinner } from "flowbite-react";
import { http } from "../../App";
import Notification from "../../components/Notification"; 


const showNotification= ({ name, description, type, time = "Agora" }) => {
  toast(
    <Notification
      name={name}
      description={description}
      time={time}
      type={type}
    />
  );
};

export default function Relatorio() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { paciente, token, idUser, nome } = state || {};
  const id = idUser;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Estado recebido em DetalhesPaciente:", { paciente, token, idUser, nome });
    if (!paciente || !token || !idUser || !nome) {
    
      showNotification({
        name: "Aviso!",
        description: "Dados insuficientes. Redirecionando para a página principal.",
        type: "warning",
      });
      navigate("/principalPsico/registropaciente");
    } else {
      setIsLoading(false);
    }
  }, [token, idUser, nome, paciente, navigate]);


  const handleReturn = () => {
    if (!nome) {
      showNotification({
        name: "Aviso!",
        description: "Erro: Nome não encontrado. Redirecionando para a página principal.",
        type: "warning",
      });
      navigate("/principalPsico/registropaciente");
    } else {
      navigate("/principalPsico/registropaciente", { state: { token, idUser: idUser, id, nome: nome } });
    }
  };

  return (
    <div className="bg-[#3c5454] h-screen p-6">
     <Toaster
        expand
        position="top-center"
        richColors
        toastOptions={{
          style: {
            margin: "10px",
            padding: "15px",
            maxWidth: "500px",
            borderRadius: "8px",
            gap: "10px",
            boxShadow: "none",
            background: " transparent",
          },
        }}
      />

      <header className="flex flex-col md:flex-row items-center justify-between max-w-[1440px] mx-auto mb-4 md:mb-6">
        <h1 className="text-2xl md:text-4xl py-4 text-white text-center font-semibold">
          Relatório
        </h1>
        <span
          onClick={handleReturn}
          className="cursor-pointer hover:opacity-95 relative w-fit hidden md:block after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
        >
          <div className="flex items-center hover:gap-x-1.5 gap-x-1 transition-all text-white font-light">
            <ArrowLeft weight="bold" />
            Voltar
          </div>
        </span>
      </header>

      <main className="max-w-[1440px] mx-auto bg-white shadow-lg rounded-xl p-8">
        <div className="mb-6 p-4 rounded-lg shadow-sm">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner color="indigo" size="xl" />
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">Registro do paciente</h2>
              <p className="text-gray-600 mb-6">Nome do paciente: {paciente?.name || "Paciente não identificado"}</p> 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Tópicos Abordados", "Observações", "Progressos Notáveis", "Desafios e Dificuldades", "Tarefas para o Cliente"].map((label) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-700">{label}:</label>
                    <textarea
                      className="w-full h-28 p-3 mt-1 bg-gray-100 text-gray-700 border border-green-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                      placeholder={`Escreva sobre ${label.toLowerCase()}...`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-[#00bfa6] rounded-lg hover:opacity-90 transition-opacity text-white font-semibold py-2 px-4">
                  Enviar Relatório
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <div className="flex justify-center md:hidden py-6">
        <span
          onClick={handleReturn}
          className="cursor-pointer hover:opacity-95 relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
        >
          <div className="flex items-center hover:gap-x-1.5 gap-x-1 transition-all text-white font-light">
            <ArrowLeft weight="bold" />
            Voltar
          </div>
        </span>
      </div>
    </div>
  );
}
