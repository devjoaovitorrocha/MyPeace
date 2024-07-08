import React from 'react';
import './PrincipalCliente.css';
import diaryicon from '../../assets/diary-icon.png';
import breathingicon from '../../assets/breathing-icon.png';
import registericon from '../../assets/diary-icon.png';
import {useNavigate } from "react-router-dom";

function PrincipalPsico() {

    const navigate = useNavigate();

    return (

        <div>
            <header className="cabecalho-aplicativo">
                <div className="perfil">
                    <div className="foto-placeholder">Foto do Cliente</div>
                    <div className="saudacao">
                        <p>Olá,</p>
                        <p>Nome do Cliente</p>
                    </div>
                </div>
                <nav>
                    <a href="/">Início</a> 
                </nav>
            </header>
            <section className="acesso-rapido">
                <h2>Acesso Rápido</h2>
                <div className="icones">
                    <div className="botao">
                        <div className="icone">
                            <img src={diaryicon} alt="Diário" />
                            <p>Diário</p>
                        </div>
                    </div>
                    <div className="botao" onClick={() => navigate('/cronometro')}>
                        <div className="icone" >
                            <img src={breathingicon} alt="Respiração" />
                            <p>Respiração Guiada</p>
                        </div>
                    </div>
                    <div className="botao">
                        <div className="icone">
                            <img src={registericon} alt="Registro" />
                            <p>Registro Emoções</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="registros-diario">
                <h2>Registros do Diário</h2>
                <div className="registro">
                    <p>Confira os seus últimos registros de expressão de sentimentos</p>
                    <button>Conferir</button>
                </div>
            </section>
            <section className="respiracao-guiada">
                <h2>Respiração Guiada</h2>
                <div className="respiracao">
                    <p>Problemas com ansiedade, ataque de pânico? Acesse nossa respiração guiada.</p>
                    <button>Acessar</button>
                </div>
            </section>
            
        </div>
    );
}

export default PrincipalPsico;
