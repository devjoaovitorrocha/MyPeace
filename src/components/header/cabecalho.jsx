import './cabecalho.css'
import Logo from '../../assets/logo.png'
export default function Cabecalho(){

return (<>
    <div className='topo'>
        <div className='esquerda'>
            <img src={Logo} width={100}></img>
            <h1>MyPeace</h1>
        </div>
        <div className='direita'>
            <h1><a href="/cadastroPsicologo">Cadastro</a></h1>
            <h1><a href="/login">Login</a></h1>
        </div>
    </div>
    </>
 )
}
