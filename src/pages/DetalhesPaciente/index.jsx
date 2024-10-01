import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { ArrowLeft, ArrowCircleLeft, ArrowCircleRight } from '@phosphor-icons/react';
import { Spinner } from 'flowbite-react';
import Notification from "../../components/Notification"; 


const showNotification = ({ name, description, type, time = "Agora" }) => {
  toast(
    <Notification
      name={name}
      description={description}
      time={time}
      type={type}
    />
  );
};

export default function DetalhesPaciente() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { paciente, token, idUser, nome } = state || {};
  const id = idUser;

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const emotionsPerPage = 5;
  const totalPages = Math.ceil((paciente?.emotions?.length || 0) / emotionsPerPage) || 1;
  const startIndex = (currentPage - 1) * emotionsPerPage;
  const selectedEmotions = (paciente?.emotions || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(startIndex, startIndex + emotionsPerPage);

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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
    <div className="bg-[#3c5454] h-screen p-6 overflow-y-auto">
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
            background: "transparent",
            border: "none",
          },
        }}
      />
      <header className="flex flex-col md:flex-row items-center justify-between max-w-[1440px] mx-auto">
        <h1 className="text-3xl md:text-4xl py-6 md:py-12 text-white text-center font-semibold flex items-center gap-2">
          Detalhes do Paciente
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

      <main className="max-w-[1440px] mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
        <div className='flex items-center gap-2' >
          <h2 className="text-2xl font-semibold mb-4 ">
          Registros de Emoções 
         </h2>
         <h2 className="text-2xl text-gray-400 font-medium mb-4 ">
          {paciente?.name || "Paciente não identificado"}
         </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner color="indigo" size="xl" />
          </div>
        ) : (
          <>
            {selectedEmotions.length > 0 ? (
              <ul className="space-y-4">
                {selectedEmotions.map((emotion) => (
                  <li key={emotion._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <p>
                      <strong>Data:</strong> {new Date(emotion.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Horário:</strong> {emotion.time || 'Horário não disponível'}
                    </p>
                    <p><strong>Emoção:</strong> {typeof emotion.feeling === 'function' ? emotion.feeling() : emotion.feeling}</p>
                    <p><strong>Descrição:</strong> {typeof emotion.description === 'function' ? emotion.description() : emotion.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Nenhum registro de emoção disponível.</p>
            )}


            <div className="flex flex-col md:flex-row justify-between items-center mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`bg-gray-300 text-black px-4 py-2 rounded flex items-center ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
              >
                <ArrowCircleLeft weight="bold" className="inline-block mr-2" />
                Anterior
              </button>

              <span className="text-lg font-semibold mb-2 md:mb-0">
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`bg-gray-300 text-black px-4 py-2 rounded flex items-center ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
              >
                Próxima
                <ArrowCircleRight weight="bold" className="inline-block ml-2" />
              </button>
            </div>
          </>
        )}
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
