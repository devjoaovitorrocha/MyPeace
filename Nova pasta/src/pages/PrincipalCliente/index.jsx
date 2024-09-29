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

export default function PrincipalCliente() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [modalEdt, setModalEdt] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [eye, setEye] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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
          email: email,
          password: senha,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`${response.data.msg}` || "Dados editados com sucesso!")
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
      toast.success(`${response.data.msg}` || "Paciente deletado com sucesso!");
      setModalDel(false);
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
        toast.error(`${error.response.data.msg}` || "Erro ao processar a solicitação. Por favor, tente novamente mais tarde.")
      }
    } else {
      toast.error("Erro ao processar a solicitação. Por favor, tente novamente mais tarde.")
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
      {modalEdt && (
        <Modal
          isOpen={modalEdt}
          setIsOpen={setModalEdt}
          titulo={`Editar Dados`}
          form
        >
          <form className="mt-5 space-y-8" onSubmit={edtDadosSubmit}>
            {" "}
            <div className="relative z-0">
              {" "}
              <Inputs label={"Nome:"} />{" "}
            </div>{" "}
            <div className="relative z-0">
              {" "}
              <Inputs label={"Email:"} />{" "}
            </div>{" "}
            <div className="relative z-0">
              {" "}
              <Inputs label={"Senha:"} isSenha />{" "}
            </div>{" "}
            <button className="bg-[#00bfa6] rounded-lg hover:opacity-90 transition-opacity text-white font-semibold w-full py-2">
              {" "}
              Salvar{" "}
            </button>{" "}
          </form>
        </Modal>
      )}
      {modalDel && (
        <Modal
          isOpen={modalDel}
          setIsOpen={setModalDel}
          titulo={`Excluir Conta`}
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
        <div className=" bg-green-900 rounded-2xl px-6 py-4 shadow-xl flex items-center justify-center md:justify-between md:flex-row flex-col border-b-4 border-green-400">
          <div className="flex md:flex-row flex-col items-center gap-4">
            <div className="rounded-full border-2 border-green-500 w-16 h-16 flex items-center justify-center">
              <User fill="white" size={24} />
            </div>
            <div className="md:text-start text-center text-lg">
              <h1 className="font-bold">Olá, </h1>
              <h2 className="italic">Nome do Cliente</h2>
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
        />
        <h1 className="py-11 text-2xl font-bold">Guias</h1>
        <section className="flex items-center flex-col gap-10">
          <div className="w-full h-72 sm:h-56 md:h-40 bg-green-800 rounded-2xl transition-all shadow-xl hover:shadow-2xl text-white p-6 text-2xl relative">
            <h1 className="font-light leading-9">
              Confira seus últimos registros de
              <br />
              expressão de sentimentos.
            </h1>
            <button className="absolute bottom-0 right-0 p-5 bg-pink-500 shadow-3D rounded-tl-2xl rounded-br-xl hover:pb-6 transition-all flex items-center gap-2">
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
            <button className="absolute bottom-0 right-0 p-5 bg-pink-500 shadow-3D rounded-tl-2xl rounded-br-xl hover:pb-6 transition-all flex items-center gap-2">
              <h6 className="text-sm">Acessar</h6>
              <ArrowUpRight weight="bold" />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

const HoverDevCards = ({ onClickEdt, onClickDel }) => {
  return (
    <div className="grid justify-between gap-4 grid-cols-2 lg:grid-cols-4">
      <HoverForCards
        title="Diário"
        subtitle={<ArrowUpRight />}
        Icon={BookBookmark}
      />
      <HoverForCards
        title="Respiração Guiada"
        subtitle={<ArrowUpRight />}
        Icon={Wind}
        link={"/principalCliente/cronometro"}
        isLink
      />
      <HoverForCards
        title="Registro Emoções"
        subtitle={<ArrowUpRight />}
        Icon={Database}
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
