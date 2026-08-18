/* ============================================================
   vite.config.ts — ARCHIVO TECNICO (no hace falta tocarlo)
   ============================================================
   Vite es el programa que "arma" el sitio: toma todos los archivos
   de codigo, imagenes y estilos y los convierte en la pagina web
   final que ve el visitante.

   Aqui solo se configura ese proceso de armado: por ejemplo, el
   atajo "@/" para no escribir rutas largas, y que archivos de
   imagen se deben incluir.

   Si el sitio deja de compilar despues de tocar este archivo,
   lo mejor es pedir ayuda a un desarrollador.
   ============================================================ */

import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // Los complementos de React y Tailwind son obligatorios para que el
    // sitio se arme correctamente. No los quites.
    react(),
    tailwindcss(),
    {
      name: "serve-fichas-from-root",
      buildStart() {
        // Copy root-level ficha PDFs into public/productos/ for production build
        const productoDir = path.resolve(
          __dirname,
          "public/productos",
        );
        if (!fs.existsSync(productoDir)) {
          fs.mkdirSync(productoDir, { recursive: true });
        }
        const rootFiles = fs.readdirSync(__dirname);
        for (const file of rootFiles) {
          if (
            file.startsWith("ficha-") &&
            file.endsWith(".pdf")
          ) {
            fs.copyFileSync(
              path.resolve(__dirname, file),
              path.resolve(productoDir, file),
            );
          }
        }
      },
      configureServer(server: any) {
        // In dev mode, serve root-level PDFs at /productos/ path
        server.middlewares.use(
          (req: any, res: any, next: any) => {
            const url = (req.url || "").split("?")[0];
            if (
              url.startsWith("/productos/") &&
              url.endsWith(".pdf")
            ) {
              const filename = url.replace("/productos/", "");
              const filepath = path.resolve(
                __dirname,
                filename,
              );
              if (fs.existsSync(filepath)) {
                const data = fs.readFileSync(filepath);
                res.setHeader(
                  "Content-Type",
                  "application/pdf",
                );
                res.setHeader(
                  "Content-Disposition",
                  `inline; filename="${filename}"`,
                );
                res.end(data);
                return;
              }
            }
            next();
          },
        );
      },
    },
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ["**/*.svg", "**/*.csv"],

  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.production.html"),
      },
    },
  },
});