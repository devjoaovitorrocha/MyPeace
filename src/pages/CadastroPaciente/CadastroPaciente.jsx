import { useEffect, useState } from "react";
import Cabecalho from "../../components/cabecalho/Cabecalho"
import Rodape from "../../components/rodape/rodape"
import { http } from "../../App";
import fotocadastro from '../../assets/fotocadastro.png'
import emailIcon from '../../assets/email_icon.png'
import passwordIcon from '../../assets/password_icon.png'
import './CadastroPaciente.css'
import { useLocation, useNavigate } from "react-router-dom";


export default function CadastroPaciente(){
    const {state} = useLocation();
    const [token, setToken] = useState()
    const [id, setId] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        if(!state?.token || !state?.id){
            navigate("/login")
        }else{
            setToken(state.token)
            setId(state.id)
        }
    }, [setToken, setId, navigate, state])

    const [mensagem, setMensagem] = useState(''); //variavel para a mensagem de erro
    const [name, setName] = useState(''); //variavel para o nome
    const [email, setEmail] = useState(''); //variavel para o email

    function cadastrar(event) { //essa função vai ser executada no momento em que o usuario clicar em cadastrar
        event.preventDefault();

        //Aqui vai fazer o post utilizando o HTTP que foi criado na pagina App com a url da nossa api
        http.post(`/register/pacient/${id}`, { // register/pacient é a rota e esse id é aquele que pegamos no login...
            name, //Aqui esta passando o valor da nossa variavel name no body do post
            email, //Aqui esta passando o valor da nossa variavel email no body do post
            idPsychologist: id //Aqui esta passando o valor do id no body do post 
            } , { 
            headers: { //Aqui esta passando o header de autorização com o token que pegamos no login
                'Authorization': `Bearer ${token}` // esse token vai ser pego na hora de fazer o login como psicologo...
            }})
            .then(resp => { 
                alert(resp.data.password)
                navigate("/pacientes", {state: {token, id}}) // aqui o psicologo vai ter concluido o cadastro do paciente e vai ser redirecionado para a pagina de pacientes que o psicologo possui

            }).catch(error => { //Aqui vai ter dado algum erro, seja ele de servidor, banco de dados, ou alguma informação incorreta dada pelo usuario
                if (error.response) {
                    if(error.request.status === 401){
                        alert("Sessão expirada")
                        navigate("/login")
                    }else{
                        setMensagem(error.response.data.msg);
                    }
                } else {
                    setMensagem('Erro ao cadastrar paciente. Por favor, tente novamente mais tarde.');
                }
            });
    }


    return(
        <>
            <Cabecalho/>
            
            <div className="login-container">
                <img src={fotocadastro} alt="Cadastro" className="user" />

                <form action="#" method="post" onSubmit={cadastrar}>
                <div className="input-group">
                    <img src={emailIcon} alt="Email Icon" />
                    <input type="text" id="nome" name="nome" placeholder="Nome" required
                    onChange={e => setName(e.target.value)} 
                    />
                </div>

                <div className="input-group">
                    <img src={passwordIcon} alt="Email Icon" />
                    <input type="text" id="email" name="email" placeholder="Email" required 
                    onChange={e => setEmail(e.target.value)} 
                    />
                </div>

                <button type="submit" className='btn'>Cadastrar Paciente</button>
                <p>{mensagem}</p>
                </form>
            </div>

            <Rodape/>
        </>
    )
}