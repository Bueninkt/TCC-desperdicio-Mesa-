import { useEffect, useState } from "react";
import logoMesa from "./assets/mesa-logo.png";

const LINKS = [
  { id: "home", label: "Home", href: "/" },
  { id: "sobre", label: "Sobre Nós", href: "/sobre" },      // ESTA PÁGINA
  { id: "mapa", label: "Mapa", href: "/mapa" },
  { id: "perfil", label: "Meu Perfil", href: "/perfil" },
  { id: "pedidos", label: "Meus Pedidos", href: "/pedidos" },
];

export default function MesaPlusLanding() {
  // detecta rota atual para marcar ativo; cai em /sobre por padrão (SSR-safe)
  const [active, setActive] = useState("sobre");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const match = LINKS.find(l => l.href === path);
      setActive(match ? match.id : "sobre");
    }
  }, []);

  const navItem = (id) =>
    `group relative inline-flex items-center gap-1 transition 
     ${active === id ? "text-[#cfe59b]" : "text-white/95 hover:text-white"}
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#cfe59b] after:transition-all
     ${active === id ? "after:w-full" : "group-hover:after:w-full"}`;

  return (
    <div className="min-h-screen bg-[#1f3e2b] text-white">
      {/* NAV */}
      <header className="w-full">
        <div className="mx-auto w-full max-w-[1760px] px-[60px] py-[38px] flex items-center justify-between">
          {/* esquerda */}
          <nav
            className="flex items-center gap-0 text-[24px] font-semibold"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            {LINKS.map((link, i) => (
              <div key={link.id} className="flex items-center">
                <a
                  href={link.href}
                  className={navItem(link.id)}
                  aria-current={active === link.id ? "page" : undefined}
                >
                  <span>{link.label}</span>
                  {/* setinha que aparece e desliza no hover */}
                  <span className="translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition">
                    →
                  </span>
                </a>
                {i < LINKS.length - 1 && (
                  <span className="mx-[18px] inline-block h-[10px] w-[10px] rounded-full bg-[#cfe59b]" />
                )}
              </div>
            ))}
          </nav>

          {/* direita: botões que vão para NOVAS páginas */}
          <div className="flex items-center gap-[8px]">
            <a
              href="/login"
              className="px-[28px] py-[10px] rounded-[28px] bg-[#b8cf6b] text-[#1b3726] italic font-bold shadow-sm hover:brightness-95 transition"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              Entrar
            </a>
            <a
              href="/cadastro"
              className="px-[28px] py-[10px] rounded-[28px] bg-[#f0e3c9] text-[#1b3726] italic font-bold shadow-sm hover:brightness-95 transition"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              Cadastre-se
            </a>
          </div>
        </div>
      </header>

      {/* PÁGINA: SOBRE NÓS (única seção desta tela) */}
      <section id="sobre" className="w-full bg-[#294f38]">
        <div className="mx-auto w-full max-w-[1760px] px-[60px] py-[60px] grid grid-cols-12 gap-8 items-center">
          {/* texto à esquerda (8 col) — alinhado e simétrico */}
          <div className="col-span-12 md:col-span-8">
            <h2
              className="text-white uppercase font-extrabold mb-[22px] text-[52px]"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              SOBRE NÓS:
            </h2>
            <p
              className="text-white/95 italic text-[28px] leading-[48px] max-w-[1050px]"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              Somos um projeto que conecta estabelecimentos, pessoas e instituições de
              caridade com o intuito de disponibilizar alimento para você, combatendo
              desperdício e a fome!
            </p>
          </div>

          {/* logo à direita (4 col), encostando com equilíbrio como no print */}
          <div className="col-span-12 md:col-span-4 flex md:justify-end justify-center">
            <img
              src={logoMesa}
              alt="MESA+"
              className="w-[300px] h-auto drop-shadow"
              draggable="false"
            />
          </div>
        </div>
      </section>

      <footer className="py-8" />
    </div>
  );
}
