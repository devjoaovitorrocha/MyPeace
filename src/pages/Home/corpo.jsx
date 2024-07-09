import "./corpo.css";

import Principal from "../../assets/jovensprinc.png";
import Pessoas from "../../assets/pspessoas.png";
import Ajuda from "../../assets/ajudaps.png";
import Relogio from "../../assets/cronometro.png";
import Emocao from "../../assets/emocao.png";
import Chat from "../../assets/chat.png";
import Ok from "../../assets/ok.png";
import Cabecalho from "../../components/header/cabecalho";
import Rodape from "../../components/base/rodape";

export default function Corpo() {
  return (
    <>
      <Cabecalho/>
      <div className="topohome">
        <img src={Principal} alt="" />
        <div className="verde">MY PEACE</div>

        <div className="form">
          <form>
            <h4>Fale Conosco!</h4>
            <div className="inputs">
              <input type="text" name="name" placeholder="Nome Completo" />
              <input type="number" name="name" placeholder="(__) _____-____" />
              <button>Enviar</button>
            </div>
          </form>
        </div>
      </div>
      <div className="divverde">
        <h1 className="aaa">
          Descubra quais ferramentas o MyPeace disponibiliza!
        </h1>
      </div>
      <section className="ferramentas">
          <div className="caixas">
            <img src={Chat} alt="" />
            <h6>Interação entre psicologo e paciente </h6>
          </div>
          <div className="caixas">
            <img src={Emocao} alt="" />
            <h6>Diário de emoções</h6>
          </div>
          <div className="caixas">
            <img src={Relogio} alt="" />
            <h6>Respiração Guiada</h6>
          </div>
        </section>
      <div className="direita">
        <div className="txtdireita">
          <h1>Benefícios da terapia</h1>
          <h2>
            Fazer terapia traz inumeros beneficios. Sendo um <br />
            espaço segura para demostração de emoções e<br />
            o desenvolvimento de hablidades de enfretamento.
            <br />A terapia vem promovendo diversos bens como:
          </h2>

          <div className="maira">
            <img src={Ok} />
            <h3>Relacionamento saudáveis</h3>
          </div>

          <div className="maira">
            <img src={Ok} />
            <h3>Autoconhecimento</h3>
          </div>

          <div className="maira">
            <img src={Ok} />
            <h3>Crescimento pessoal</h3>
          </div>
        </div>

        <img src={Ajuda} />
      </div>

      <div className="esquerda">
        <img src={Pessoas} />
        <div>
          <h1>Mudando vidas</h1>
          <h2>
            A psicologia oferece orientação e suporte, ajudando a enxergar{" "}
            <br />
            novas perspectivas e possibilidades de enfrentar seus problemas.
            Buscando
            <br />
            sempre uma maneira clara e objetiva de enfrentar os desafios.
            <br />
            levando o paciente a enxergar a vida com outra pespectiva.
          </h2>
        </div>
      </div>

      <div className="verde2">
        <div className="mairaverde">
          <h1 className="divverde2h1">
            Chegou a sua vez como Psicologo!
            <br />
            Adquira seu plano e obtenha <br />
            melhores resultados em suas <br />
            consultas!
          </h1>
          <button className="btnconferir">Conferir</button>
        </div>
      </div>
      <Rodape/>
    </>
  );
}
