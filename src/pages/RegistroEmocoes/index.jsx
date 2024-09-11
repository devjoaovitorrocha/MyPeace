import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { http } from "../../App";

const emojis = ["😀", "😊", "😢", "😠", "😱", "😔"];

export default function RegistroEmocao() {
  const { state } = useLocation();
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [description, setDescription] = useState("");
  const [phase, setPhase] = useState("Insira suas emoções do dia!");
  const [dataAtual, setDataAtual] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [savedFeelings, setSavedFeelings] = useState([]);
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.token || !state?.id) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
    }
  }, [navigate, state]);

  useEffect(() => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    setDataAtual(`${dia}/${mes}/${ano}`);
  }, []);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleSave = () => {
    if (description === "" || selectedEmoji === "") {
      setMensagem("Por favor, preencha a descrição e selecione um emoji.");
    } else {
      const newEntry = {
        id: Date.now(),
        feeling: selectedEmoji,
        description: description,
        dataAtual: new Date().toLocaleDateString("pt-BR"),
      };
      setSavedFeelings([...savedFeelings, newEntry]);

      http.post(`/register/report/${id}`,
          {
            feeling: selectedEmoji,
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
          setTimeout(() => setMensagem(""), 2000);
          setDescription("");
          setSelectedEmoji("");
        })
        .catch((error) => {
          setMensagem(error.response?.data?.msg || "Erro ao salvar os dados.");
        });
    }
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
              <div className="text-red-500 font-bold mt-2">
                {mensagem}
              </div>
            )}

            <div className="mt-4 flex flex-nowrap justify-center space-x-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiClick(emoji)}
                  className={`text-3xl ${selectedEmoji === emoji ? "border-2 border-green-500" : ""}`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <textarea
              className="mt-4 p-2 w-full border rounded-lg resize-none"
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
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
