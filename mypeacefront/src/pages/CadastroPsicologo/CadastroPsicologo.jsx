import Cabecalho from "../../components/cabecalho/Cabecalho"
import './CadastroPsicologo.css'
import Rodape from "../../components/rodape/rodape"
import fotocadastro from '../../assets/fotocadastro.png'
import emailIcon from '../../assets/email_icon.png'
import passwordIcon from '../../assets/password_icon.png'


export default function CadastroPsicologo() {
    return (
        <>
            <Cabecalho />
            <div className="login-container">
                <img src={fotocadastro} alt="" className="user" />
                <form action="#" method="post">
                    <div className="input-group">
                        <img src={emailIcon} alt="Email Icon" />
                        <input type="text" name="email" placeholder="Nome" required />
                    </div>
                    <div className="input-group">
                        <img src={emailIcon} alt="Email Icon" />
                        <input type="text" name="email" placeholder="Email" required />
                    </div>

                    <div className="input-group">
                        <img src={emailIcon} alt="Email Icon" />
                        <input type="text" name="cpf" placeholder="CPF" required />
                    </div>

                    <div className="input-group">
                        <img src={passwordIcon} alt="Password Icon" />
                        <input type="password" name="password" placeholder="Numero de Registro" required />
                    </div>
                    <div className="input-group">
                        <img src={passwordIcon} alt="Password Icon" />
                        <input type="password" name="password" placeholder="Password" required />

                    </div>

                    <div className="input-group">
                        <img src={passwordIcon} alt="Password Icon" />
                        <input type="password" name="password" placeholder="Confirmar Senha" required />

                    </div>



                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
            <Rodape />
        </>
    )
}