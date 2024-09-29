import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Container from "../../components/Container";

export default function Cronometro() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("Clique em iniciar para começarmos");

  useEffect(() => {
    let timer;

    if (running) {
      if (time < 4) {
        setPhase("Inspire o Ar");
      } else if (time < 11) {
        setPhase("Segure o Ar");
      } else if (time < 19) {
        setPhase("Expire o Ar");
      } else {
        setPhase("Concluído");
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
  };

  const pauseTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setRunning(false);
    setPhase("Clique em iniciar para começarmos");
  };

  const progress = (time / 19) * 100;
  const strokeWidth = 20;
  const radius = 90 - strokeWidth / 2;
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
            <div className="mt-4 text-lg text-center font-medium">{phase}</div>
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
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
