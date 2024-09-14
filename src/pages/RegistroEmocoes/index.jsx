import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { http } from "../../App";
import { ArrowLeft } from "@phosphor-icons/react";

const emojis = {
  feliz: '😊',
  contente: '🙂',
  neutro: '😐',
  triste: '🙁',
  raiva: '😠',
};

export default function RegistroEmocao() {
  const { state } = useLocation();
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [description, setDescription] = useState("");
  const [phase, setPhase] = useState("Insira suas emoções do dia!");
  const [dataAtual, setDataAtual] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mensagemTipo, setMensagemTipo] = useState("");
  const [savedFeelings, setSavedFeelings] = useState([]);
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [pacienteNome, setPacienteNome] = useState("");

  useEffect(() => {
    if (!state?.token || !state?.id || !state?.nome) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
      setPacienteNome(state.nome);
    }
  }, [navigate, state]);

  useEffect(() => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    setDataAtual(`${dia}/${mes}/${ano}`);
  }, []);

  const handleEmojiClick = (feeling) => {
    setSelectedFeeling(feeling);
  };

  const handleSave = () => {
    if (!token || !id) {
      setMensagem("Erro: Token ou ID ausente. Por favor, faça login novamente.");
      setMensagemTipo("error");
      LimparMensagem();
      return;
    }

    if (description === "" || selectedFeeling === "") {
      setMensagem("Por favor, preencha a descrição e selecione uma emoção.");
      setMensagemTipo("error");
      LimparMensagem();
    } else {
      const newEntry = {
        id: Date.now(),
        feeling: selectedFeeling,
        description: description,
        dataAtual: new Date().toLocaleDateString("pt-BR"),
      };
      setSavedFeelings([...savedFeelings, newEntry]);

      http.post(`/register/report/${id}`,
        {
          feeling: selectedFeeling,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          setMensagem("Salvo com sucesso!");
          setMensagemTipo("success");
          setDescription("");
          setSelectedFeeling("");
          LimparMensagem();
        })
        .catch((error) => {
          const errorMsg = error.response?.data?.msg || "Erro ao salvar os dados.";
          setMensagem(errorMsg);
          setMensagemTipo("error");
          LimparMensagem();
        });
    }
  };


  const LimparMensagem = () => {
    setTimeout(() => {
      setMensagem("");
      setMensagemTipo("");
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container>
        <div className="flex-grow flex items-center justify-center my-12">
          <div className="flex flex-col items-center shadow-3D p-8 rounded-lg rounded-tl-none relative sm:w-[300px] sm:h-[400px]">
            <div className="w-full bg-green-950 absolute left-0 -translate-x-[154px] sm:-translate-x-[162px] -translate-y-1 top-[34%] -rotate-90 rounded-t-lg text-end text-white uppercase font-medium pr-4">
              Registro de Emoção
            </div>

            <div className="mt-4 text-lg text-center font-medium">{phase}</div>

            {mensagem && (
              <div className={`font-bold mt-2 ${mensagemTipo === "success" ? "text-[#00bfa6]" : "text-red-500"}`}>
                {mensagem}
              </div>
            )}

            <div className="mt-4 flex flex-nowrap justify-center space-x-0">
              {Object.entries(emojis).map(([feeling, emoji], index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiClick(feeling)}
                  className={`text-3xl p-2 transition-all ${selectedFeeling === feeling
                    ? "border-2 bg-[#00bfa6] rounded-full"
                    : ""
                    }`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <textarea
              className="mt-4 p-2 w-full border border-[#00bfa6]-300 focus:border-[#008f7a] focus:ring-[#00bfa6] rounded-lg resize-none"
              rows="4"
              placeholder="Escreva sobre como você está se sentindo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />


            <div className="mt-6">
              <button
                onClick={handleSave}
                className="bg-[#00bfa6] hover:bg-[#008f7a] text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Salvar
              </button>
            </div>
            <div className="mt-4 flex justify-center">

              <Link
                className="cursor-pointer hover:opacity-95 relative w-fit block after:block after:content-[''] 
            after:absolute after:h-[2px] after:bg-black text-black after:w-full after:scale-x-0 
            after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                to="/principalCliente"
                state={{ token, id, nome: pacienteNome }}
              >
                <div className="flex items-center hover:gap-x-1.5 gap-x-1 transition-all">
                  <ArrowLeft />
                  Voltar
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
