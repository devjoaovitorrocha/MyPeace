import { useEffect, useState } from 'react';
import './Login.css';
import Logo from '../../assets/logo.png';
import { http } from "../../App";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [eye, setEye] = useState(false);
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
            if (type === 'pacient') {
                navigate("/principalCliente", { state: { token, id } });
                console.log(type)
            } else if (type === 'psychologist') {
                navigate("/principalPsico", { state: { token, id } });
                console.log(type)
            }
            console.log(type)
        } catch (e) {
            setMensagem(e.response.data.msg);
            console.log(e)
        }
    };

    return (
        <div className="container11">
            <div className="form-half">
                <div className="form-container">
                <div className="header">
                    <div className="logo">
                        <img src={Logo} alt="logo" />
                        <span>MyPeace</span>
                    </div>
                    <h1 className="back-button"><a href="/">Voltar</a></h1>
                </div>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <h2>Faça seu Login!</h2>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <div className="input-password-eye">
                                {!eye ? (
                                    <Eye onClick={() => setEye(true)} className="eyeIcon" />
                                ) : (
                                    <EyeOff onClick={() => setEye(false)} className="eyeIcon" />
                                )}
                                <input
                                    placeholder="Senha:"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={!eye ? "password" : "text"}
                                    required
                                />
                            </div>
                        <button type="submit">Entrar</button>
                        {mensagem && <p>{mensagem}</p>}
                    </form>
                </div>
            </div> 
        </div>
    );
};

export default Login;
