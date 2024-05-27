import'./Cabecalho.css'
import logo from "../cabecalho/logo.png"



function Cabecalho(){
    return(
        <>
            <header className="cabecalho_header">
                <div className="nomeapp">
                    <img src={logo} alt="Logo"></img>
                    <h1>MyPeace</h1>
                </div>
                <div className='sign-in'>
                    <h1><a href="/cadastroPsicologo">Cadastro</a></h1>
                    <h1><a href="/login">Login</a></h1>
                </div>
            </header>    
        </>
    )
}

export default Cabecalho;