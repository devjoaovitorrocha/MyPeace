import { useState } from 'react';
import Cabecalho from "../../components/cabecalho/Cabecalho";
import Rodape from "../../components/rodape/rodape";
import fotocadastro from '../../assets/fotocadastro.png';
import emailIcon from '../../assets/email_icon.png';
import passwordIcon from '../../assets/password_icon.png';
import { http } from "../../App";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await http.post('/auth/login', {
                email: email,
                password: password
            });
            
            const data = response.data;
            const { token, id, type: userType } = data;

            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
    
            if (userType === 'pacient') {
                window.location.href = '/pacienteHome';
            } else if (userType === 'psychologist') {
                window.location.href = '/'; // coloquei voltando para a pagina inicial pq nao tem essa pagina - p
            } 
        } catch (error) {
            console.error('Erro no Login', error); 
            setMensagem('Falha ao fazer login. Por favor, tente novamente.');
        }
    } 

    return (
        <>
            <Cabecalho />
            <div className="login-container">
                <img src={fotocadastro} alt="" className="user" />
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <img src={emailIcon} alt="Email Icon" />
                        <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <img src={passwordIcon} alt="Password Icon" />
                        <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <nav className="forgot"><a href="/login"><p>Forgot password?</p></a></nav>
                    <button type="submit" className="btn">Login</button>
                    {mensagem && <p>{mensagem}</p>}
                </form>
            </div>
            <Rodape />
        </>
    );
}
