import React from 'react';
import './sobre.css';
import MAIRA from "../../assets/maira.jpg";
import REBECA from "../../assets/rebeca.jpg";
import JOAO from "../../assets/joao.jpg";
import PAULO from "../../assets/paulo.jpeg";
import MATHEUS from "../../assets/matheus.jpg";
import DANIEL from "../../assets/daniel.jpg";
import Cabecalho from '../../components/header/cabecalho';
import Rodape from '../../components/base/rodape';

export default function Sobre() {
  return (
    <>
      <Cabecalho/>
      <div className="sobre-container">
        <h1 className="titulo">Sobre Nós</h1>
        <p className="descricao">
          Bem-vindo ao MyPeace! Somos uma equipe dedicada a fornecer os melhores serviços para nossos clientes. Nosso objetivo é garantir que todos recebam o cuidado e a atenção que merecem.
        </p>
        <p className="descricao">
          Nossa plataforma permite que pacientes se conectem com profissionais de saúde de maneira segura e confiável para falar sobre o seu dia a dia.
        </p>
        <p className="descricao">
          Nosso aplicativo tem como benefício ajudar o desempenho dos psicólogos nas consultas, com o objetivo de um melhor resultado no fim do tratamento.
        </p>
      </div>

      <div className="quemsomos-container">
      <h1 className="titulo">Quem Somos</h1>
        <div className="conteudo-quemsomos invertido">
          <img src={DANIEL} alt="Daniel" />
          <div className="texto">
            <h1>Daniel</h1>
            <p>Desenvolvedor Front-end, estudante de mobile no Colégio Cotemig</p>
          </div>
        </div>
        <div className="conteudo-quemsomos">
          <img src={REBECA} alt="Rebeca" />
          <div className="texto">
            <h1>Rebeca</h1>
            <p>Líder e Designer, estudante de mobile no Colégio Cotemig</p>
          </div>
        </div>
        <div className="conteudo-quemsomos invertido">
          <img src={PAULO} alt="Paulo" />
          <div className="texto">
            <h1>Paulo</h1>
            <p>Desenvolvedor Front-end, estudante de mobile no Colégio Cotemig</p>
          </div>
        </div>
        <div className="conteudo-quemsomos">
          <img src={JOAO} alt="João Vitor" />
          <div className="texto">
            <h1>João Vitor</h1>
            <p>Desenvolvedor Back-end e DBA, estudante de mobile no Colégio Cotemig</p>
          </div>
        </div>
        <div className="conteudo-quemsomos invertido">
          <img src={MAIRA} alt="Maíra" />
          <div className="texto">
            <h1>Maíra</h1>
            <p>Desenvolvedora Front-end e Designer, estudante de mobile no Colégio Cotemig</p>
          </div>
        </div>
        <div className="conteudo-quemsomos">
          <img src={MATHEUS} alt="Matheus" />
          <div className="texto">
            <h1>Matheus</h1>
            <p>Desenvolvedor Front-end, estudante de mobile no Colégio Cotemig</p>
          </div>
        </div>
      </div>
      <Rodape/>
    </>
  );
}
