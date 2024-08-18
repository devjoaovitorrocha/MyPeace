import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../../assets/logo.png';
import './RegistroEmocoes.css';

function RegistroEmocoes() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [feeling, setFeeling] = useState('');
  const [emojiSelecionado, setEmojiSelecionado] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    if (!state?.token || !state?.id) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
      fetchRegistros(state.token, state.id);

      if (state?.openModal) {
        setIsModalOpen(true);
      }
    }
  }, [navigate, state]);

  const fetchRegistros = async (token, userId) => {
    try {
      const response = await axios.get(`https://api-mypeace.vercel.app/getAll/reports/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(response.data);
      console.log("Registros recebidos:", response.data);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      setMensagem('Erro ao buscar registros. Por favor, tente novamente mais tarde.');
    }
  };

  const handleDescricaoChange = (e) => setDescricao(e.target.value);

  const handleEmojiClick = (emoji) => {
    setEmojiSelecionado(emoji);
    setFeeling(emoji);
  };

  const handleSalvar = async () => {
    if (descricao === '' || emojiSelecionado === '') {
      setMensagem('Por favor, preencha a descrição e selecione um emoji.');
    } else {
      try {
        await axios.post(`https://api-mypeace.vercel.app/register/report/${id}`, {
          feeling: feeling,
          description: descricao
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMensagem('Salvo com sucesso!');
        setTimeout(() => setMensagem(''), 3000);
        setDescricao('');
        setEmojiSelecionado('');
        setFeeling('');
        setIsModalOpen(false);
        fetchRegistros(token, id);
      } catch (error) {
        setMensagem(error.response?.data?.msg || 'Erro ao salvar registro.');
      }
    }
  };

  const handleCancelar = () => {
    setMensagem('');
    setDescricao('');
    setEmojiSelecionado('');
    setFeeling('');
    setIsModalOpen(false);
    
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = (registro) => {
    setDescricao(registro.description);
    setFeeling(registro.feeling);
    setEmojiSelecionado(registro.feeling);

  };

  

  const emojiMap = {
    feliz:'😊',contente:'🙂',neutro:'😐',triste:'🙁',raiva:'😠',
  };

  return (
    <>
      
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="logo">
                <img src={logo} alt="Logo"></img>
              </div>
              <span className="exit" onClick={handleCancelar}>Sair</span>
            </div>
            <h2>{new Date().toLocaleDateString()}</h2>
            <p>Como está se sentindo?</p>
            <div className="emojis">
              {Object.keys(emojiMap).map(emoji => (
                <span
                  key={emoji}
                  role="img"
                  aria-label={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  className={emojiSelecionado === emoji ? 'emoji-selecionado' : ''}
                >{emojiMap[emoji]}</span>
              ))}
            </div>
            <div className="textarea-container">
              <textarea
                id="descricao"
                value={descricao}
                onChange={handleDescricaoChange}
                placeholder="Por que você está se sentindo assim?"
              />
            </div>
            <div className="button-container">
              <button onClick={handleSalvar}>Salvar</button>
            </div>
            {mensagem && <div className="mensagem">{mensagem}</div>}
          </div>
        </div>
      )}


    </>
  );
}

export default RegistroEmocoes;
