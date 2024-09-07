import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { ArrowLeft } from '@phosphor-icons/react';
import axios from 'axios';

const ClienteRegistroPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [clienteNome, setClienteNome] = useState("");
  const [registros, setRegistros] = useState([]);
  const [filter, setFilter] = useState({
    name: '',
    date: '',
    status: '',
    type: ''
  });

  useEffect(() => {
    if (!state?.token || !state?.id || !state?.nome) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
      setClienteNome(state.nome);
      fetchRegistros(state.token, state.id);  // Busca os registros do cliente da API
    }
  }, [navigate, state]);

  // Função para buscar registros do cliente da API
  async function fetchRegistros(token, idUser) {
    try {
      const response = await axios.get(
        `https://api-mypeace.vercel.app/getAll/records/${idUser}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRegistros(response.data.allRecords);
    } catch (error) {
      toast.error("Erro ao buscar registros. Por favor, tente novamente mais tarde.");
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
  const filteredData = registros.filter((registro) => {
    return (
      (filter.name === '' || registro.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.date === '' || registro.date === filter.date) &&
      (filter.status === '' || registro.status === filter.status) &&
      (filter.type === '' || registro.type === filter.type)
    );
  });

  const handleReturn = () => {
    navigate("/clienteDashboard", { state: { token, id, nome: clienteNome } });
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
          Seus Registros
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
          <input
            type="date"
            name="date"
            value={filter.date}
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
              filteredData.map((registro) => (
                <tr key={registro._id}>
                  <td className="border px-4 py-2">{registro.name}</td>
                  <td className="border px-4 py-2">{registro.date}</td>
                  <td className="border px-4 py-2">{registro.status}</td>
                  <td className="border px-4 py-2">{registro.type}</td>
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
      </main>

      <div className="flex justify-center md:hidden py-6">
        <button
          onClick={handleReturn}
          className="mb-6 cursor-pointer hover:opacity-95 relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
        >
          <div className="flex items-center hover:gap-x-1.5 gap-x-1 transition-all text-white font-light">
            <ArrowLeft weight="bold" />
            Voltar
          </div>
        </button>
      </div>
    </div>
  );
};

export default ClienteRegistroPage;
