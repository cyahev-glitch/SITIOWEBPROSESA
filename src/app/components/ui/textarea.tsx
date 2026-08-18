/*
  textarea.tsx — Campo de texto de varias lineas, para mensajes largos.

  NOTA: esta pieza NO se usa en el sitio de PROSESA. La carpeta "ui"
  es una libreria de componentes que vino con la plantilla base del
  proyecto. Todo lo que se ve en la pagina esta escrito en el archivo
  src/app/App.tsx. Borrar esta carpeta no afectaria nada.
*/
import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
