import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import Chat from "../../components/Chat";
import axios from "axios";  // Importando Axios para fazer requisições HTTP
import { http } from "../../App";

const emojis = {
  feliz: '😊',
  contente: '🙂',
  neutro: '😐',
  triste: '🙁',
  raiva: '😠',
};

// Adicionando mais palavras sensíveis
const sensitiveWords = [
  "suicídio", "morte", "triste", "depressão", "acabou", "desespero", "sofrimento", "isolamento", 
  "sem esperança", "ansiedade", "angústia", "autoagressão", "autolesão", "pânico", "medo", 
  "dor", "perdido", "cansado", "desistir"
];

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

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

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
      // Verifica se há alguma palavra sensível na descrição
      const containsSensitiveWord = sensitiveWords.some((word) =>
        description.toLowerCase().includes(word)
      );

      // Nova função para analisar texto usando Google Natural Language API
      analyzeSentimentWithGoogle(description);

      const newEntry = {
        id: Date.now(),
        feeling: selectedFeeling,
        description: description,
        dataAtual: new Date().toLocaleDateString("pt-BR"),
      };
      setSavedFeelings([...savedFeelings, newEntry]);

      // Salvar no banco de dados
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

          // Se houver uma palavra sensível, abre o chat e adiciona a mensagem do CVV
          if (containsSensitiveWord) {
            setIsChatOpen(true); // Abrir o chat
            setChatMessages([{
              text: "Percebemos que você está passando por um momento difícil. Por favor, considere entrar em contato com o Centro de Valorização da Vida (CVV): 188.",
              sent: false,
            }]);
          }
        })
        .catch((error) => {
          const errorMsg = error.response?.data?.msg || "Erro ao salvar os dados.";
          setMensagem(errorMsg);
          setMensagemTipo("error");
          LimparMensagem();

          if (containsSensitiveWord) {
            setIsChatOpen(true);
            setChatMessages([{
              text: "Percebemos que você está passando por um momento difícil. Por favor, considere entrar em contato com o CVV: 188.",
              sent: false,
            }]);
          }
        });
    }
  };

 // Função para fazer a análise de sentimento usando sua API no Vercel
const analyzeSentimentWithGoogle = async (text) => {
  try {
    // Altere essa URL para o endpoint da sua API hospedada no Vercel
    const vercelApiUrl = 'https://api-verificar-sentimentos.vercel.app/api/analyze-sentiment';

    const response = await axios.post(
      vercelApiUrl,
      { text },  // Envia o texto para ser analisado
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const { documentSentiment } = response.data;
    const { score, magnitude } = documentSentiment;

    console.log(`Sentimento detectado: ${score}, Intensidade: ${magnitude}`);

    // Exibir mensagem de apoio se o sentimento for negativo
    if (score < -0.5) {
      setIsChatOpen(true);
      setChatMessages([{
        text: "Identificamos que você está passando por um momento difícil. Considere falar com o CVV: 188.",
        sent: false,
      }]);
    }
  } catch (error) {
    console.error("Erro ao chamar a API do Vercel:", error);
    setMensagem("Erro ao analisar o sentimento. Tente novamente.");
    setMensagemTipo("error");
    LimparMensagem();
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

      {/* Chat Component */}
      {isChatOpen && (
        <Chat
          titulo="Ajuda"
          onClose={() => setIsChatOpen(false)} // Função para fechar o chat
          initialMessages={chatMessages} // Passando as mensagens do chat
        />
      )}
    </div>
  );
}
