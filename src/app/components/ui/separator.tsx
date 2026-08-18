/*
  separator.tsx — Linea divisoria entre bloques.

  NOTA: esta pieza NO se usa en el sitio de PROSESA. La carpeta "ui"
  es una libreria de componentes que vino con la plantilla base del
  proyecto. Todo lo que se ve en la pagina esta escrito en el archivo
  src/app/App.tsx. Borrar esta carpeta no afectaria nada.
*/
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "./utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
