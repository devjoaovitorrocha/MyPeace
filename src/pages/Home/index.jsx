import Container from "../../components/Container";
import Header from "../../components/Header";
import * as Icon from "@phosphor-icons/react";
import HomeCards from "../../components/HomeCards";
import { Carousel } from "flowbite-react";
import { AuroraHero } from "../../components/AuroraHero";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom"; // Adicionando o Link do react-router-dom

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <section className="w-full h-[500px] rounded-2xl bg-green-500 relative">
          <h1 className="absolute z-50 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white text-6xl">
            MyPeace.
          </h1>
          <Carousel>
            <img
              src="https://images.pexels.com/photos/725255/pexels-photo-725255.jpeg"
              className="opacity-50 h-full md:h-auto"
              alt="Imagem 1"
            />
            <img
              src="https://images.pexels.com/photos/1261459/pexels-photo-1261459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="opacity-50 h-full md:h-auto"
              alt="Imagem 2"
            />
            <img
              src="https://images.pexels.com/photos/1624565/pexels-photo-1624565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="opacity-50 h-full md:h-auto"
              alt="Imagem 3"
            />
          </Carousel>
        </section>
        <div className="lg:h-12 h-6" />
        <section className="w-full bg-[#3C5454] rounded-xl p-8 md:py-8 space-y-12 shadow-3D">
          <div className="flex flex-col justify-center items-center gap-y-3 text-white">
            <h5 className="uppercase tracking-[0.2em] text-xs font-light">
              serviços
            </h5>
            <h1 className="text-center text-2xl">
              Descubra quais ferramentas o MyPeace disponibiliza!
            </h1>
          </div>
          <div className="flex items-center flex-wrap justify-around gap-y-12">
            <HomeCards
              titulo={"Interação entre psicólogo e paciente"}
              icone={<Icon.Chats size={64} weight="duotone" />}
            />
            {/* Usando o Link para redirecionar para a página do Diário de Emoções */}
            <Link to="/diario-emocoes">
              <HomeCards
                titulo={"Diário de emoções"}
                icone={<Icon.BookBookmark size={64} weight="duotone" />}
              />
            </Link>
            <HomeCards
              titulo={"Respiração guiada"}
              icone={<Icon.Timer size={64} weight="duotone" />}
            />
          </div>
        </section>
        <div className="lg:h-12 h-6" />
        <section>
          {/* Restante do código */}
        </section>
        <div className="lg:h-12 h-6" />
        <AuroraHero />
      </Container>
      <div className="lg:h-12 h-6" />
      <Footer />
    </>
  );
}
