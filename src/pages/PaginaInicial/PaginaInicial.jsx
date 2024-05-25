import Cabecalho from '../../components/cabecalho/Cabecalho'
import Rodape from '../../components/rodape/rodape'
import './PaginaInicial.css'

export default function PaginaInicial() {
    return (
        <>
            <Cabecalho />
            <main>
                <div className='inicio'>
                    <div className='texto'>
                        <h1> O MyPeace é um aplicativo inovador projetado para auxiliar psicólogos e profissionais de saúde mental a promoverem um maior controle e acompanhamento eficaz da rotina semanal de seus pacientes.Com recursos que ajudam o tratamento, o MyPeace visa facilitar a comunicação entre o profissional e paciente.Fortalecendo o vínculo terapêutico e proporcionando uma exepriência de acompanhamento mais eficiente e compassiva. </h1>
                        <img alt=''></img>
                    </div>
                </div>

                <h2>O que o MyPeace te proporciona?</h2>

                <div className='img_diario'>
                    <div className='central_diario'>
                        <img className='imgdiario' alt=''></img>
                        <h1 className='h1diario'>texto explicativo</h1>
                    </div>
                </div>

                <div className='img_resp'>
                    <div className='central_resp'>
                        <img className='imgresp' alt='' ></img>
                        <h1 className='h1respirasao'>texto explicativo</h1>
                    </div>
                </div>

                <div className='img_chat'>
                    <div className='central_chat'>
                        <img className='imgchat' alt=''></img>
                        <h1 className='h1chat'>texto explicativo</h1>
                    </div>
                </div>

            </main>
            <Rodape />
        </>
    )
}