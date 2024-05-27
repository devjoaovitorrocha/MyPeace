import { useEffect, useState } from 'react';
import Cabecalho from "../../components/cabecalho/Cabecalho";
import Rodape from "../../components/rodape/rodape";
import fotocadastro from '../../assets/fotocadastro.png';
import emailIcon from '../../assets/email_icon.png';
import passwordIcon from '../../assets/password_icon.png';
import { http } from "../../App";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        if (type === 'pacient') {
            navigate("/pacienteHome", { state: { token, id } })
        } else if (type === 'psychologist') {
            navigate("/cadastroPaciente", { state: { token, id } });
        } 
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            await http.post('/auth/login', {
                email: email,
                password: password
            }).then(response => {
                setId(response.data.id)
                setToken(response.data.token)
                setType(response.data.type)
            })
        
        } catch (error) {
            setMensagem(error.response.data.msg);
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
                    <button type="submit" className="btn" onClick={handleSubmit}>Login</button>
                    {mensagem && <p>{mensagem}</p>}
                </form>
            </div>
            <Rodape />
        </>
    );
}
