import {
  ArrowLeft,
  ArrowUpRight,
  BookBookmark,
  Database,
  NotePencil,
  Trash,
  User,
  Wind,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import HoverForCards from "../../components/HoverForCards";
import Inputs from "../../components/Inputs";
import { Toaster, toast } from "sonner";
import axios from "axios";

export default function PrincipalCliente() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [modalEdt, setModalEdt] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [modalAvisoDel, setModalAvisoDel] = useState(false); 
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [pacienteNome, setPacienteNome] = useState("");
  const [currentPaciente, setCurrentPaciente] = useState({
    name: "",
    email: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!state?.token || !state?.id || !state?.nome) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
      setPacienteNome(state.nome);
    }
  }, [navigate, state]);

  const handleCronometro = () => {
    navigate("/principalCliente/cronometro", {
      state: { token, id, nome: pacienteNome },
    });
  };

  const handleRegistroEmocoes = () => {
    navigate("/principalCliente/registroemocoes", {
      state: { token, id, nome: pacienteNome },
    });
  };

  const handleDiario = () => {
    navigate("/principalCliente/diario", {
      state: { token, id, nome: pacienteNome },
    });
  };

  const fetchPacientInfo = async () => {
    try {
      const response = await axios.get(
        `https://api-mypeace.vercel.app/get/pacientInfo/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { name, email } = response.data;
      setNome(name);
      setEmail(email);
    } catch (error) {
      toast.error("Erro ao buscar informações do paciente.");
      console.error(error);
    }
  };

  const edtDadosSubmit = async (e) => {
    e.preventDefault();
    try {
      // Atualiza dados do paciente
      const response = await axios.post(
        `https://api-mypeace.vercel.app/update/pacients/${id}`,
        {
          name: nome,
          email: email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`${response.data.msg}` || "Dados editados com sucesso!");

      setPacienteNome(nome);

      // Atualiza senha, se fornecida
      if (currentPassword && newPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
          toast.error("As novas senhas não coincidem!");
          return;
        }

        const senhaResponse = await axios.post(
          `https://api-mypeace.vercel.app/update/password/pacients/${id}`,
          {
            currentPassword,
            newPassword,
            confirmPassword,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (senhaResponse.status === 200) {
          toast.success(`${senhaResponse.data.msg}` || "Senha atualizada com sucesso!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      }

      setModalEdt(false);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const deletar = async () => {
    try {
      const response = await axios.post(
        `https://api-mypeace.vercel.app/delete/pacients/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`${response.data.msg}` || "Paciente deletado com sucesso!");
      setModalDel(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleErrorResponse = (error) => {
    const errorMsg = error.response?.data?.msg || "Erro ao processar a solicitação. Por favor, tente novamente mais tarde.";
    if (error.response?.status === 401) {
      alert("Sessão expirada");
      navigate("/login");
    } else {
      toast.error(errorMsg);
    }
  };

  const openEditModal = (paciente) => {
    if (paciente) {
      fetchPacientInfo();
      setCurrentPaciente(paciente);
      setNome(paciente.name);
      setEmail(paciente.email);
      setModalEdt(true);
    }
  };

  const openDeleteModal = (paciente) => {
    if (paciente) {
      setCurrentPaciente(paciente);
      setModalAvisoDel(true);
    }
  };

  const handleWarningConfirm = () => {
    setModalAvisoDel(false);
    setModalDel(true); 
  };

  return (
    <>
      {modalAvisoDel && (
        <Modal
          isOpen={modalAvisoDel}
          setIsOpen={setModalAvisoDel}
          titulo="Aviso Importante"
          conteudo={`Tem certeza que deseja apagar sua conta?`}
          redWarning
          onContinue={handleWarningConfirm}
          onExit={() => setModalAvisoDel(false)}
        />
      )}
      {modalEdt && (
        <Modal
          isOpen={modalEdt}
          setIsOpen={setModalEdt}
          titulo="Editar Dados"
          form
        >
          <form className="mt-5 space-y-8" onSubmit={edtDadosSubmit}>
            <div className="relative z-0">
              <Inputs
                label="Nome:"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="relative z-0">
              <Inputs
                label="Email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative z-0">
              <Inputs
                label="Senha Atual:"
                isSenha
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="relative z-0">
              <Inputs
                label="Nova Senha:"
                isSenha
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="relative z-0">
              <Inputs
                label="Confirmar Nova Senha:"
                isSenha
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="bg-[#00bfa6] rounded-lg hover:opacity-90 transition-opacity text-white font-semibold w-full py-2">
              Salvar
            </button>
          </form>
        </Modal>
      )}
      {modalDel && (
        <Modal
          isOpen={modalDel}
          setIsOpen={setModalDel}
          titulo="Excluir Conta"
          del
          delOnClick={deletar}
        />
      )}
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
      <header className="p-3 z-50 w-full text-white">
        <div className="bg-green-900 rounded-2xl px-6 py-4 shadow-xl flex items-center justify-center md:justify-between md:flex-row flex-col border-b-4 border-green-400">
          <div className="flex md:flex-row flex-col items-center gap-4">
            <div className="rounded-full border-2 border-green-500 w-16 h-16 flex items-center justify-center">
              <User fill="white" size={24} />
            </div>
            <div className="md:text-start text-center text-lg">
              <h1 className="font-bold">Olá,</h1>
              <h2 className="italic">{pacienteNome}</h2>
            </div>
          </div>
          <div className="h-px w-full bg-white md:hidden block my-3" />
          <Link to="/" className="md:m-6 group relative w-max">
            <div className="flex items-center transition-all gap-1 hover:gap-2">
              <ArrowLeft size={20} />
              <h1 className="font-medium">Início</h1>
            </div>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-white group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-white group-hover:w-3/6"></span>
          </Link>
        </div>
      </header>
      <main className="max-w-[1440px] mx-auto 2xl:p-0 py-3 px-6">
        <h1 className="py-7 text-2xl font-bold">Acesso Rápido</h1>
        <HoverDevCards
          onClickEdt={() => openEditModal(currentPaciente)}
          onClickDel={() => openDeleteModal(currentPaciente)}
          onClickRegistroEmocoes={handleRegistroEmocoes}
          onClickCronometro={handleCronometro}
          onClickDiario={handleDiario}
        />
        <h1 className="py-11 text-2xl font-bold">Guias</h1>
        <section className="flex items-center flex-col gap-10">
          <div className="w-full h-72 sm:h-56 md:h-40 bg-green-800 rounded-2xl transition-all shadow-xl hover:shadow-2xl text-white p-6 text-2xl relative">
            <h1 className="font-light leading-9">
              Confira seus últimos registros de
              <br />
              expressão de sentimentos.
            </h1>
            <button
              onClick={handleDiario}
              className="absolute bottom-0 right-0 p-5 bg-pink-500 shadow-3D rounded-tl-2xl rounded-br-xl hover:pb-6 transition-all flex items-center gap-2"
            >
              <h6 className="text-sm">Acessar</h6>
              <ArrowUpRight weight="bold" />
            </button>
          </div>
          <div className="w-full h-72 sm:h-56 md:h-40 bg-green-800 rounded-2xl transition-all shadow-xl hover:shadow-2xl text-white p-6 text-2xl relative">
            <h1 className="font-light leading-9">
              Problemas com ansiedade, ataque de pânico?
              <br />
              Acesse nossa respiração guiada.
            </h1>
            <button
              onClick={handleCronometro}
              className="absolute bottom-0 right-0 p-5 bg-pink-500 shadow-3D rounded-tl-2xl rounded-br-xl hover:pb-6 transition-all flex items-center gap-2"
            >
              <h6 className="text-sm">Acessar</h6>
              <ArrowUpRight weight="bold" />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

const HoverDevCards = ({ onClickEdt, onClickDel, onClickRegistroEmocoes, onClickCronometro, onClickDiario }) => {
  return (
    <div className="grid justify-between gap-4 grid-cols-2 lg:grid-cols-4">
      <HoverForCards
        title="Diário"
        subtitle={<ArrowUpRight />}
        Icon={BookBookmark}
        onClick={onClickDiario}
      />
      <HoverForCards
        title="Respiração Guiada"
        subtitle={<ArrowUpRight />}
        Icon={Wind}
        onClick={onClickCronometro}
      />
      <HoverForCards
        title="Registro Emoções"
        subtitle={<ArrowUpRight />}
        Icon={Database}
        onClick={onClickRegistroEmocoes}
      />
      <HoverForCards
        title="Editar Dados"
        subtitle={<ArrowUpRight />}
        Icon={NotePencil}
        onClick={onClickEdt}
      />
      <HoverForCards
        title="Deletar Conta"
        subtitle={<ArrowUpRight />}
        Icon={Trash}
        onClick={onClickDel}
      />
    </div>
  );
};
