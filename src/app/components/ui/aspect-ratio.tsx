/*
  aspect-ratio.tsx — Mantiene una caja siempre en la misma proporcion, por ejemplo 16:9 para videos.

  NOTA: esta pieza NO se usa en el sitio de PROSESA. La carpeta "ui"
  es una libreria de componentes que vino con la plantilla base del
  proyecto. Todo lo que se ve en la pagina esta escrito en el archivo
  src/app/App.tsx. Borrar esta carpeta no afectaria nada.
*/
"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
