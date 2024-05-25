import { useEffect, useState } from "react";
import Cabecalho from "../../components/cabecalho/Cabecalho"
import Rodape from "../../components/rodape/rodape"
import { useParams } from "react-router-dom";
import './Diario.css'


export default function Diario() {
    const { day } = useParams();
    const [descricao, setDescricao] = useState('');
    const [eventos] = useState({
        evento1: 'Acordei tarde',
        evento2: 'Atrasei para o trabalho',
        evento3: 'Comi pouco',
        evento4: 'Fiquei muito tempo no celular'
    });
    const [dataAtual, setDataAtual] = useState('');
    const [emojiSelecionado, setEmojiSelecionado] = useState('');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        setDataAtual(`${dia}/${mes}/${ano}`);
    }, []);

    useEffect(() => {
        if (day) {
            setDataAtual(prevDataAtual => `${day}/${prevDataAtual.split('/')[1]}/${prevDataAtual.split('/')[2]}`);
        }
    }, [day]);

    const handleDescricaoChange = (e) => setDescricao(e.target.value);

    const handleEmojiClick = (emoji) => setEmojiSelecionado(emoji);

    const handleSalvar = () => {
        if (descricao === '' || emojiSelecionado === '') {
            setMensagem('Por favor, preencha a descrição e selecione um emoji.');
        } else {
            setMensagem('Salvo com sucesso!');
            setTimeout(() => setMensagem(''), 3000);
        }
    };

    const handleCancelar = () => {
        setMensagem('');
        setDescricao('');
        setEmojiSelecionado('');
    };

    return (
        <>
            <Cabecalho />
            <main className="content-container">
                <div className="content-box">
                    <h2>{dataAtual}</h2>
                    <div className="emojis">
                        <span
                            role="img"
                            aria-label="feliz"
                            onClick={() => handleEmojiClick('😊')}
                            className={emojiSelecionado === '😊' ? 'emoji-selecionado' : ''}
                        >😊</span>
                        <span
                            role="img"
                            aria-label="levemente feliz"
                            onClick={() => handleEmojiClick('🙂')}
                            className={emojiSelecionado === '🙂' ? 'emoji-selecionado' : ''}
                        >🙂</span>
                        <span
                            role="img"
                            aria-label="neutro"
                            onClick={() => handleEmojiClick('😐')}
                            className={emojiSelecionado === '😐' ? 'emoji-selecionado' : ''}
                        >😐</span>
                        <span
                            role="img"
                            aria-label="triste"
                            onClick={() => handleEmojiClick('🙁')}
                            className={emojiSelecionado === '🙁' ? 'emoji-selecionado' : ''}
                        >🙁</span>
                        <span
                            role="img"
                            aria-label="irritado"
                            onClick={() => handleEmojiClick('😠')}
                            className={emojiSelecionado === '😠' ? 'emoji-selecionado' : ''}
                        >😠</span>
                    </div>
                    <label htmlFor="descricao">Descrição:</label>
                    <input
                        type="text"
                        id="descricao"
                        value={descricao}
                        onChange={handleDescricaoChange}
                    />
                    <div className="eventos">
                        {Object.keys(eventos).map((key, index) => (
                            <div key={index} className="evento">
                                <span>{index + 1}</span>
                                <span>{eventos[key]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="botoes">
                        <button className="botao-salvar" onClick={handleSalvar}>SALVAR</button>
                        <button className="botao-cancelar" onClick={handleCancelar}>CANCELAR</button>
                    </div>
                    {mensagem && <div className="mensagem">{mensagem}</div>}
                </div>
            </main>
            <Rodape />
        </>
    )
}