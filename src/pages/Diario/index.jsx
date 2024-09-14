import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { ArrowLeft, Trash, Pencil, CheckFat } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Modal from '../../components/Modal';

export default function Diario() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [emociones, setEmociones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modalAvisoDel, setModalAvisoDel] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [buttonColor, setButtonColor] = useState("blue"); 

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
    }
  }

  const handleSaveEdit = async () => {
    try {
      await axios.post(
        `https://api-mypeace.vercel.app/update/report/${id}/${selectedEmotion._id}`,
        { feeling: selectedEmotion.feeling, description: selectedEmotion.description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchEmociones(token, id);
      setShowModal(false);
      toast.success("Emoção atualizada com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar emoção:", error);
      toast.error("Erro ao atualizar emoção, tente novamente.");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.post(
        `https://api-mypeace.vercel.app/delete/report/${id}/${selectedEmotion._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchEmociones(token, id);
      setModalDel(false);
      toast.success("Emoção excluída com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir emoção:", error);
      toast.error("Erro ao excluir emoção.");
    }
  };

  const handleVerificarClick = (emotion) => {
    setSelectedEmotion(emotion);
    setIsEditing(false);
    setButtonColor("green"); 
    setShowModal(true);
  };

  const handleEditarClick = (emotion) => {
    setSelectedEmotion(emotion);
    setIsEditing(true);
    setButtonColor("blue");
    setShowModal(true);
  };

  const handleExcluirClick = (emotion) => {
    setSelectedEmotion(emotion);
    setModalAvisoDel(true);
  };

  const handleWarningConfirm = () => {
    setModalAvisoDel(false);
    setModalDel(true);
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

      <main className="max-w-[1440px] mx-auto bg-white shadow-3D rounded-xl p-6">
        <table className="min-w-full table-auto mt-6">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Emoção</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(emociones) && emociones.length > 0 ? (
              emociones.map((emocion) => (
                <tr key={emocion._id}>
                  <td className="border px-4 py-2">
                    {new Date(emocion.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{emocion.feeling}</td>
                  <td className="border px-4 py-2 flex space-x-4">
                    <button
                      onClick={() => handleVerificarClick(emocion)}
                      className="p-2 bg-green-500 rounded-md shadow-3D transition-all hover:opacity-90"
                      title="Verificar Emoção"
                    >
                      <CheckFat weight='fill' color="white" />
                    </button>
                    <button
                      onClick={() => handleEditarClick(emocion)}
                      className="p-2 bg-blue-500 rounded-md shadow-3D transition-all hover:opacity-90"
                      title="Editar Emoção"
                    >
                      <Pencil weight="fill" color="white" />
                    </button>
                    <button
                      onClick={() => handleExcluirClick(emocion)}
                      className="p-2 bg-red-500 rounded-md shadow-3D transition-all hover:opacity-90"
                      title="Excluir Emoção"
                    >
                      <Trash weight="fill" color="white" />
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
        <div className="mt-4 text-gray-500">
          Data de hoje: {new Date().toLocaleDateString()}
        </div>
      </main>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className={`bg-black/30 backdrop-blur fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll cursor-pointer`}
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden border-2 ${buttonColor ? `border-${buttonColor}-500` : ''}`}
            >
              <header className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-bold text-center">
                  {isEditing ? "Editar Emoção" : "Visualizar Emoção"}
                </h3>
              </header>
              {isEditing ? (
                <div>
                  <label className="block mb-2">Tipo de Emoção</label>
                  <input
                    type="text"
                    value={selectedEmotion?.feeling}
                    onChange={(e) =>
                      setSelectedEmotion({ ...selectedEmotion, feeling: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  />
                  <label className="block mb-2">Descrição</label>
                  <textarea
                    value={selectedEmotion?.description}
                    onChange={(e) =>
                      setSelectedEmotion({ ...selectedEmotion, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleSaveEdit}
                      className={`bg-${buttonColor}-500 text-white px-4 py-2 rounded hover:bg-${buttonColor}-600 transition-colors duration-200`}
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-2 font-medium">Tipo de Emoção:</p>
                  <p className="mb-4">{selectedEmotion?.feeling}</p>
                  <p className="mb-2 font-medium">Descrição:</p>
                  <p>{selectedEmotion?.description}</p>
                </div>
              )}
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {modalAvisoDel && (
        <Modal
          isOpen={modalAvisoDel}
          setIsOpen={setModalAvisoDel}
          titulo="Aviso Importante"
          conteudo={`Após deletar a emoção, não será possível recuperá-la. Tem certeza que deseja excluir?`}
          redWarning
          onContinue={handleWarningConfirm}
          onExit={() => setModalAvisoDel(false)}
        />
      )}

      {modalDel && (
        <Modal
          isOpen={modalDel}
          setIsOpen={setModalDel}
          titulo="Excluir Emoção"
          del
          delOnClick={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
