import { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, SignIn } from "@phosphor-icons/react";
import { Toaster, toast } from "sonner";
import { http } from "../../App";
import Inputs from "../../components/Inputs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "pacient") {
      navigate("/principalCliente", { state: { token, id } });
    } else if (type === "psychologist") {
      navigate("/principalPsico", { state: { token, id } });
    }
  }, [type, token, id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await http.post("/auth/login", {
        email: email,
        password: senha,
      });
      setId(response.data.id);
      setToken(response.data.token);
      setType(response.data.type);
      if (type === "pacient") {
        navigate("/principalCliente", { state: { token, id } });
        console.log(type);
      } else if (type === "psychologist") {
        navigate("/principalPsico", { state: { token, id } });
        console.log(type);
      }
      console.log(type);
    } catch (e) {
      toast.error(`${e.response.data.msg}`);
      console.log(e);
    }
  };

  return (
    <>
      <Toaster
        expand
        position="bottom-center"
        richColors
        toastOptions={{
          style: {
            margin: "10px",
            padding: "15px",
            maxWidth: "400px",
            borderRadius: "8px",
            gap: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
      <main className="w-full h-screen grid place-content-center bg-[#3c5454] space-y-6">
        <div className="flex flex-col items-center gap-y-6">
          <img src={Logo} alt="logo" />
          <h1 className="font-semibold text-white text-2xl text-center">
            Faça o login na sua conta
          </h1>
        </div>
        <div className="bg-white shadow-3D sm:rounded-lg p-6 sm:p-10 sm:w-[480px] w-screen h-96 flex flex-col justify-center">
          <form className="grid grid-cols-6 space-y-12" onSubmit={handleSubmit}>
            <div className="col-span-6 relative z-0">
              <Inputs
                type="email"
                label="Email:"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-span-6 relative z-0">
              <Inputs
                isSenha
                label="Senha:"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div className="col-span-6 flex flex-col items-center justify-center sm:gap-4">
              <button
                type="submit"
                className='
        relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-lg border-[1px] 
        border-[#00bfa6] px-4 py-2 font-semibold
        uppercase text-[#00bfa6] transition-all duration-300
        
        before:absolute before:inset-0
        before:-z-10 before:translate-x-[150%]
        before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-[#00bfa6]
        before:transition-transform before:duration-1000
        before:content-[""]
          
        w-full
        hover:scale-105 hover:text-white
        hover:before:translate-x-[0%]
        hover:before:translate-y-[0%]
        active:scale-95'
              >
                <SignIn />
                <span>Entrar</span>
              </button>
              <p
                onClick={() => setEmailVerificationVisible(true)}
                className="mt-4 text-sm text-gray-500 sm:mt-0"
              >
                Não tem uma conta?{" "}
                <Link
                  to={"/cadastroPsicologo"}
                  className="text-gray-700 transition-colors hover:text-gray-800 hover:font-medium underline ml-2"
                >
                  {" "}
                  Cadastrar{" "}
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
        <div className="flex items-center flex-col justify-center pt-6">
          <Link
            className="cursor-pointer hover:opacity-95 relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-white text-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            to="/"
          >
            <div className="flex items-center hover:gap-x-1.5 gap-x-1 transition-all">
              <ArrowLeft />
              Voltar
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}
