
import React from 'react';
import './RegistroEmocoes.css';
import Cabecalho from "../../components/header/cabecalho";
import Rodape from '../../components/base/rodape';
function RegistroEmocoes() {
  return (
    <>
    <Cabecalho/>
    <div>
      <div id="registro">
        <p id="textReg">Registro de Emoções</p>
      </div>
      <div id="Paciente">
        <p id="textPac">Nome Paciente</p>
      </div>
      <div id="table">
        <table>
          <tr id="tableinf">
            <th>Data</th>
            <th>Emoção</th>
            <th>Registros</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>0000-00-00</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
    <Rodape/>
    </>
  );
}

export default RegistroEmocoes;