import React from "react";
import ReactDOM from "react-dom/client";
import HudCadastroPage from "./hudCadastro.jsx";   // <- arquivo certo
import "./hudCadastro.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HudCadastroPage />
  </React.StrictMode>
);
