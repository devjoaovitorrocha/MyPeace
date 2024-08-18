import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { XCircle, Trash2 } from "lucide-react";
import "./PrincipalCliente.css";
import diaryicon from "../../assets/diary-icon.png";
import breathingicon from "../../assets/breathing-icon.png";
import registericon from "../../assets/diary-icon.png";
import edtIcon from "../../assets/edtIcon.png";

function PrincipalPsico() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [modalEdt, setModalEdt] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [modalDelSuccess, setModalDelSuccess] = useState(false);
  const [eye, setEye] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [currentPaciente, setCurrentPaciente] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (!state?.token || !state?.id) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
    }
  }, [navigate, state]);

  const edtDadosSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://api-mypeace.vercel.app/update/pacients/${id}`,
        {
          name: nome,
          email: email
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMensagem(response.data.msg || "Dados editados com sucesso!");
      alert(mensagem)
      setModalEdt(false);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  async function deletar() {
    try {
        const response = await axios.post(
            `https://api-mypeace.vercel.app/delete/pacients/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        setMensagem(response.data.msg || "Sua conta foi deletado com sucesso!");
        setModalDel(false);
        setModalDelSuccess(true);


        setTimeout(() => {
            setModalDelSuccess(false);
            navigate('/');
        }, 2000);
    } catch (error) {
        handleErrorResponse(error);
    }
}


  function handleErrorResponse(error) {
    if (error.response) {
      console.error("Detalhes do erro:", error.response.data);
      if (error.response.status === 401) {
        alert("Sessão expirada");
        navigate("/login");
      } else {
        setMensagem(
          error.response.data.msg ||
            "Erro ao processar a solicitação. Por favor, tente novamente mais tarde."
        );
        alert(mensagem)
      }
    } else {
      setMensagem(
        "Erro ao processar a solicitação. Por favor, tente novamente mais tarde."
      );
      alert(mensagem)
    }
  }

  function openEditModal(paciente) {
    if (paciente) {
      setCurrentPaciente(paciente);
      setNome(paciente.name);
      setEmail(paciente.email);
      setModalEdt(true);
    }
  }

  function openDeleteModal(paciente) {
    if (paciente) {
      setCurrentPaciente(paciente);
      setModalDel(true);
    }
  }

  return (
    <>
      {modalDelSuccess && (
          <div className="telaverdecontainer">
            <div className="modal1">
              <h1>Sucesso</h1>
              <p>{mensagem}</p>
              <button onClick={() => setModalDelSuccess(false)}>Fechar</button>
          </div>
        </div>
      )}

      {modalEdt && (
        <div className="modal">
          <div className="modal-content">
            <header>
              <h1>Editar Dados</h1>
              <XCircle className="xIcon" onClick={() => setModalEdt(false)} />
            </header>
            <form className="edtDadosForm" onSubmit={edtDadosSubmit}>
              <input
                placeholder="Nome:"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
                required
              />
              <input
                placeholder="Email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <button>Salvar</button>
            </form>
          </div>
        </div>
      )}
      {modalDel && (
        <div className="modal">
          <div className="modal-content">
            <header>
              <h1>Excluir Conta</h1>
              <XCircle className="xIcon" onClick={() => setModalDel(false)} />
            </header>
            <p>
              Você tem certeza que deseja deletar esta conta? Esta ação não pode
              ser desfeita.
            </p>
            <div className="delBtns">
              <button className="delBtn" onClick={deletar}>
                Deletar
              </button>
              <button
                className="delCancelBtn"
                onClick={() => setModalDel(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <header className="cabecalho-aplicativo">
          <div className="perfil">
            <div className="foto-placeholder">Foto do Cliente</div>
            <div className="saudacao">
              <p>Olá,</p>
              <p>Nome do Cliente</p>
            </div>
          </div>
          <nav>
            <a href="/">Início</a>
          </nav>
        </header>
        <section className="acesso-rapido">
          <h2>Acesso Rápido</h2>
          <div className="icones">
            <div className="botao">
              <div className="icone">
                <img src={diaryicon} alt="Diário" />
                <p>Diário</p>
              </div>
            </div>
            <div className="botao" onClick={() => navigate("/principalCliente/cronometro")}>
              <div className="icone">
                <img src={breathingicon} alt="Respiração" />
                <p>Respiração Guiada</p>
              </div>
            </div>
            <div className="botao">
              <div className="icone">
                <img src={registericon} alt="Registro" />
                <p>Registro Emoções</p>
              </div>
            </div>

            <div
              className="botao"
              onClick={() => openEditModal(currentPaciente)}
            >
              <div className="icone">
                <img src={edtIcon} alt="Registro" />
                <p>Editar Dados</p>
              </div>
            </div>

            <div
              className="botao"
              onClick={() => openDeleteModal(currentPaciente)}
            >
              <div className="icone">
                <Trash2 className="trashicon" size={50} fontWeight={100} />
                <p>Deletar Conta</p>
              </div>
            </div>
          </div>
        </section>
        <section className="registros-diario">
          <h2>Registros do Diário</h2>
          <div className="registro">
            <p>Confira os seus últimos registros de expressão de sentimentos</p>
            <button>Conferir</button>
          </div>
        </section>
        <section className="respiracao-guiada">
          <h2>Respiração Guiada</h2>
          <div className="respiracao">
            <p>
              Problemas com ansiedade, ataque de pânico? Acesse nossa respiração
              guiada.
            </p>
            <button>Acessar</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default PrincipalPsico;
