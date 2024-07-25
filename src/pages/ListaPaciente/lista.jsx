import "./lista.css";
import Deletar from "../../assets/excluir.png";
import Editar from "../../assets/editar.png";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ListaP() {
    const [modalDel, setModalDel] = useState(false);
    const [modalEdt, setModalEdt] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);

    const { state } = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [id, setId] = useState('');

    const [pacientes, setPacientes] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!state?.token || !state?.id) {
            navigate("/login");
        } else {
            setToken(state.token);
            setId(state.id);
            fetchPacientes(state.token, state.id);
        }
    }, [navigate, state]);

    async function fetchPacientes(token, idUser) {
        try {
            console.log(`Fetching pacientes with token: ${token} and idUser: ${idUser}`);
            const response = await axios.get(`https://api-mypeace.vercel.app/getAll/pacients/${idUser}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("Pacientes fetched successfully:", response.data.allPacients);
            setPacientes(response.data.allPacients);
        } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
            setMensagem('Erro ao buscar pacientes. Por favor, tente novamente mais tarde.');
        }
    }

    async function cadastrar(event) {
        event.preventDefault();
        try {
            console.log(`Cadastrando paciente com nome: ${name} e email: ${email}`);
            const response = await axios.post(`https://api-mypeace.vercel.app/register/pacient/${id}`, { 
                name, 
                email, 
                idPsychologist: id 
            }, { 
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Paciente cadastrado com sucesso!", response.data);
            setModalAdd(false);
            fetchPacientes(token, id); // Atualizar a lista de pacientes
        } catch (error) {
            if (error.response) {
                if(error.response.status === 401){
                    alert("Sessão expirada");
                    navigate("/login");
                } else {
                    setMensagem(error.response.data.msg);
                }
            } else {
                setMensagem('Erro ao cadastrar paciente. Por favor, tente novamente mais tarde.');
            }
            console.error("Erro ao cadastrar paciente:", error);
        }
    }

    return (
        <>
            {modalDel && (
                <div className="telaverdecontainer">
                    <div className="modal1">
                        <h1>Excluir Conta</h1>
                        <h1>Ao excluir a conta seu paciente será deslogado do MyPeace e a conta será deletada permanentemente</h1>
                        <h1>Deletar conta permanentemente?</h1>
                        <button>Deletar</button>
                        <button onClick={() => setModalDel(false)}>Sair</button>
                    </div>
                </div>
            )}

            {modalEdt && (
                <div className="telaverdecontainer">
                    <div className="modal1">
                        <h1>Editar Conta</h1>
                        <h1>Nome:</h1>
                        <h1>Email:</h1>
                        <button>Confirmar</button>
                        <button onClick={() => setModalEdt(false)}>Sair</button>
                    </div>
                </div>
            )}

            {modalAdd && (
                <div className="telaverdecontainer">
                    <form onSubmit={cadastrar}>
                        <div className="modal1">
                            <h1>Adicionar Paciente</h1>
                            <input 
                                type="text" 
                                id="nome" 
                                name="nome" 
                                placeholder="Nome" 
                                required
                                onChange={e => setName(e.target.value)} 
                            />
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Email" 
                                required 
                                onChange={e => setEmail(e.target.value)} 
                            />
                            <button type="submit">Adicionar</button>
                            <button type="button" onClick={() => setModalAdd(false)}>Sair</button>
                        </div>
                        <p>{mensagem}</p>
                    </form>
                </div>
            )}
            <div className="divverde2">
                <h1>Lista de Pacientes</h1>
            </div>
            <div className='adicionaeedata'>
                <h1>{new Date().toLocaleDateString()}</h1>
                <h1 onClick={() => setModalAdd(true)}>Adicionar Paciente</h1>
            </div>
            <div className="titulos">
                <h1>n°</h1>
                <h1>Nome</h1>
                <h1>E-mail</h1>
                <h1>Diário</h1>
                <h1>Perfil</h1>
            </div>
            <div className="conteudo32">
                {pacientes.length > 0 ? (
                    pacientes.map((paciente, index) => (
                        <div className="cadastros" key={paciente._id}>
                            <div className="dados1">{index + 1}</div>
                            <div className="dados2">{paciente.name}</div>
                            <div className="dados3">{paciente.email}</div>
                            <button className="verificarbtn">Verificar</button>
                            <div className="imgs">
                                <img onClick={() => setModalDel(true)} src={Deletar} alt="Excluir" />
                                <img onClick={() => setModalEdt(true)} src={Editar} alt="Editar" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="cadastros">
                        <div className="dados1">-</div>
                        <div className="dados2">Nenhum paciente encontrado</div>
                        <div className="dados3">-</div>
                        <div className="dados4">-</div>
                    </div>
                )}
            </div>
        </>
    );
}
