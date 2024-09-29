import {
  ArrowLeft,
  ArrowUpRight,
  Database,
  User,
  UserCirclePlus,
  UserList,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import React from "react";
import HoverForCards from "../../components/HoverForCards";

const HoverDevCards = ({ onVerPacientes }) => {
  return (
    <div className="grid justify-between gap-4 grid-cols-2 lg:grid-cols-4">
      <HoverForCards
        title="Adicionar Pacientes"
        subtitle={<ArrowUpRight />}
        Icon={UserCirclePlus}
      />
      <HoverForCards
        title="Registro dos Pacientes"
        subtitle={<ArrowUpRight />}
        Icon={Database}
      />
      <HoverForCards
        title="Ver Pacientes"
        subtitle={<ArrowUpRight />}
        Icon={UserList}
        onClick={onVerPacientes} 
      />
    </div>
  );
};

export default function PrincipalPsico() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (!state?.token || !state?.id) {
      navigate("/login");
    } else {
      setToken(state.token);
      setId(state.id);
    }
  }, [navigate, state]);

  const handleVerPacientes = () => {
    navigate("/principalPsico/listapaciente", { state: { token, id } });
  };

  return (
    <>
      <header className="p-3 z-50 w-full text-white">
        <div className=" bg-green-900 rounded-2xl px-6 py-4 shadow-xl flex items-center justify-center md:justify-between md:flex-row flex-col border-b-4 border-green-400">
          <div className="flex md:flex-row flex-col items-center gap-4">
            <div className="rounded-full border-2 border-green-500 w-16 h-16 flex items-center justify-center">
              <User fill="white" size={24} />
            </div>
            <div className="md:text-start text-center text-lg">
              <h1 className="font-bold">Olá, </h1>
              <h2 className="italic">Nome do Psicólogo</h2>
            </div>
          </div>
          <div className="h-px w-full bg-white md:hidden block my-3" />
          <Link to="/" className="md:m-6 group relative w-max">
            <div className="flex items-center transition-all gap-1 hover:gap-2">
              <ArrowLeft size={20} />
              <h1 className="font-medium">Início</h1>
            </div>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-white group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-white group-hover:w-3/6"></span>
          </Link>
        </div>
      </header>
      <main className="max-w-[1440px] mx-auto 2xl:p-0 py-3 px-6">
        <h1 className="py-7 text-2xl font-bold">Acesso Rápido</h1>
        <HoverDevCards onVerPacientes={handleVerPacientes} />
        <h1 className="py-11 text-2xl font-bold">Adicionar Pacientes</h1>
        <section className="flex flex-col gap-10">
          <div className="w-full h-72 sm:h-56 md:h-40 bg-green-800 rounded-2xl transition-all shadow-xl hover:shadow-2xl text-white p-6 text-2xl relative">
            <h1 className="font-light leading-9">
              Adicione pacientes para ter melhores resultados em suas consultas!
            </h1>
            <button className="absolute bottom-0 right-0 p-5 bg-pink-500 shadow-3D rounded-tl-2xl rounded-br-xl hover:pb-6 transition-all flex items-center gap-2">
              <h6 className="text-sm">Acessar</h6>
              <ArrowUpRight weight="bold" />
            </button>
          </div>
          <h1 className="text-2xl font-bold">Registro dos Pacientes</h1>
          <div className="w-full h-72 sm:h-56 md:h-40 bg-green-800 rounded-2xl transition-all shadow-xl hover:shadow-2xl text-white p-6 text-2xl relative">
            <h1 className="font-light leading-9">
              Veja como seu paciente anda se sentindo durante a semana
            </h1>
            <button className="absolute bottom-0 right-0 p-5 bg-pink-500 shadow-3D rounded-tl-2xl rounded-br-xl hover:pb-6 transition-all flex items-center gap-2">
              <h6 className="text-sm">Acessar</h6>
              <ArrowUpRight weight="bold" />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
