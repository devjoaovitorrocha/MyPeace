import {
  ArrowLeft,
  ArrowUpRight,
  User,
  Trash,
  UserCirclePlus,
  UserList,
  AddressBook,
  NotePencil,

} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { Toaster, toast } from "sonner";
import React from "react";
import HoverForCards from "../../components/HoverForCards";
import axios from "axios";
import Inputs from "../../components/Inputs";
import Notification from "../../components/Notification";

const HoverDevCards = ({ onVerPacientes, onAddPacientes, onClickDel, onClickEdt, onClickRegistro }) => (
  <div className="grid justify-between gap-4 grid-cols-2 lg:grid-cols-4 py-11">
    <HoverForCards
      title="Adicionar Pacientes"
      subtitle={<ArrowUpRight />}
      Icon={UserCirclePlus}
      onClick={onAddPacientes}
    />
    <HoverForCards
      title="Registro dos Pacientes"
      subtitle={<ArrowUpRight />}
      Icon={AddressBook}
      onClick={onClickRegistro}
    />
    <HoverForCards
      title="Ver Pacientes"
      subtitle={<ArrowUpRight />}
      Icon={UserList}
      onClick={onVerPacientes}
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

export default function PrincipalPsico() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [psicologoNome, setPsicologoNome] = useState("");
  const [modalEdt, setModalEdt] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [modalAvisoDel, setModalAvisoDel] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!state?.token || !state?.id || !state?.nome) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
      setPsicologoNome(state.nome);
    }
  }, [navigate, state]);

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


  const fetchPsychologistInfo = async () => {
    try {
      const response = await axios.get(`https://api-mypeace.vercel.app/get/psychologistInfo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { name, email, cpf, registerNumber } = response.data;
      setNome(name);
      setEmail(email);
      setCpf(cpf);
      setRegisterNumber(registerNumber);
    } catch (error) {
      showNotification({
        name: "Erro!",
        description: "Erro ao buscar informações do psicólogo.",
        type: "error",
      });
      console.error("Erro ao buscar paciente:", error.response?.data || error.message);
    }
  };

  const handleVerPacientes = () => {
    navigate("/principalPsico/listapaciente", { state: { token, id, nome: psicologoNome } });
  };

  const handleAddPaciente = () => {
    navigate('/principalPsico/listapaciente', { state: { token, id, nome: psicologoNome, openModal: true } });
  };

  const handleRegistroPacientes = () => {
    navigate('/principalPsico/registropaciente', { state: { token, id, nome: psicologoNome } });
  };




  const handleCpfChange = (e) => {
    const formattedCpf = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    setCpf(formattedCpf);
  };

  const handleCrpChange = (e) => {
    const formattedCrp = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{4})(\d{1})/, "$1/$2-$3");
    setRegisterNumber(formattedCrp);
  };

  const edtDadosSubmit = async (e) => {
    e.preventDefault();

    try {

      const dadosResponse = await axios.post(
        `https://api-mypeace.vercel.app/update/psychologists/${id}`,
        {
          name: nome,
          email: email,
          cpf: cpf,
          registerNumber: registerNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showNotification({
        name: "Sucesso!",
        description: "Dados editados com sucesso!",
        type: "success",
      });
      setPsicologoNome(nome);

      if (currentPassword && newPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
          toast.error("As novas senhas não coincidem!");
          return;
        }
        await updatePassword();
      }
      setModalEdt(false);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const updatePassword = async () => {
    try {
      const senhaResponse = await axios.post(
        `https://api-mypeace.vercel.app/update/password/psychologist/${id}`,
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
        showNotification({
          name: "Sucesso!",
          description: "Senha atualizada com sucesso!",
          type: "success",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const openAvisoModal = () => {
    setModalAvisoDel(true);
  };

  const confirmaDelete = () => {
    setModalAvisoDel(false);
    setModalDel(true);
  };

  const openEditModal = () => {
    setModalEdt(true);
    fetchPsychologistInfo();
  };

  const deletar = async () => {
    try {
      const response = await axios.post(
        `https://api-mypeace.vercel.app/delete/psychologists/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showNotification({
        name: "Sucesso!",
        description: "Paciente deletado com sucesso!",
        type: "success",
      });
      setModalDel(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleErrorResponse = (error) => {
    const errorMsg =
      error.response?.data?.msg || "Erro ao processar a solicitação.";
    if (error.response?.status === 401) {
      showNotification({
        name: "Info",
        description: "Sessão expirada. Redirecionando para login.",
        type: "info",
      });
      navigate("/login");
    } else {
      showNotification({
        name: "Erro!",
        description: errorMsg,
        type: "error",
      });
    }
  };

  return (
    <>
      {modalEdt && (
        <Modal
          isOpen={modalEdt}
          setIsOpen={setModalEdt}
          titulo="Editar Dados"
          form
        >
          <form className="mt-5 space-y-8" onSubmit={edtDadosSubmit}>
            <div className="relative  z-0">
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
                label="CPF:"
                value={cpf}
                onChange={handleCpfChange}
              />
            </div>
            <div className="relative z-0">
              <Inputs
                label="Número de Registro:"
                value={registerNumber}
                onChange={handleCrpChange}
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

      {modalAvisoDel && (
        <Modal
          isOpen={modalAvisoDel}
          setIsOpen={setModalAvisoDel}
          titulo="Aviso Importante"
          conteudo={`${psicologoNome} deseja deletar sua conta ?`}
          redWarning
          onContinue={confirmaDelete}
          onExit={() => setModalAvisoDel(false)}
        />
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
            maxWidth: "500px",
            borderRadius: "8px",
            gap: "10px",
            boxShadow: "none",
            background: " transparent",
          },
        }}
      />

      <header className="p-3 z-50 w-full text-white">
        <div className=" bg-green-900 rounded-2xl px-6 py-4 shadow-xl flex items-center justify-center md:justify-between md:flex-row flex-col border-b-4 border-green-400">
          <div className="flex md:flex-row flex-col items-center gap-4">
            <div className="rounded-full border-2 border-green-500 w-16 h-16 flex items-center justify-center">
              <User fill="white" size={24} />
            </div>
            <div className="md:text-start text-center text-lg">
              <h1 className="font-bold">Olá, </h1>
              <h2 className="italic">{psicologoNome}</h2>
            </div>
          </div>
          <div className="h-px w-full bg-white md:hidden block my-3" />
          <Link to="/" className="md:m-6 group relative w-max">
            <div className="flex items-center transition-all gap-1 hover:gap-2">
              <ArrowLeft size={20} />
              <h1 className="font-medium">Sair</h1>
            </div>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-white group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-white group-hover:w-3/6"></span>
          </Link>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto 2xl:p-0 py-3 px-6">
        <h1 className="py-7 text-2xl font-bold">Acesso Rápido</h1>
        <HoverDevCards
          onClickDel={openAvisoModal}
          onVerPacientes={handleVerPacientes}
          onAddPacientes={handleAddPaciente}
          onClickEdt={openEditModal}
          onClickRegistro={handleRegistroPacientes}
        />
        <section className="flex flex-col gap-10">
          <h1 className="text-2xl font-bold">Adicionar Pacientes</h1>
          <div className="w-full h-72 sm:h-56 md:h-40 bg-green-800 rounded-2xl transition-all shadow-xl hover:shadow-2xl text-white p-6 text-2xl relative">
            <h1 className="font-light leading-9">
              Adicione pacientes para ter melhores resultados em suas consultas!
            </h1>
            <button onClick={handleAddPaciente} className="absolute bottom-0 right-0 p-5 bg-pink-500 shadow-3D rounded-tl-2xl rounded-br-xl hover:pb-6 transition-all flex items-center gap-2">
              <h6 className="text-sm">Acessar</h6>
              <ArrowUpRight weight="bold" />
            </button>
          </div>
          <h1 className="text-2xl font-bold">Registro dos Pacientes</h1>
          <div className="w-full h-72 sm:h-56 md:h-40 bg-green-800 rounded-2xl transition-all shadow-xl hover:shadow-2xl text-white p-6 text-2xl relative">
            <h1 className="font-light leading-9">
              Veja como seu paciente anda se sentindo durante a semana
            </h1>
            <button onClick={handleRegistroPacientes} className="absolute bottom-0 right-0 p-5 bg-pink-500 shadow-3D rounded-tl-2xl rounded-br-xl hover:pb-6 transition-all flex items-center gap-2">
              <h6 className="text-sm">Acessar</h6>
              <ArrowUpRight weight="bold" />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
