import "./rodape.css";
import Logo from "../../assets/logo.png";
import Insta from "../../assets/insta.png";
import Face from "../../assets/face.png";
import {useNavigate } from "react-router-dom";


export default function Rodape() {

  const navigate = useNavigate();

  return (
    <footer>
      <div className="esquerda">
        <img src={Logo} width={100}></img>
        <h1>MyPeace</h1>
      </div>
      <div className="meio">
            <h4>Contato</h4>
            <div className="contatos">
            <h5>Email:<br />MyPeace@contato.com.br</h5>
            <h5>Celular:<br />
            (31) 9 8383-6232</h5>
            
            </div>
            <h5></h5>
        </div>
      <div className="direita">
        <h4>Redes Sociais</h4>
        <img src={Insta} alt="" />
        <img src={Face} alt="" />
        <h5 onClick={() => navigate('/sobre')}> <a href="">Quem Somos</a></h5>
      </div>
      <div className="baixo">
        <h4>Copyright © 2024 - Todos os direitos reservados - Site desenvolvido por MyPeace</h4>
      </div>
    </footer>
  );
}
