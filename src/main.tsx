// Este archivo tecnico es el que "enciende" el sitio web (conecta App.tsx con la pagina). No hay que tocarlo.
import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/index.css";
import App from "@/app/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
