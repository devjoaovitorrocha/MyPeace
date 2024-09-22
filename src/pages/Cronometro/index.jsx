import { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { ArrowLeft } from "@phosphor-icons/react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Cronometro() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("Clique em iniciar para começarmos");
  const [pacienteNome, setPacienteNome] = useState("");
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const navigate = useNavigate();
  const { state } = useLocation();
  const phaseRef = useRef("");
  const audioRef = useRef(null);
  
  
  useEffect(() => {
    if (!state?.token || !state?.id || !state?.nome) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
      setPacienteNome(state.nome);
    }
  }, [navigate, state]);

  const falarTexto = async (texto) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause(); 
        audioRef.current = null;
      }
  
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/oWAxZDx7w5VEj9dCyTzz`, {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": "sk_d0b2fb07653645b9d69b6a170dc87be58e3a5df5b36f337e",
        },
        body: JSON.stringify({
          text: texto,
          model_id: "eleven_multilingual_v1",  
          voice_settings: {
            stability: 0.7, 
            similarity_boost: 0.85,  
          },
        }),
      });
  
      if (!response.ok) throw new Error("Failed to convert text to speech.");
  
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play();
    } catch (error) {
      console.error("Error in text-to-speech:", error);
    }
  };
  
  const updatePhase = (newPhase) => {
    if (phaseRef.current !== newPhase) {
      phaseRef.current = newPhase;
      setPhase(newPhase);
      falarTexto(newPhase); 
    }
  };

  useEffect(() => {
    let timer;
    if (running) {
      if (time < 4) {
        updatePhase("Puxe o Ar");
      } else if (time < 11) {
        updatePhase("Segure o Ar");
      } else if (time < 19) {
        updatePhase("Solte o Ar");
      } else {
        updatePhase("Concluído");
        setRunning(false);
      }

      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running, time]);

  const startTimer = () => {
    setTime(0);
    setRunning(true);
    phaseRef.current = "";
  };

  const pauseTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setRunning(false);
    setPhase("Clique em iniciar para começarmos");
    phaseRef.current = "";
  };

  const progress = (time / 19) * 100;
  const strokeWidth = 20;
  const radius = 90;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container>
        <div className="flex-grow flex items-center justify-center my-12">
          <div className="flex flex-col items-center shadow-3D p-8 rounded-lg rounded-tl-none relative sm:w-[300px] sm:h-[400px]">
            <div className="w-full bg-green-950 absolute left-0 -translate-x-[154px] sm:-translate-x-[162px] -translate-y-1 top-[34%] -rotate-90 rounded-t-lg text-end text-white uppercase font-medium pr-4">
              Respiração Guiada
            </div>
            <svg className="progress-ring" height="220" width="220">
              <circle
                className="progress-ring-circle"
                stroke="#00bfa6"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx="110"
                cy="110"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: offset,
                  transition: "stroke-dashoffset 0.5s",
                }}
              />
              <text
                x="110"
                y="120"
                textAnchor="middle"
                className="text-4xl text-[#00bfa6] font-bold"
              >
                {time}
              </text>
            </svg>
            <div className="mt-4 text-center font-medium">{phase}</div>
            <div className="flex space-x-4 mt-6">
              {!running ? (
                <button
                  onClick={startTimer}
                  className="bg-[#00bfa6] hover:bg-[#008f7a] text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Iniciar
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="bg-[#e74c3c] hover:bg-[#c0392b] text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Pausar
                </button>
              )}
              <button
                onClick={resetTimer}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Reiniciar
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
