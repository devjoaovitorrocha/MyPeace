import {
  ArrowLeft,
  ArrowUpRight,
  BookBookmark,
  Database,
  NotePencil,
  Trash,
  User,
  UserPlus,
  Wind,
  BookOpenText,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import HoverForCards from "../../components/HoverForCards";
import Inputs from "../../components/Inputs";
import { Toaster, toast } from "sonner";
import Notification from "../../components/Notification"; 
import axios from "axios";
import PhotoModal from "../../components/PhotoModal";

export default function PrincipalCliente() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [modalPhoto, setModalPhoto] = useState(false);
  const [modalEdt, setModalEdt] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [modalAvisoDel, setModalAvisoDel] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [pacienteNome, setPacienteNome] = useState("");
  const [photoSrc, setPhotoSrc] = useState(""); 
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
      fetchPacientInfo(state.id, state.token);
    }
  }, [navigate, state]);

  const showNotification = ({ name, description, type, time="Agora" }) => {
    toast(
      <Notification
      name={name}
      description={description}
      time={time}
      type={type}
      />
    );
  };

  const fetchPacientInfo = async (userId, token) => {
    try {
      console.log("Fetching patient info...");
      const response = await axios.get(
        `https://api-mypeace.vercel.app/get/pacientInfo/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Patient info response:", response.data);
      if (response.data) {
        const { name, email, photo_name } = response.data;
        setNome(name);
        setEmail(email);
        if (photo_name) {
          const photoUrl = await getPhoto(userId, token, photo_name);
          setPhotoSrc(photoUrl);
          console.log("Photo URL set:", photoUrl);
        }
      } else {
        throw new Error("Dados do paciente não encontrados.");
      }
    } catch (error) {
      showNotification({
        name: "Erro!",
        description: "Erro ao buscar informações do paciente.",
        type: "error",
      });
      console.error("Erro ao buscar paciente:", error.response?.data || error.message);
    }
  };

  const getPhoto = async (userId, token, photoName) => {
    try {
      const response = await axios.get(
        `https://api-mypeace.vercel.app/get/photo/${userId}/${photoName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob', 
        }
      );
      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching photo:", error.response?.data || error.message);
      throw error;
    }
  };

  const handleSavePhoto = async (newPhoto) => {
    try {
      console.log("Uploading photo...");
      const formData = new FormData();
      formData.append("photo", newPhoto);
      formData.append("userType", "pacient");

      
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post(
        `https://api-mypeace.vercel.app/upload/photo/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Photo upload response:", response.data);
      if (response.status === 201) {
        showNotification({
          name: "Sucesso!",
          description: "Foto atualizada com sucesso!",
          type: "success",
        });
        const photoUrl = await getPhoto(id, token, response.data.fileName);
        setPhotoSrc(photoUrl);
        console.log("Photo URL set:", photoUrl);
        setModalPhoto(false);
      }
    } catch (error) {
      console.error("Error uploading photo:", error.response?.data || error.message);
      handleErrorResponse(error);
    }
  };

  const handleDeletePhoto = async (photoName) => {
    try {
      const response = await axios.post(
        `https://api-mypeace.vercel.app/delete/photo/${id}/${photoName}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        showNotification({
          name: "Sucesso!",
          description: "Foto deletada com sucesso!",
          type: "success",
        });
        setPhotoSrc(""); // Limpa a foto atual
      }
    } catch (error) {
      console.error("Erro ao deletar foto:", error.response?.data || error.message);
      handleErrorResponse(error);
    }
  };

  const edtDadosSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://api-mypeace.vercel.app/update/pacients/${id}`,
        { name: nome, email: email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showNotification({
        name: "Sucesso!",
        description: "Dados editados com sucesso!",
        type: "success",
      });
      setPacienteNome(nome);

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
        `https://api-mypeace.vercel.app/update/password/pacients/${id}`,
        { currentPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
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

  const deletar = async () => {
    try {
      const response = await axios.post(
        `https://api-mypeace.vercel.app/delete/pacients/${id}`,
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

  const openEditModal = (paciente) => {
    if (paciente) {
      fetchPacientInfo();
      setCurrentPaciente(paciente);
      setNome(paciente.name);
      setEmail(paciente.email);
      setModalEdt(true);
    }
  };
   const openPhotoModel = (paciente) => {
    if (paciente) {
      setModalPhoto(true);
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

  const handleDiarioBordo = () => {
    navigate("/principalCliente/diariobordo", {
      state: { token, id, nome: pacienteNome },
    });
  };


  return (
    <>
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
            background: "transparent",
            border: "none",
          },
        }}
      />
     {modalPhoto && (
        <PhotoModal
          isOpen={modalPhoto}
          setIsOpen={setModalPhoto}
          titulo="Adicionar Foto"
          photoSrc={photoSrc}
          onPhotoUpload={handleSavePhoto}
          onDeletePhoto={handleDeletePhoto}
          onContinue={() => setModalPhoto(false)}
          onExit={() => setModalPhoto(false)}
        />
      )}
      {modalAvisoDel && (
        <Modal
          isOpen={modalAvisoDel}
          setIsOpen={setModalAvisoDel}
          titulo="Aviso Importante"
          conteudo={`Tem certeza que deseja excluir?`}
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

      <header className="p-3 z-50 w-full text-white">
        <div className="bg-green-900 rounded-2xl px-6 py-4 shadow-xl flex items-center justify-center md:justify-between md:flex-row flex-col border-b-4 border-green-400">
          <div className="flex md:flex-row flex-col items-center gap-4">
            <div className="rounded-full border-2 border-green-500 w-16 h-16 flex items-center justify-center">
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt="Foto de Perfil"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User fill="white" size={24} />
              )}
            </div>
            <div className="md:text-start text-center text-lg">
              <h1 className="font-bold">Olá,</h1>
              <h2 className="italic">{state?.nome}</h2>
            </div>
          </div>
          <div className="h-px w-full bg-white md:hidden block my-3" />
          <Link to="/" className="md:m-6 group relative w-max">
            <div className="flex items-center transition-all gap-1 hover:gap-2">
              <ArrowLeft size={20} />
              <h1 className="font-medium">Sair</h1>
            </div>
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
          onClickPhoto={() => openPhotoModel(currentPaciente)}
          onClickDiarioBordo={handleDiarioBordo}
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

const HoverDevCards = ({ onClickEdt, onClickDel, onClickRegistroEmocoes, onClickCronometro, onClickDiario, onClickPhoto, onClickDiarioBordo }) => {
  return (
    <div className="grid justify-between gap-4 grid-cols-2 lg:grid-cols-4">
      <HoverForCards
        title="Diário"
        subtitle={<ArrowUpRight />}
        Icon={BookBookmark}
        onClick={onClickDiario}
      />
      <HoverForCards
        title="Diário De Bordo"
        subtitle={<ArrowUpRight />}
        Icon={BookOpenText}
        onClick={onClickDiarioBordo}
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
        title="Adicionar Foto"
        subtitle={<ArrowUpRight />}
        Icon={UserPlus}
        onClick={onClickPhoto}
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
