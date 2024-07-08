import { useEffect, useState } from 'react';
import './Login.css';
import Logo from '../../assets/logo.png';
import { http } from "../../App";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (type === 'pacient') {
            navigate("/principalCliente", { state: { token, id } });
        } else if (type === 'psychologist') {
            navigate("/principalPsico", { state: { token, id } });
        }
    }, [type, token, id, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await http.post('/auth/login', {
                email: email,
                password: password
            });
            setId(response.data.id);
            setToken(response.data.token);
            setType(response.data.type);
        } catch (error) {
            setMensagem(error.response.data.msg);
        }
    };

    return (
        <div className="container">
            <div className="form-half">
                <div className="form-container">
                    <div className="header">
                        <div className="logo">
                            <img src={Logo} alt="logo" />
                            <span>MyPeace</span>
                        </div>
                        <h1 className="back-button"><a href="/">Voltar</a></h1>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Faça seu Login!</h2>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <input type="password" name="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
                        <button type="submit">Entrar</button>
                        {mensagem && <p>{mensagem}</p>}
                    </form>
                </div>
            </div> 
        </div>
    );
};

export default Login;
