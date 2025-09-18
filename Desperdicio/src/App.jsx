import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/mesa-logo.png";

/** Itens do menu (navegação interna por âncora / ou rotas) */
const LINKS_MENU = [
  { id: "home", rotulo: "Home" },
  { id: "sobre-nos", rotulo: "Sobre Nós" },
  { id: "mapa", rotulo: "Mapa" },
  { id: "perfil", rotulo: "Meu Perfil" },
  { id: "pedidos", rotulo: "Meus Pedidos" },
];

/** Util: determina qual item deve ficar ativo nesta página/rota */
function getCurrentSection() {
  const ids = new Set(LINKS_MENU.map((l) => l.id));
  const hash = (window.location.hash || "").replace(/^#/, "");
  if (hash && ids.has(hash)) return hash;

  const path = window.location.pathname.replace(/^\/+/, "").toLowerCase();
  if (path && ids.has(path)) return path;

  // Padrão segue "sobre-nos" enquanto a Home interna está em preparo
  return "sobre-nos";
}

/** Cabeçalho com navegação e ações externas */
function Cabecalho({ ativo, onNavegar }) {
  return (
    <header className="cabecalho">
      <div className="container faixa-cabecalho">
        {/* Marca */}
        <a href="#home" className="marca" onClick={(e) => onNavegar(e, "home")}>
          <img src={logo} width="36" height="36" alt="Logo Mesa+" />
          <span className="marca__nome">Mesa+</span>
        </a>

        <nav className="navegacao" aria-label="Navegação principal">
          <ul className="navegacao__lista" role="list">
            {LINKS_MENU.map(({ id, rotulo }) => (
              <li key={id} className="navegacao__item">
                <a
                  className="navegacao__link"
                  href={`#${id}`}
                  aria-current={ativo === id ? "page" : undefined}
                  onClick={(e) => onNavegar(e, id)}
                >
                  {rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="acoes">
          <a className="botao" href="https://seu-dominio.com/login" target="_blank" rel="noopener noreferrer">
            Entrar
          </a>
          <a className="botao botao--secundario" href="/hudCadastro.html" target="_blank" rel="noopener noreferrer">
            Cadastre-se
          </a>
        </div>
      </div>
    </header>
  );
}

/** Slogan (conteúdo antigo da Home, sem ser "hero") */
function Slogan() {
  return (
    <section id="slogan" className="slogan" aria-labelledby="titulo-slogan">
      <div className="container">
        <h1 id="titulo-slogan" className="slogan__titulo">Mesa+</h1>
        <p className="slogan__frase">Combatendo Desperdicio e a Fome!</p>
      </div>
    </section>
  );
}

/** Seção Sobre Nós (pronta) */
function SobreNos() {
  return (
    <section id="sobre-nos" className="sobre" aria-labelledby="titulo-sobre">
      <div className="container sobre__grid">
        <div>
          <p className="chamada">SOBRE NÓS:</p>
          <h2 id="titulo-sobre" className="sobre__titulo">Somos um projeto que conecta</h2>
          <p className="sobre__texto">
            estabelecimentos, pessoas e instituições de caridade com o intuito de
            disponibilizar alimento para você, <strong>Combatendo Desperdício e a Fome!</strong>
          </p>
          <span className="selo">Projeto Social</span>
        </div>

        <aside className="brasao" aria-label="Identidade visual Mesa+">
          <img className="brasao__imagem" src={logo} alt="Logotipo Mesa+" />
        </aside>
      </div>
    </section>
  );
}

/** Blocos simples (placeholders) */
function Bloco({ id, titulo }) {
  return (
    <section id={id} className="container bloco section--com-divisor" aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`} className="bloco__titulo">{titulo}</h2>
      <p className="bloco__texto">Área interna do app (em construção).</p>
    </section>
  );
}


function Rodape() {
  return (
    <footer className="rodape" role="contentinfo">
      <div className="container">
        <small>© {new Date().getFullYear()} Mesa+. Todos os direitos reservados.</small>
      </div>
    </footer>
  );
}

export default function App() {
  const [ativo, setAtivo] = useState(() => getCurrentSection());

  useEffect(() => {
    const onPop = () => setAtivo(getCurrentSection());
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  const navegarPara = (evento, id) => {
    evento.preventDefault();
    const alvo = document.getElementById(id);

    if (alvo) {
      history.pushState({}, "", `#${id}`);
      setAtivo(id);
      const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      alvo.scrollIntoView({ behavior: reduz ? "auto" : "smooth", block: "start" });
    } else {
      window.location.assign(`/${id}`);
    }
  };

  return (
    <>
      <Cabecalho ativo={ativo} onNavegar={navegarPara} />
      <main>
        {/* Conteúdo antigo da Home mantido (como Slogan, não é hero) */}
        <Slogan />

        {/* Sobre Nós pronta */}
        <SobreNos />

        {/* Demais áreas placeholders */}
        <Bloco id="mapa" titulo="Mapa" />
        <Bloco id="perfil" titulo="Meu Perfil" />
        <Bloco id="pedidos" titulo="Meus Pedidos" />

        {/* Home em preparo, padronizada e posicionada abaixo de Meus Pedidos */}
        <Bloco id="home" titulo="Home" />
      </main>
      <Rodape />
    </>
  );
}