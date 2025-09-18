import React from "react";
import "./hudCadastro.css";

import perfil from "./assets/profile.png";
import empresa from "./assets/house-food.png";
import ong from "./assets/bag.png";
import brasao from "./assets/mesa-logo.png"; // usando sua logo como brasão

function Card({ titulo, subtitulo, imagem, href = "#" }) {
  return (
    <article className="card">
      <h3 className="card__marca">{titulo}</h3>
      <p className="card__sub">{subtitulo}</p>

      <div className="card__icone">
        <img src={imagem} alt="" width="160" height="160" />
      </div>

      <a className="card__btn" href={href}>
        Ir para
      </a>
    </article>
  );
}

export default function HudCadastroPage() {
  return (
    <div className="pagina">
      <header className="topo">
        <nav className="topo__nav container">
          {/* Brasão à esquerda */}
          <a className="brand" href="/#sobre-nos" aria-label="Início">
            <img src={brasao} alt="Brasão Mesa+" width="40" height="40" />
          </a>

          {/* Título centralizado */}
          <h1 className="nav__titulo">Hud Cadastro</h1>

          {/* Link à direita com # por enquanto */}
          <a className="btn-entrar" href="#">Entrar</a>
        </nav>
      </header>

      <main className="container miolo">
        <section aria-label="Escolha o tipo de cadastro" className="grade">
          <Card
            titulo="Mesa+"
            subtitulo="Cadastrar Pessoa"
            imagem={perfil}
            href="#"
          />
          <Card
            titulo="Mesa+"
            subtitulo="Cadastrar Empresa"
            imagem={empresa}
            href="#"
          />
          <Card
            titulo="Mesa+"
            subtitulo="Cadastrar ONGs"
            imagem={ong}
            href="#"
          />
        </section>
      </main>
    </div>
  );
}
