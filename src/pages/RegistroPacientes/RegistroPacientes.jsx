import React, { useState, useEffect } from 'react';
import { http } from "../../App";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Logo from "../../assets/images/logo.svg";
import FloatingPhone from "../../components/FloatingPhone";
import { ArrowLeft } from "@phosphor-icons/react";
import Inputs from "../../components/Inputs";

const mockData = [
  { id: 1, name: 'João Silva', date: '2024-09-01', status: 'Ativo', type: 'Presencial' },
  { id: 2, name: 'Maria Souza', date: '2024-08-25', status: 'Finalizado', type: 'Online' },
  { id: 3, name: 'Carlos Pereira', date: '2024-08-20', status: 'Ativo', type: 'Presencial' },
  // Adicione mais registros fictícios aqui
];

const RegistroPage = () => {
  const [filter, setFilter] = useState({
    name: '',
    status: '',
    type: ''
  });
  const [filteredData, setFilteredData] = useState(mockData);

  // Função para lidar com mudanças nos filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Filtrar os registros conforme os filtros são aplicados
  useEffect(() => {
    const filtered = mockData.filter((registro) => {
      return (
        (filter.name === '' || registro.name.toLowerCase().includes(filter.name.toLowerCase())) &&
        (filter.status === '' || registro.status === filter.status) &&
        (filter.type === '' || registro.type === filter.type)
      );
    });
    setFilteredData(filtered);
  }, [filter]);

  return (
    <div className="registro-page">
      <h1>Verificação de Registros</h1>
      
      {/* Área de Filtro */}
      <div className="filter-section">
        <input
          type="text"
          name="name"
          placeholder="Buscar por nome do paciente"
          value={filter.name}
          onChange={handleFilterChange}
        />
        <select name="status" value={filter.status} onChange={handleFilterChange}>
          <option value="">Todos os status</option>
          <option value="Ativo">Ativo</option>
          <option value="Finalizado">Finalizado</option>
        </select>
        <select name="type" value={filter.type} onChange={handleFilterChange}>
          <option value="">Todos os tipos</option>
          <option value="Presencial">Presencial</option>
          <option value="Online">Online</option>
        </select>
      </div>

      {/* Tabela de Registros */}
      <table className="registro-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Status</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.name}</td>
                <td>{registro.date}</td>
                <td>{registro.status}</td>
                <td>{registro.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum registro encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegistroPage;
