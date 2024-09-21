import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { ArrowLeft, Check, Checks, Eye } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const emojis = {
  feliz: '😊',
  contente: '🙂',
  neutro: '😐',
  triste: '🙁',
  raiva: '😠',
};

export default function Diario() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [emociones, setEmociones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  useEffect(() => {
    if (!state?.token || !state?.id || !state?.nome) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
      fetchEmociones(state.token, state.id);
    }
  }, [navigate, state]);

  async function fetchEmociones(token, idUser) {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api-mypeace.vercel.app/getAll/reports/${idUser}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmociones(response.data.reports);
    } catch (error) {
      toast.error("Erro ao buscar emoções. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleVerificarClick = (emotion) => {
    setSelectedEmotion(emotion);
    setShowModal(true);
  };

  const handleReturn = () => {
    navigate("/principalCliente", { state: { token, id, nome: state.nome } });
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
            maxWidth: "400px",
            borderRadius: "8px",
            gap: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
      <header className="flex flex-col md:flex-row items-center justify-between max-w-[1440px] mx-auto mb-4">
        <h1 className="text-4xl py-6 md:py-12 text-white text-center font-semibold">
          Minhas Emoções
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

      <main className="max-w-[1440px] mx-auto bg-white shadow-3D rounded-xl p-4 md:p-6 overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner color="indigo" size="xl" />
          </div>
        ) : (
          <table className="min-w-full table-auto mt-6">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2">Data</th>
                <th className="px-4 py-2">Emoção</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(emociones) && emociones.length > 0 ? (
                emociones.map((emocion) => (
                  <tr key={emocion._id}>
                    <td className=" px-4 py-2">
                      {new Date(emocion.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-2xl">
                      {emojis[emocion.feeling] || emocion.feeling}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-[#00bfa6] rounded-lg hover:opacity-90 transition-opacity text-white font-semibold py-2 px-4"
                        onClick={() => handleVerificarClick(emocion)}
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border px-4 py-2 text-center">
                    Nenhuma emoção registrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        <div className="mt-4 text-gray-500">
          Data de hoje: {new Date().toLocaleDateString()}
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

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="bg-green-900/30 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-green-500 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              <Eye className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
              <div className="relative z-10">
                <div className="text-4xl text-white-600 grid place-items-center mx-auto">
                  <Eye />
                </div>
                <h3 className="text-4xl font-bold text-center mb-2">
                  Visualizar
                </h3>

                <div>
                  <p className="mb-2 text-2xl   font-bold  ">Tipo de Emoção:</p>
                  <p className="mb-6 text-2xl">{emojis[selectedEmotion?.feeling] || selectedEmotion?.feeling}</p>
                  <p className="mb-2 text-2xl   font-bold  ">Descrição:</p>
                  <p className=' font-medium'>{selectedEmotion?.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
