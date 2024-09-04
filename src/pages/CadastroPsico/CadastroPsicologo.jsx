import './CadastroPsicologo.css';
import Logo from '../../assets/logo.png';
import { useState } from "react";
import { http } from "../../App";

const CadastroPsicologo = () => {
  const [mensagem, setMensagem] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [registroNumero, setRegistroNumero] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isEmailVerificationVisible, setEmailVerificationVisible] = useState(false);
  const [codigo, setCodigo] = useState('');

  const cadastrar = (event) => {
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
      setEmailVerificationVisible(true);
    })
    .catch(error => {
      if (error.response) {
        setMensagem(error.response.data.msg);
      } else {
        setMensagem('Erro ao cadastrar psicólogo. Por favor, tente novamente mais tarde.');
      }
    });
  };

  const handleEmailVerification = (e) => {
    e.preventDefault();
    console.log('Verificação de e-mail enviada');
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="header">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <span>MyPeace</span>
          </div>
          <h1 className="back-button"><a href="/">Voltar</a></h1>
        </div>
        <form className="signup-form" onSubmit={cadastrar}>
          <h2>Realize Seu Cadastro!</h2>
          <input type="text" name="nome" placeholder="Nome Completo" value={nome} onChange={e => setNome(e.target.value)} required />
          <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="text" name="cpf" placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} required />
          <input type="text" name="registerNumber" placeholder="CRP" value={registroNumero} onChange={e => setRegistroNumero(e.target.value)} required />
          <input type="password" name="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
          <input type="password" name="confirmPassword" placeholder="Confirmação de senha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} required />
          <button type="submit">Cadastrar</button>
          {mensagem && <p className="mensagem">{mensagem}</p>}
        </form>
      </div>
      
      {isEmailVerificationVisible && (
        <div className="modal">
          <div className="modal-content">
            <div className="header">
              <div className="logo">
                <img src={Logo} alt="logo" />
                <span>MyPeace</span>
              </div>
            </div>
            <h2>Confirmação de Email!</h2>
            <p>Esta ação requer um email de verificação. Por favor, verifique sua caixa de entrada e a caixa de Spam e siga as instruções.</p>
            <p>E-mail cadastrado: {email}</p>
            <input type="text" name="codigo" placeholder="Inserir Código" value={codigo} onChange={e => setCodigo(e.target.value)} required />
            <div onClick={handleEmailVerification}>Verificar</div>
            <div className="back-button" onClick={() => setEmailVerificationVisible(false)}>Voltar</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CadastroPsicologo;
