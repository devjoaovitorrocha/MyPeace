import { useEffect, useState } from "react";
import "./lista.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Deletar from "../../assets/excluir.png";
import Editar from "../../assets/editar.png";
import { Eye, EyeOff, XCircle } from "lucide-react";

export default function ListaP() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [pacientes, setPacientes] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState("");
    const [modalDel, setModalDel] = useState(false);
    const [modalEdt, setModalEdt] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [currentPaciente, setCurrentPaciente] = useState(null);
    const [eye, setEye] = useState(false);

    useEffect(() => {
        if (!state?.token || !state?.id) {
            navigate("/login");
        } else {
            setToken(state.token);
            setId(state.id);
            fetchPacientes(state.token, state.id);

            // Abre o modal de adição automaticamente se o estado `openModal` for verdadeiro
            if (state?.openModal) {
                setModalAdd(true);
            }
        }
    }, [navigate, state]);

    async function fetchPacientes(token, idUser) {
        try {
            const response = await axios.get(`https://api-mypeace.vercel.app/getAll/pacients/${idUser}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPacientes(response.data.allPacients);
        } catch (error) {
            setMensagem('Erro ao buscar pacientes. Por favor, tente novamente mais tarde.');
        }
    }

    async function cadastrar(event) {
        event.preventDefault();
        try {
            const response = await axios.post(`https://api-mypeace.vercel.app/register/pacient/${id}`, { 
                name, 
                email, 
                idPsychologist: id 
            }, { 
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            });
            setMensagem(`Senha do usuário: ${response.data.password}` || "Paciente cadastrado com sucesso!");
            setModalAdd(false);
            alert(mensagem);
            fetchPacientes(token, id);
        } catch (error) {
            handleErrorResponse(error);
        }
    }

    async function editar(event) {
        event.preventDefault();
        if (!currentPaciente) return;
    
        try {
            const response = await axios.post(`https://api-mypeace.vercel.app/update/pacients/${currentPaciente._id}`, 
            { 
                name, 
                email,
                idPsychologist: id 
            });
            setMensagem(response.data.msg || "Paciente editado com sucesso!");
            setModalEdt(false);
            fetchPacientes(token, id);
        } catch (error) {
            handleErrorResponse(error);
        }
    }
    
    async function deletar() {
        if (!currentPaciente) return;

        try {
            const response = await axios.post(`https://api-mypeace.vercel.app/delete/pacients/${currentPaciente._id}`, {
                headers: { 
                    'Autorizado': `Bearer ${token}`
                }
            });
            setMensagem(response.data.msg || "Paciente deletado com sucesso!");
            setModalDel(false);
            fetchPacientes(token, id);
        } catch (error) {
            handleErrorResponse(error);
        }
    }

    function handleErrorResponse(error) {
        if (error.response) {
            if (error.response.status === 401) {
                alert("Sessão expirada");
                navigate("/login");
            } else {
                setMensagem(error.response.data.msg || "Erro ao processar a solicitação. Por favor, tente novamente mais tarde.");
            }
        } else {
            setMensagem('Erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
        }
    }

    function openEditModal(paciente) {
        setCurrentPaciente(paciente);
        setName(paciente.name);
        setEmail(paciente.email);
        setModalEdt(true);
    }

    function openDeleteModal(paciente) {
        setCurrentPaciente(paciente);
        setModalDel(true);
    }

    return (
        <>
            {modalDel && (
                <div className="modal">
                    <div className="modal-content">
                        <header>
                            <h1>Excluir Conta</h1>
                            <XCircle className="xIcon" onClick={() => setModalDel(false)} />
                        </header>
                        <p>
                            Você tem certeza que deseja deletar esta conta? Esta ação não pode
                            ser desfeita.
                        </p>
                        <div className="delBtns">
                            <button className="delBtn" onClick={deletar}>
                                Deletar
                            </button>
                            <button
                                className="delCancelBtn"
                                onClick={() => setModalDel(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalEdt && (
                <div className="modal">
                    <div className="modal-content">
                        <header>
                            <h1>Editar Dados</h1>
                            <XCircle className="xIcon" onClick={() => setModalEdt(false)} />
                        </header>
                        <form className="edtDadosForm" onSubmit={editar}>
                            <input
                                placeholder="Nome:"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                required
                            />
                            <input
                                placeholder="Email:"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                            />
                            <div className="input-password-eye">
                                {!eye ? (
                                    <Eye onClick={() => setEye(true)} className="eyeIcon" />
                                ) : (
                                    <EyeOff onClick={() => setEye(false)} className="eyeIcon" />
                                )}
                                <input
                                    placeholder="Senha:"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    type={!eye ? "password" : "text"}
                                    required
                                />
                            </div>
                            <button>Salvar</button>
                        </form>
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
                                <img onClick={() => openDeleteModal(paciente)} src={Deletar} alt="Excluir" />
                                <img onClick={() => openEditModal(paciente)} src={Editar} alt="Editar" />
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
