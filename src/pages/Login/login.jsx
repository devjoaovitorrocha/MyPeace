import Cabecalho from "../../components/cabecalho/Cabecalho"
import Rodape from "../../components/rodape/rodape"
import fotocadastro from '../../assets/fotocadastro.png'
import emailIcon from '../../assets/email_icon.png'
import passwordIcon from '../../assets/password_icon.png'


export default function Login() {
    return (
        <>
            <Cabecalho />
            <div className="login-container">
                <img src={fotocadastro} alt="" className="user" />
                <form action="#" method="post" >
                    <div className="input-group">
                        <img src={emailIcon} alt="Email Icon" />
                        <input type="email" name="email" placeholder="Email" required />
                    </div>


                    <div class="input-group">
                        <img src={passwordIcon} alt="Password Icon" />
                        <input type="password" name="password" placeholder="*****" required />
                    </div>

                    <nav className="forgot"><a href="/login"><p>Forgot password?</p></a></nav>
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
            <Rodape />
        </>
    )
}