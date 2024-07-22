import "./addpaci.css";
import Deletar from "../../assets/excluir.png";
import Editar from "../../assets/editar.png";
import { useState } from "react";

export default function AddP() {
  const [modal, setModal] = useState(false);

  const handleEdit = () => {
    
    setModal(false);
    alert('Paciente Adicionado com sucesso!');
  };

  return (
    <>
      {modal ? 
        <div className="telaverde-container">
          <div className="modal">
            <h1>Adicionar Paciente</h1>
            <input type="text" name="name" placeholder="Nome Completo do Paciente" />
            <input type="text" name="name" placeholder="Email do Paciente" />
            <button onClick={handleEdit}>Adicionar</button>
            <button onClick={() => setModal(false)}>Sair</button>
            
          </div>
        </div>
      : null}

      <div className="divverde2">
        <h1>Lista de Pacientes</h1>
      </div>

      <div className="adicionaeedata">
        <h1>00/00/0000</h1>
        <h1  onClick={() => setModal(true)}>Adicionar Paciente</h1>
      </div>

      <div className="titulos">
        <h1>n°</h1>
        <h1>nome</h1>
        <h1>Email</h1>
        <h1>Diario</h1>
        <h1>Perfil</h1>
      </div>

      <div className="conteudo">
        <div className="cadastros">
          <div className="dados1">5</div>
          <div className="dados2">maira da costa</div>
          <div className="dados3">costamaira195@gmail.com</div>
          <button className="verificarbtn dados4">
            Verificar
          </button>
        </div>

        <div className="imgs">
          <img src={Deletar} alt="Deletar" />
          <img src={Editar} alt="Editar"/>
        </div>
      </div>
    </>
  );
}
