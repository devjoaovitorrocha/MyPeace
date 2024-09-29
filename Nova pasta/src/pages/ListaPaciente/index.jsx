import { useEffect, useState } from "react";
import {
  CalendarDots,
  UserPlus,
  ArrowLeft,
  NotePencil,
  Trash,
} from "@phosphor-icons/react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { Toaster, toast } from "sonner";
import Inputs from "../../components/Inputs";
import { Button } from "flowbite-react";

export default function ListaPaciente() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalDel, setModalDel] = useState(false);
  const [modalEdt, setModalEdt] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [currentPaciente, setCurrentPaciente] = useState(null);

  useEffect(() => {
      if (!state?.token || !state?.id) {
          navigate("/login");
      } else {
          setToken(state.token);
          setId(state.id);
          fetchPacientes(state.token, state.id);
      }
  }, [navigate, state]);

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
      toast.error(
        "Erro ao buscar pacientes. Por favor, tente novamente mais tarde."
      );
    }
  }

  async function cadastrar(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://api-mypeace.vercel.app/register/pacient/${id}`,
        {
          name,
          email,
          idPsychologist: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(
        `Senha do usuáio: ${response.data.password}` ||
          "Paciente cadastrado com sucesso!"
      );
      console.log(response.data.password)
      setModalAdd(false);
      fetchPacientes(token, id);
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  async function editar(event) {
    event.preventDefault();
    if (!currentPaciente) return;

    try {
      const response = await axios.post(
        `https://api-mypeace.vercel.app/update/pacients/${currentPaciente._id}`,
        {
          name,
          email,
          idPsychologist: id,
        }
      );
      toast.success(`${response.data.msg}` || "Paciente editado com sucesso!");
      setModalEdt(false);
      fetchPacientes(token, id);
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  async function deletar() {
    if (!currentPaciente) return;

    try {
      const response = await axios.post(
        `https://api-mypeace.vercel.app/delete/pacients/${currentPaciente._id}`,
        {
          headers: {
            Autorizado: `Bearer ${token}`,
          },
        }
      );
      toast.success(`${response.data.msg}` || "Paciente deletado com sucesso!");
      setModalDel(false);
      fetchPacientes(token, id);
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  function handleErrorResponse(error) {
    if (error.response) {
      if (error.response.status === 401) {
        alert("Sessão expirada");
        navigate("/login");
      } else {
        toast.error(
          `${error.response.data.msg}` ||
            "Erro ao processar a solicitação. Por favor, tente novamente mais tarde."
        );
      }
    } else {
      toast.error(
        "Erro ao processar a solicitação. Por favor, tente novamente mais tarde."
      );
    }
  }

  function openEditModal(paciente) {
    setCurrentPaciente(paciente);
    setName(paciente.name);
    setEmail(paciente.email);
    setModalEdt(true);
  }

  function openDeleteModal(paciente) {
    setCurrentPaciente(paciente);
    setModalDel(true);
  }
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
      {modalDel && (
        <Modal
          isOpen={modalDel}
          setIsOpen={setModalDel}
          del
          titulo={"Deletar conta permanentemente?"}
          conteudo={
            "Ao excluir a conta seu paciente será deslogado do MyPeace e a conta será deletada permanentemente"
          }
          delOnClick={deletar}
        />
      )}
      {modalAdd && (
        <Modal
          isOpen={modalAdd}
          setIsOpen={setModalAdd}
          titulo={`Adicionar Paciente`}
          form
        >
          <form className="mt-5 space-y-8" onSubmit={cadastrar}>
            <div className="relative z-0">
              <Inputs
                label={"Nome:"}
                type={"text"}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative z-0">
              <Inputs
                label={"Email:"}
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#00bfa6] rounded-lg hover:opacity-90 transition-opacity text-white font-semibold w-full py-2"
            >
              Adicionar
            </button>
          </form>
        </Modal>
      )}
      {modalEdt && (
        <Modal
          isOpen={modalEdt}
          setIsOpen={setModalEdt}
          titulo={`Editar Conta`}
          form
        >
          <form className="mt-5 space-y-8" onSubmit={editar}>
            <div className="relative z-0">
              <Inputs
                label={"Nome:"}
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative z-0">
              <Inputs
                label={"Email:"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#00bfa6] rounded-lg hover:opacity-90 transition-opacity text-white font-semibold w-full py-2"
            >
              Confirmar
            </button>
          </form>
        </Modal>
      )}
      <header className="flex flex-col md:flex-row items-center justify-between max-w-[1440px] mx-auto">
        <h1 className="text-4xl py-6 md:py-12 text-white text-center font-semibold">
          Lista de Pacientes
        </h1>
        <Link
          className="cursor-pointer hover:opacity-95 relative w-fit hidden md:block after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
          to="/principalPsico"
        >
          <div className="flex items-center hover:gap-x-1.5 gap-x-1 transition-all text-white font-light">
            <ArrowLeft weight="bold" />
            Voltar
          </div>
        </Link>
      </header>
      <main className="max-w-[1440px] mx-auto bg-white shadow-3D rounded-xl p-6">
        <header className="flex flex-col md:flex-row items-center justify-between gap-5 border-b border-gray-300 pb-6">
          <button
            onClick={() => setModalAdd(true)}
            className="md:w-auto w-full group flex h-10 items-center gap-2 rounded-xl bg-neutral-200 pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-black hover:pl-2 hover:text-white active:bg-neutral-700 shadow-3D relative"
          >
            <span className="animate-ping absolute inline-flex w-3 h-3 left-[10px] rounded-full bg-slate-900 group-hover:hidden" />
            <span className="rounded-full bg-black p-1 text-sm transition-colors duration-300 group-hover:bg-white">
              <UserPlus
                weight="bold"
                className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-black group-active:-rotate-45"
              />
            </span>
            <span className="group-hover:italic font-medium">
              Adicionar Paciente
            </span>
          </button>
          <div className="p-4 bg-indigo-500 rounded-full text-xs text-white font-semibold hidden md:flex items-center gap-x-2 shadow-md">
            <CalendarDots weight="fill" size={18} />
            <span className="font-medium">•</span>
            {new Date().toLocaleDateString()}
          </div>
        </header>
        <Table>
           {pacientes.length > 0 ? (
            pacientes.map((paciente, index) => (
              <tr key={paciente._id}>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {index + 1}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {paciente.name}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {paciente.email}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              <Button>Verificar</Button>
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex items-center gap-2 flex-wrap">
              <button
                onClick={() => openDeleteModal(paciente)}
                className="p-2 bg-[#bf0047] rounded-md shadow-3D transition-all hover:opacity-90"
              >
                <Trash weight="fill" color="white" />
              </button>
              <button
                onClick={() => openEditModal(paciente)}
                className="p-2 bg-[#00bfa6] rounded-md shadow-3D transition-all hover:opacity-90"
              >
                <NotePencil weight="fill" color="white" />
              </button>
            </td>
          </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 italic">Nenhum paciente encontrado</td>
            </tr>
          )} 
        </Table>
        <div className="mt-6 p-4 bg-indigo-500 rounded-full text-xs text-white font-semibold flex md:hidden justify-center items-center gap-x-2 shadow-md">
            <CalendarDots weight="fill" size={18} />
            <span className="font-medium">•</span>
            {new Date().toLocaleDateString()}
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
}
