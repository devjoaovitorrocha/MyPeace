import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { ArrowLeft, MagnifyingGlass } from '@phosphor-icons/react';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import { Button } from "flowbite-react";

export default function RegistroPacientes() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state?.token || !state?.id || !state?.nome) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
      fetchPacientesAndEmotions(state.token, state.id);
    }
  }, [navigate, state]);

  async function fetchPacientesAndEmotions(token, idUser) {
    try {
      const response = await axios.get(
        `https://api-mypeace.vercel.app/getAll/pacients/${idUser}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const pacientesData = response.data.allPacients;

      const updatedPacientes = await Promise.all(
        pacientesData.map(async (paciente) => {
          const emotions = await fetchEmociones(token, paciente._id);
          return { ...paciente, emotions };
        })
      );

      setPacientes(updatedPacientes);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Sessão expirada. Por favor, faça login novamente.");
        navigate("/login");
      } else {
        toast.error("Erro ao buscar pacientes ou emoções. Por favor, tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchEmociones(token, idPaciente) {
    try {
      const response = await axios.get(
        `https://api-mypeace.vercel.app/getAll/reports/${idPaciente}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.reports;
    } catch (error) {
      toast.error("Erro ao buscar emoções. Por favor, tente novamente.");
      return [];
    }
  }

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = pacientes.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredPacientes = currentPatients.filter((paciente) => {
    return paciente.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleVerificarClick = (paciente) => {
    console.log("Navegando para detalhes com:", { paciente, token, idUser: id, nome: state.nome });
    navigate("/principalPsico/registropaciente/detalhesPaciente", { state: { paciente, token, idUser: id, nome: state.nome } });
  };

  const handleReturn = () => {
    console.log("Redirecionando com o estado:", { token, id, nome: state?.nome });

    if (!state?.nome) {
      toast.error("Erro: Nome não encontrado. Redirecionando para a página principal.");
      navigate("/principalPsico");
    } else {
      navigate("/principalPsico", { state: { token, id, nome: state.nome } });
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
            maxWidth: "400px",
            borderRadius: "8px",
            gap: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
      <header className="flex flex-col md:flex-row items-center justify-between max-w-[1440px] mx-auto mb-6">
        <h1 className="text-4xl py-6 md:py-12 text-white text-center font-semibold">
          Lista de Registros
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner color="indigo" size="xl" />
          </div>
        ) : (
          <>
            <div className="flex items-center mb-4">
              <MagnifyingGlass size={24} className="mr-2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full px-4 py-2 rounded-full bg-gray-100 text-gray-700 border border-green-300 focus:outline-none focus:border-green-500"
              />
            </div>

            <table className="min-w-full table-auto mt-6">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">Data</th>
                  <th className="px-4 py-2">Última Emoção e Descrição</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPacientes.length > 0 ? (
                  filteredPacientes.map((paciente) => (
                    <tr key={paciente._id}>
                      <td className="border px-4 py-2">{paciente.name}</td>
                      <td className="border px-4 py-2">
                        {paciente.emotions.length > 0
                          ? new Date(paciente.emotions[paciente.emotions.length - 1].date).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="border px-4 py-2">
                        {paciente.emotions.length > 0 ? (
                          <span>
                            <strong>Emoção:</strong> {paciente.emotions[paciente.emotions.length - 1].feeling} <br />
                            <strong>Descrição:</strong> {paciente.emotions[paciente.emotions.length - 1].description}
                          </span>
                        ) : (
                          'Nenhuma emoção'
                        )}
                      </td>
                      <td className="border whitespace-nowrap px-4 py-2 text-gray-700">
                        <Button onClick={() => handleVerificarClick(paciente)}>Verificar</Button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border px-4 py-2 text-center">
                      Nenhum registro encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {pacientes.length > patientsPerPage && (
              <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(pacientes.length / patientsPerPage) }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 px-4 py-2 border rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
