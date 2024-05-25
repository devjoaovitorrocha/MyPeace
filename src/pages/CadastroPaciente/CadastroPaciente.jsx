import { useState } from "react";
import Cabecalho from "../../components/cabecalho/Cabecalho"
import Rodape from "../../components/rodape/rodape"
import { http } from "../../App";
import fotocadastro from '../../assets/fotocadastro.png'
import emailIcon from '../../assets/email_icon.png'
import passwordIcon from '../../assets/password_icon.png'
import './CadastroPaciente.css'


export default function CadastroPaciente(){
    const id = '6645f0d42fa9009d5420a5db' // esse id vai ser pego na hora de fazer o login como psicologo...
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ1ZjBkNDJmYTkwMDlkNTQyMGE1ZGIiLCJuYW1lIjoiSm9hbyBWaXRvciIsImNwZiI6NzA1MTU5OTQ2MTgsInJlZ2lzdGVyTnVtYmVyIjozNDk4NTkzNCwiZW1haWwiOiJqb2Fvdml0b3Jjb21lcmNpYWwwNkBnbWFpbC5jb20iLCJpYXQiOjE3MTY1OTEzNjksImV4cCI6MTcxNjU5NDk2OX0.a6Xi8AdlgloA19EnQ8bzuwgpJWV-49GeS9C124f3fgM'
    //esse token também vai ser pego na hora de fazer login
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

                window.location.href ='/' // aqui o psicologo vai ter concluido o cadastro do paciente e vai ser redirecionado para a pagina de pacientes que o psicologo possui

            }).catch(error => { //Aqui vai ter dado algum erro, seja ele de servidor, banco de dados, ou alguma informação incorreta dada pelo usuario
                if (error.response) { 
                    setMensagem(error.response.data.msg); //Aqui está colocando a mensagem do erro na nossa variavel mensagem para que possa ser mostrada pro usuario
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