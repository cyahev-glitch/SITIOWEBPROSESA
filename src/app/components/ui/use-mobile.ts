/*
  use-mobile.ts — Herramienta que detecta si el visitante esta entrando desde un celular.

  NOTA: esta pieza NO se usa en el sitio de PROSESA. La carpeta "ui"
  es una libreria de componentes que vino con la plantilla base del
  proyecto. Todo lo que se ve en la pagina esta escrito en el archivo
  src/app/App.tsx. Borrar esta carpeta no afectaria nada.
*/
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
