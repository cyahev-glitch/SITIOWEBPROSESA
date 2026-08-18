/*
  label.tsx — Etiqueta de texto que va arriba o al lado de un campo de formulario.

  NOTA: esta pieza NO se usa en el sitio de PROSESA. La carpeta "ui"
  es una libreria de componentes que vino con la plantilla base del
  proyecto. Todo lo que se ve en la pagina esta escrito en el archivo
  src/app/App.tsx. Borrar esta carpeta no afectaria nada.
*/
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "./utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
