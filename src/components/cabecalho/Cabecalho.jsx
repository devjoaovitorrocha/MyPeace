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
            </header>    

   

        
        </>
    )
}

export default Cabecalho;