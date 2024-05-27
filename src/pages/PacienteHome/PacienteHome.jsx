import { useLocation, useNavigate } from "react-router-dom";
import Cabecalho from "../../components/cabecalho/Cabecalho";
import Rodape from "../../components/rodape/rodape";
import './PacienteHome.css'
import { useEffect, useState } from "react";

export default function PacienteHome() {
    const {state} = useLocation();
    const [token, setToken] = useState()
    const [id, setId] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        if(!state?.token || !state?.id){
            navigate("/login")
        }else{
            setToken(state.token)
            setId(state.id)
        }
    }, [setId, setToken, navigate, state])


    const days = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31, '', '', '', ''],
    ];

    const handleClick = (day) => {
        if (day) {
            navigate(`/diario/${day}`, {state: {token, id}});
        }
    };


    return (
        <>
            <Cabecalho />
            <div className="calendar">
                <main className="main">
                    <h2>Diário:</h2>
                    <p>Selecione um dia:</p>
                    <table className="tabela">
                        <thead>
                            <tr>
                                <th>Seg</th>
                                <th>Ter</th>
                                <th>Qua</th>
                                <th>Qui</th>
                                <th>Sex</th>
                                <th>Sáb</th>
                                <th>Dom</th>
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((week, weekIndex) => (
                                <tr key={weekIndex}>
                                    {week.map((day, dayIndex) => (
                                        <td key={dayIndex} onClick={() => handleClick(day)}>{day}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
            <Rodape />
        </>
    )
}
