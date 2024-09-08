import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { ArrowLeft } from '@phosphor-icons/react';
import axios from 'axios';

const RegistroPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [filter, setFilter] = useState({
    name: '',
    status: '',
    type: ''
  });
  const [psicologoNome, setPsicologoNome] = useState("");

  useEffect(() => {
    if (!state?.token || !state?.id || !state?.nome) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
      setPsicologoNome(state.nome);
      fetchPacientes(state.token, state.id);  // Busca os pacientes da API
    }
  }, [navigate, state]);

  // Função para buscar pacientes da API
  async function fetchPacientes(token, idUser) {
    try {
      const response = await axios.get(
        `https://api-mypeace.vercel.app/getAll/pacients/${idUser}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPacientes(response.data.allPacients);
    } catch (error) {
      toast.error("Erro ao buscar pacientes. Por favor, tente novamente mais tarde.");
    }
  }

  // Função para lidar com mudanças nos filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Filtrar os registros conforme os filtros são aplicados
  const filteredData = pacientes.filter((paciente) => {
    return (
      (filter.name === '' || paciente.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.status === '' || paciente.status === filter.status) &&
      (filter.type === '' || paciente.type === filter.type)
    );
  });

  const handleReturn = () => {
    navigate("/principalPsico", { state: { token, id, nome: psicologoNome } });
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
      <header className="flex flex-col md:flex-row items-center justify-between max-w-[1440px] mx-auto">
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
        {/* Filtros */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 border-b border-gray-300 pb-6">
          <input
            type="text"
            name="name"
            placeholder="Buscar por nome"
            value={filter.name}
            onChange={handleFilterChange}
            className="md:w-auto w-full p-2 border border-gray-300 rounded-lg"
          />
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="md:w-auto w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Todos os status</option>
            <option value="Ativo">Ativo</option>
            <option value="Finalizado">Finalizado</option>
          </select>
          <select
            name="type"
            value={filter.type}
            onChange={handleFilterChange}
            className="md:w-auto w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Todos os tipos</option>
            <option value="Presencial">Presencial</option>
            <option value="Online">Online</option>
          </select>
        </div>

        {/* Tabela */}
        <table className="min-w-full table-auto mt-6">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((paciente) => (
                <tr key={paciente._id}>
                  <td className="border px-4 py-2">{paciente.name}</td>
                  <td className="border px-4 py-2">{paciente.date}</td>
                  <td className="border px-4 py-2">{paciente.status}</td>
                  <td className="border px-4 py-2">{paciente.type}</td>
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
        <div className="mt-4 text-gray-500">
          Data de hoje: {new Date().toLocaleDateString()}
        </div>
      </main>

      <div className="flex justify-center md:hidden py-6">
        <Link
          className="mb-6 cursor-pointer hover:opacity-95 relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
          to="/principalPsico"
        >
          <div className="flex items-center hover:gap-x-1.5 gap-x-1 transition-all text-white font-light">
            <ArrowLeft weight="bold" />
            Voltar
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RegistroPage;
