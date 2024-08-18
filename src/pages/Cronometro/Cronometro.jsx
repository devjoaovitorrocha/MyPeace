import './Cronometro.css'
import logo from '../../assets/logo.png'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export default function Cronometro() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("Clique em iniciar para começarmos");

  

  // UseEffect para controlar o cronômetro e as fases
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
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
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
    <>
      <header className="header">
        <div className="top-section">
          <div className="left-section">
            <img src={logo} width={80} alt="" className='my' />
            <h1 className="title">MyPeace</h1>
          </div>
          <nav className="right-section">
            <ul>

              <li><a href="/">Inicio</a></li>
            </ul>
          </nav>
        </div>
        <div className="bottom-bar">
          Respiração Guiada
        </div>
      </header>

      <div className="timer-container">
        <svg className="progress-ring" height="220" width="220">
          <circle
            className="progress-ring-circle"
            stroke="#3C5454"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx="110" 
            cy="110" 
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset
            }}
          />
          <text
            x="100"
            y="110"
            dominantBaseline="middle"
            textAnchor="middle"
            className="number"
            writingMode="tb"
          >
            {time}
          </text>
        </svg>
        <div className="phase">{phase}</div>
        <div className="button-group">
          <button onClick={startTimer} className="button">Iniciar</button>
          <button onClick={pauseTimer} className="button">Pausar</button>
          <button onClick={resetTimer} className="button">Reiniciar</button>
        </div>
      </div>
    </>
  )
}
