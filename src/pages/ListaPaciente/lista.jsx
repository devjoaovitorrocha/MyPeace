import Deletar from "../../assets/excluir.png";
import styles from "./lista.module.css";
import Editar from "../../assets/editar.png";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const App = () => {
    const [modalDel, setModalDel] = useState(false);
    const [modalEdt, setModalEdt] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [nome, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (!state?.token || !state?.id) {
            navigate("/login");
        } else {
            setToken(state.token);
            setId(state.id);
            fetchPacientes(state.token, state.id);
        }
    }, [navigate, state]);

    function fetchPacientes(token, idUser) {
        console.log(`Fetching pacientes with token: ${token} and idUser: ${idUser}`);
        axios.get(`https://api-mypeace.vercel.app/getAll/pacients/${idUser}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            console.log("Pacientes fetched successfully:", response.data);
            setPacientes(response.data);
        })
        .catch(error => {
            console.error("Erro ao buscar pacientes:", error);
        });
    }

    function cadastrar(event) {
        event.preventDefault();
        console.log(`Cadastrando paciente com nome: ${nome} e email: ${email}`);
        axios.post(`https://api-mypeace.vercel.app/register/pacient/${id}`, { 
            name: nome, 
            email, 
            idPsychologist: id 
        }, { 
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("Paciente cadastrado com sucesso!", response.data);
            setModalAdd(false);
            fetchPacientes(token, id); // Atualizar a lista de pacientes
        })
        .catch(error => {
            if (error.response) {
                if(error.request.status === 401){
                    alert("Sessão expirada");
                    navigate("/login");
                } else {
                    setMensagem(error.response.data.msg);
                }
            } else {
                setMensagem('Erro ao cadastrar paciente. Por favor, tente novamente mais tarde.');
            }
            console.error("Erro ao cadastrar paciente:", error);
        });
    }

    return (
        <>
            {modalDel && (
            <div className={styles.telaverdecontainer}>
                <div className={styles.modal1}>
                    <h1>Excluir Conta</h1>
                    <h1>Ao excluir a conta seu paciente será deslogado do MyPeace e a conta será deletada permanentemente</h1>
                    <h1>Deletar conta permanentemente?</h1>
                    <button>Deletar</button>
                    <button onClick={() => setModalDel(false)}>Sair</button>
                </div>
            </div>
        )}

        {modalEdt && (
            <div className={styles.telaverdecontainer}>
                <div className={styles.modal1}>
                    <h1>Editar Conta</h1>
                    <h1>Nome:</h1>
                    <input 
                        type="text" 
                        id="nome" 
                        name="nome" 
                        placeholder="Nome" 
                        value={nome}
                        onChange={e => setName(e.target.value)} 
                    />
                    <h1>Email:</h1>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <button>Confirmar</button>
                    <button onClick={() => setModalEdt(false)}>Sair</button>
                </div>
            </div>
        )}

        {modalAdd && (
            <div className={styles.telaverdecontainer}>
            
                    <div className={styles.modal1}>
                        <h1>Adicionar Paciente</h1>
                        <input 
                            type="text" 
                            id="nome" 
                            name="nome" 
                            placeholder="Nome" 
                            value={nome}
                            onChange={e => setName(e.target.value)} 
                            required
                        />
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                            required
                        />
                        <button type="submit" onSubmit={cadastrar}>Adicionar</button>
                        <button type="button" onClick={() => setModalAdd(false)}>Sair</button>
                        <p>{mensagem}</p>
                    </div>
                
            </div>
        )}
            <div className={styles.divverde2}>
                <h1>Lista de Pacientes</h1>
            </div>

            <div className={styles.adicionaeedata}>
                <h1 href="/">Início</h1> 
                <h1>{new Date().toLocaleDateString()}</h1>
                <h1 onClick={() => setModalAdd(true)}>Adicionar Paciente</h1>
                
            </div>

            <div className={styles.titulos}>
                <h1>n°</h1>
                <h1>nome</h1>
                <h1>Email</h1>
                <h1>Diario</h1>
                <h1>Perfil</h1>
            </div>

            <div className={styles.conteudo32}>
                {pacientes.length > 0 ? (
                    pacientes.map((paciente, index) => (
                    <div className={styles.cadastros} key={paciente.id}>
                        <div className={styles.dados1}>{index + 1}</div>
                        <div className={styles.dados2}>{paciente.nome}</div>
                        <div className={styles.dados3}>{paciente.email}</div>
                        <button onClick={() => setModalAdd(true)} className={styles.verificarbtndados4}>Verificar</button>
                    </div>
                    ))
                ) : (
                    <p>Nenhum paciente encontrado.</p>
                )}
                <div className={styles.imgs}>
                    <img onClick={() => setModalDel(true)} src={Deletar} alt="Deletar" />
                    <img onClick={() => setModalEdt(true)} src={Editar} alt="Editar" />
                </div>
            </div>
        </>
    );
};

export default App;
