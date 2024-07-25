import { useEffect, useState } from "react";
import './CadastroCliente.css'
import Logo from '../../assets/logo.png';
import { http } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const CadastroPaciente = () => {
    const {state} = useLocation();
    const [token, setToken] = useState()
    const [id, setId] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        if(!state?.token || !state?.id){
            navigate("/Login")
        }else{
            setToken(state.token)
            setId(state.id)
        }
    }, [setToken, setId, navigate, state])

    const [mensagem, setMensagem] = useState('');
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 

    function cadastrar(event) { 
        event.preventDefault();

       
        http.post(`/register/pacient/${id}`, { 
            name, 
            email, 
            idPsychologist: id 
            } , { 
            headers: { 
                'Authorization': `Bearer ${token}`
            }})
            .then(resp => { 
                alert(resp.data.password)
                navigate("/principalPsico", {state: {token, id}}) // aqui o psicologo vai ter concluido o cadastro do paciente e vai ser redirecionado para a pagina de pacientes que o psicologo possui

            }).catch(error => { 
                if (error.response) {
                    if(error.request.status === 401){
                        alert("Sessão expirada")
                        navigate("/Login") 
                    }else{
                        setMensagem(error.response.data.msg);
                    }
                } else {
                    setMensagem('Erro ao cadastrar paciente. Por favor, tente novamente mais tarde.');
                }
            });
    }

  
    return (
      <>
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
              <form className="signup-form" onSubmit={cadastrar}>
                <h2>Cadastre-se como Paciente!</h2>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  onChange={e => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Cadastrar</button>
                {mensagem && <p>{mensagem}</p>}
              </form>
            </div>
          </div>
        </div>
      </>
  );
};

export default CadastroPaciente;