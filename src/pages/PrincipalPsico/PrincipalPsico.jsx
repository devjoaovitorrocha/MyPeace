import React, { useEffect, useState } from 'react';
import './PrincipalPsico.css';
import addperson from '../../assets/addperson.png';
import pacientsregistry from '../../assets/patientregistry.png';
import patients from '../../assets/patients.png';
import { useNavigate, useLocation } from "react-router-dom";

function PrincipalPsico() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (state?.token && state?.id) {
            setToken(state.token);
            setId(state.id);
        } else {
            navigate("/login");
        }
    }, [state, navigate]);

    const handleAddPaciente = () => {
        navigate('/addPaciente', { state: { token, id } });
    };

    const handleRegistros = () => {
        navigate('/registrosPaciente', { state: { token, id } });
    };

    const handleVerPacientes = () => {
        navigate('/principalPsico/listapaciente', { state: { token, id } });
    };

    return (
        <div>
            <header className="cabecalho-aplicativo">
                <div className="perfil">
                    <div className="foto-placeholder">Foto do Psicólogo</div>
                    <div className="saudacao">
                        <p>Olá,</p>
                        <p>Nome do Psicólogo</p>
                    </div>
                </div>
                <nav>
                    <a href="/">Início</a> 
                </nav>
            </header>
            <section className="acesso-rapido">
                <h2>Acesso Rápido</h2>
                <div className="icones">
                    <div className="botao" onClick={handleAddPaciente}>
                        <div className="icone">
                            <img src={addperson} alt="Adicionar Paciente" />
                            <p>Adicionar Paciente</p>
                        </div>
                    </div>
                    <div className="botao" onClick={handleRegistros}>
                        <div className="icone">
                            <img src={pacientsregistry} alt="Registros dos Pacientes" />
                            <p>Registros dos Pacientes</p>
                        </div>
                    </div>
                    <div className="botao" onClick={handleVerPacientes}>
                        <div className="icone">
                            <img src={patients} alt="Ver Pacientes" />
                            <p>Ver Pacientes</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="registros-diario">
                <h2>Adicionar Pacientes</h2>
                <div className="registro">
                    <p>Adicione pacientes para ter melhores resultados em suas consultas!</p>
                    <button onClick={handleAddPaciente}>Adicionar</button>
                </div>
            </section>
            <section className="respiracao-guiada">
                <h2>Registro dos Pacientes</h2>
                <div className="respiracao">
                    <p>Veja como seu paciente anda se sentindo durante a semana</p>
                    <button onClick={handleRegistros}>Veja</button>
                </div>
            </section>
        </div>
    );
}

export default PrincipalPsico;
