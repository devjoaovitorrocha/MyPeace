import Cabecalho from "../../components/cabecalho/Cabecalho"
import './CadastroPsicologo.css'
import Rodape from "../../components/rodape/rodape"
import fotocadastro from '../../assets/fotocadastro.png'
import emailIcon from '../../assets/email_icon.png'
import passwordIcon from '../../assets/password_icon.png'
import { useState } from "react";
import { http } from "../../App";

export default function CadastroPsicologo() {
    const [mensagem, setMensagem] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [registroNumero, setRegistroNumero] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    
    function cadastrar(event) {
        event.preventDefault();

        http.post(`/register/psychologist`, {
            name: nome,
            email: email,
            cpf: cpf,
            registerNumber: registroNumero,
            password: senha,
            confirmPassword: confirmarSenha
        })
        .then(resp => {
            window.location.href = '/Login';
        })
        .catch(error => {
            if (error.response) {
                setMensagem(error.response.data.msg);
            } else {
                setMensagem('Erro ao cadastrar psicólogo. Por favor, tente novamente mais tarde.');
            }
        });
    }
    return (
        <>
            <Cabecalho />
            <div className="login-container">
                <img src={fotocadastro} alt="" className="user" />
                <form onSubmit={cadastrar}>
                    <div className="input-group">
                        <img src={emailIcon} alt="Email Icon" />
                        <input type="text" name="nome" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <img src={emailIcon} alt="Email Icon" />
                        <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <img src={emailIcon} alt="Email Icon" />
                        <input type="text" name="cpf" placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <img src={passwordIcon} alt="Password Icon" />
                        <input type="text" name="registerNumber" placeholder="Número de Registro" value={registroNumero} onChange={e => setRegistroNumero(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <img src={passwordIcon} alt="Password Icon" />
                        <input type="password" name="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <img src={passwordIcon} alt="Password Icon" />
                        <input type="password" name="confirmPassword" placeholder="Confirmar Senha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn">Cadastrar</button>
                    {mensagem && <p>{mensagem}</p>}
                </form>
            </div>
            <Rodape />
        </>
    );
}
