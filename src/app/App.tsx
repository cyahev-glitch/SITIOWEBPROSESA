/* ============================================================
   SITIO WEB PROSESA — GUIA PARA EL CLIENTE
   ============================================================

   QUE ES ESTE ARCHIVO
   Este archivo (App.tsx) es el sitio web completo: todos los
   textos, las secciones, los colores y el funcionamiento estan
   aqui dentro. Es el archivo que hay que abrir para cambiar
   casi cualquier cosa que se vea en la pagina.

   COMO ENCONTRAR UNA SECCION
   El archivo esta dividido en bloques marcados asi:
       ─── CATALOGO ───
   Busca el nombre de la seccion con Ctrl+F (Windows) o Cmd+F
   (Mac) y te lleva directo. Las secciones, en orden, son:
   BARRA DE NAVEGACION, PORTADA, SERVICIOS, CATALOGO,
   DISTRIBUIDORES, NOSOTROS, CLIENTES, AFILIADOS, CONTACTO,
   FOOTER (pie de pagina), CARRITO y POLITICA DE PRIVACIDAD.

   LOS PRODUCTOS NO ESTAN EN EL CODIGO
   El catalogo de productos y accesorios se trae EN VIVO desde
   un Google Sheet. Para agregar, quitar o editar un producto
   se edita el Google Sheet y el sitio se actualiza solo: no
   hace falta tocar nada de codigo.
   (Si algun dia se vuelve a publicar el Google Apps Script y
   cambia su direccion, hay que actualizarla en las dos lineas
   marcadas como URL del Apps Script, dentro de COMPONENTE
   PRINCIPAL.)

   LOS FORMULARIOS Y EL CARRITO MANDAN CORREO
   El formulario de Contacto y el Carrito de cotizacion envian
   correos con un servicio llamado EmailJS. Las 3 claves que
   necesitan estan aqui mismo, unas lineas mas abajo: busca
   CONFIGURACION DE CORREO. Si esas claves siguen diciendo
   "PEGA_AQUI...", los formularios no van a enviar nada.

   LAS FOTOS DE PRODUCTO
   Se suben a la carpeta src/imports/productos/ y el sitio las
   toma solas por el nombre del archivo. Tambien acepta enlaces
   publicos de Google Drive en la columna "imagen" del Sheet.

   COMO PUBLICAR EL SITIO (Hostinger u otro hosting)
   1) pegar las 3 claves de EmailJS aqui abajo (CONFIGURACION DE CORREO)
   2) npm install          -> instala lo que el sitio necesita
   3) npm run build        -> crea la carpeta dist/
   4) subir TODO EL CONTENIDO de dist/ (no la carpeta) a la carpeta
      publica del hosting; en Hostinger se llama public_html

   OJO: el paso 4 debe dejar index.html y la carpeta assets/ sueltos
   dentro de public_html. El sitio esta hecho para vivir en la raiz
   del dominio, no dentro de una subcarpeta.
   ============================================================ */

/* ============================================================
   CONFIGURACION DE CORREO (EmailJS)
   ============================================================
   Aqui van las 3 claves que permiten que el formulario de Contacto
   y el Carrito de cotizacion envien correo.

   >>> PEGA TUS 3 VALORES ENTRE LAS COMILLAS DE ABAJO <<<

   Los sacas de tu cuenta de EmailJS (emailjs.com):
     SERVICE_ID   -> menu "Email Services"
     TEMPLATE_ID  -> menu "Email Templates"
     PUBLIC_KEY   -> menu "Account" > "General" > "Public Key"

   Nota: estas 3 claves no son secretas. EmailJS las publica a
   proposito porque tienen que viajar al navegador del visitante
   para funcionar. Ponerlas aqui no baja la seguridad del sitio.

   (Si algun dia alguien crea un archivo .env, sus valores mandan
   sobre estos. Pero ya no hace falta ese archivo.)
   ============================================================ */
const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "PEGA_AQUI_TU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "PEGA_AQUI_TU_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "PEGA_AQUI_TU_PUBLIC_KEY";

// ─── LISTA DE INGREDIENTES ───────────────────────────────────
// Las lineas que empiezan con "import" son la lista de cosas que
// este archivo necesita para funcionar: herramientas de React, los
// iconos, el archivo del catalogo y todos los logos e imagenes.
// Es como la lista del super antes de cocinar. Si mas adelante se
// agrega un logo nuevo, hay que sumarlo aqui con una linea igual a
// las de abajo. Fuera de eso, esta parte no se toca.

import { useState, useMemo, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import {
    Menu, X, Phone, Mail, ChevronRight, ChevronLeft,
      Wifi, Settings, Wrench, Camera, Search, Shield,
  Download, ArrowRight, Star, CheckCircle,
  Building2, Factory, Truck, Globe, Award, Share2, Tag,
  Facebook, Instagram, Linkedin,
  ShoppingCart, Plus, Minus, Trash2, Package, Send
} from "lucide-react";
import catalogoData from "@/imports/catalogo_prosesa.json";
import logoColor from "@/imports/PROSESA_logo-04-1.png";
import logoWhite from "@/imports/PROSESA_logo-07-1.png";
import isotipo from "@/imports/PROSESA_ISOTIPO-04.png";
import heroPhoto from "@/imports/9a307031-a63a-4623-ae53-d1d7df73ffca.png";
import teamPhoto1 from "@/imports/dfe0a1f0-2992-484a-85a1-e7b9c933f6b9.png";
import teamPhoto2 from "@/imports/d7f50211-8ab7-486f-a03f-0b827d1b278c.png";
import logoMotorola from "@/imports/motorola-new-logo.svg";
import logoKenwood from "@/imports/KENWOOD.png";
import logoHikvision from "@/imports/HIKVISION.png";
import logoHytera from "@/imports/hytera-logo-png_seeklogo-332319.png";
import logoPttpro from "@/imports/logo_PTTPRO.png";
import logoHanwha from "@/imports/Hanwha-Vision_RGB_4_EH.png";
import logoCame from "@/imports/CAME-1.png";
import logoRanger from "@/imports/ranger.png";
import logoEpcom from "@/imports/epcom.png";
import logoAccesspro from "@/imports/AccessPRO-1.png";
import logoZkteco from "@/imports/ZKTeco-usa.png";
import clientCemex from "@/imports/cemex-logo-png_seeklogo-260771.png";
import clientDeacero from "@/imports/de-acero-vector-logo.png";
import clientWhirlpool from "@/imports/whirlpool-logo-png_seeklogo-499212.png";
import clientMilenium from "@/imports/logo-milenium-1400x350px.png";
import clientCemexNew from "../../cemex-logo-new.png";
import clientMetalsaNew from "../../metalsa-logo-new.png";
/* ─── MAPA DE IMAGENES DE PRODUCTOS (funciona en vista previa y en produccion) ─── */
// Este bloque busca automaticamente todas las fotos que esten dentro de la carpeta de productos y las deja listas para usarse. Para agregar la foto de un producto nuevo, solo hay que subir el archivo de imagen a esa carpeta (no hace falta escribir codigo).
const _productImageGlob = import.meta.glob("@/imports/productos/*", { eager: true }) as Record<string, { default: string }>;
const PRODUCT_IMG: Record<string, string> = {};
for (const [path, mod] of Object.entries(_productImageGlob)) {
  const filename = path.split("/").pop()!;
  PRODUCT_IMG[filename] = mod.default;
}

/* ─── COMPARADOR DE TEXTOS (marcas y categorias) ───────────────
   Esta funcion sirve para comparar textos sin que importen las
   mayusculas, los acentos ni los espacios de sobra.

   Gracias a esto, en el Google Sheet da igual escribir "Motorola",
   "MOTOROLA", "motorola" o "Motorola " (con espacio al final): el
   sitio las trata como la misma marca y no duplica el filtro.

   Lo mismo con las categorias: "Radios Portátiles" y "radios
   portatiles" son la misma.
   ────────────────────────────────────────────────────────────── */
const norm = (s?: string): string =>
  (s ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/* ─── TIPOS ─── */
// Aqui se define la "forma" que debe tener cada producto y cada accesorio (que datos trae cada uno). Es una parte tecnica; normalmente NO hay que tocarla para hacer cambios normales del sitio.
type Section = "inicio" | "servicios" | "catalogo" | "distribuidores" | "nosotros" | "clientes" | "contacto";

interface Product {
  id: number;
  name: string;
  model: string;
  category: string;
  brand: string;
  description: string;
  specs: string[];
  imagen?: string;
  imagenesExtra?: string[];
  ficha_pdf?: string;
  accesorios?: string[];
}

interface Accesorio {
  id: number;
  nombre: string;
  categoria: string;
  marca: string;
  descripcion: string;
  imagen?: string;
  compatibleCon: string[];
}

/* ─── DATA ─── */
// Debajo hay funciones de apoyo que ordenan la informacion que llega del Google Sheet (por ejemplo, separar una lista escrita con comas) y las listas fijas del sitio: frases de clientes, logos de clientes y marcas distribuidoras. Parte tecnica salvo las listas, que si se pueden editar.
function splitCsv(val: any): string[] {
  if (Array.isArray(val)) return val.filter(Boolean);
  if (typeof val === "string" && val.trim()) return val.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

const PRODUCTS: Product[] = (catalogoData as any[]).map((p) => ({
  id: p.id,
  name: p.nombre,
  model: p.modelo,
  category: p.categoria,
  brand: p.marca,
  description: p.descripcion,
  specs: splitCsv(p.specs),
  imagen: p.imagen,
  imagenesExtra: splitCsv(p.imagenes_extra),
  ficha_pdf: p.ficha_pdf,
  accesorios: splitCsv(p.accesorios),
}));

const RAW_CATS = Array.from(new Set(PRODUCTS.map((p) => p.category)));
const CATEGORIES = ["Todos", "Radiocomunicación", ...RAW_CATS.filter(c => c.toLowerCase() !== "radios portátiles" && c.toLowerCase() !== "radios móviles")]
const BRANDS = ["Todas", ...Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort()];

interface Testimonial {
  quote: string;
  company: string;
  logo: string;
}
// Aqui abajo estan las 3 frases de clientes que aparecen girando en la seccion "Clientes". Para cambiar una frase, el nombre de la empresa o el logo, edita los textos entre comillas de cada bloque.
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "PROSESA nos brinda la tranquilidad y confianza por medio de la atención personalizada de nuestros sistemas de seguridad de CCTV.",
    company: "DEACERO",
    logo: clientDeacero,
  },
  {
    quote: "Gracias a PROSESA, con su rápida y eficiente atención, nuestras operaciones se han visto beneficiadas de manera significativa al mejorar la red de radiocomunicación de nuestras plantas y unidades.",
    company: "CEMEX",
    logo: clientCemex,
  },
  {
    quote: "En PROSESA hemos encontrado una solución a medida para nuestro sistema de radiocomunicación. Lo que los distingue es su profesionalismo y compromiso, así como un excelente servicio.",
    company: "Whirlpool",
    logo: clientWhirlpool,
  },
];
// Lista de logos de clientes que giran en la seccion "Clientes". Para agregar, quitar o cambiar un cliente, edita esta lista (nombre y logo).
const CLIENT_LOGOS = [
  { name: "CEMEX",     logo: clientCemexNew },
  { name: "DEACERO",   logo: clientDeacero },
  { name: "METALSA",   logo: clientMetalsaNew },
  { name: "Whirlpool", logo: clientWhirlpool },
  { name: "Milenium",  logo: clientMilenium },
];

// Lista de marcas distribuidoras que aparecen en la seccion "Distribuidores" (el carrusel de logos que se mueve solo). Para agregar o quitar una marca, edita esta lista (nombre, logo, categoria y leyenda).
const DISTRIBUTORS = [
  { name: "Motorola Solutions", logo: logoMotorola, category: "Radiocomunicación",   bg: "#F0F4FF", tagline: "Distribuidor Certificado" },
  { name: "Kenwood",            logo: logoKenwood,  category: "Radiocomunicación",   bg: "#F0F4FF", tagline: "Distribuidor Autorizado" },
  { name: "Hikvision",         logo: logoHikvision, category: "Videovigilancia",     bg: "#FFF0F0", tagline: "Integrador Certificado" },
  { name: "Hytera",            logo: logoHytera,    category: "Radiocomunicación",   bg: "#F0F4FF", tagline: "Distribuidor Autorizado" },
  { name: "PTTPRO",            logo: logoPttpro,    category: "Radiocomunicación",   bg: "#F0F6FF", tagline: "Distribuidor Oficial" },
  { name: "Hanwha Vision",     logo: logoHanwha,    category: "Videovigilancia",     bg: "#F0FFF4", tagline: "Integrador Certificado" },
  { name: "CAME",              logo: logoCame,      category: "Automatización",      bg: "#FFF8F0", tagline: "Distribuidor Autorizado" },
  { name: "Ranger",            logo: logoRanger,    category: "Seguridad",           bg: "#F4F0FF", tagline: "Distribuidor Oficial" },
  { name: "EPCOM",             logo: logoEpcom,     category: "Videovigilancia",     bg: "#FFF0F5", tagline: "Distribuidor Oficial" },
  { name: "AccessPRO",         logo: logoAccesspro, category: "Control de Acceso",   bg: "#F0FAFF", tagline: "Distribuidor Certificado" },
  { name: "ZKTeco",            logo: logoZkteco,    category: "Control de Acceso",   bg: "#F4F0FF", tagline: "Distribuidor Oficial" },
];


/* ─── HEXAGON SVG PATTERN ─── */
// Aqui se dibujan algunos iconos hechos a mano (como el de WhatsApp) y el patron de hexagonos que se ve de fondo en varias secciones. Parte de diseno, normalmente no hay que tocarla.
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function HexPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,10 185,55 185,145 100,190 15,145 15,55" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.15" />
      <polygon points="100,30 167,67.5 167,132.5 100,170 33,132.5 33,67.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.1" />
      <circle cx="100" cy="10" r="5" fill="currentColor" opacity="0.3" />
      <circle cx="185" cy="55" r="5" fill="currentColor" opacity="0.3" />
      <circle cx="185" cy="145" r="5" fill="currentColor" opacity="0.3" />
      <circle cx="100" cy="190" r="5" fill="currentColor" opacity="0.3" />
      <circle cx="15" cy="145" r="5" fill="currentColor" opacity="0.3" />
      <circle cx="15" cy="55" r="5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
// esta funcion revisa el link de una foto y, si es un link de Google Drive, lo convierte a un formato que si se puede mostrar en el sitio. Parte tecnica, normalmente no hay que tocarla.
/* ─── GOOGLE DRIVE / CONVERSOR DE LINKS DE IMAGENES ─── */
function resolveProductImage(val?: string): string | undefined {
  if (!val) return undefined;
  if (val.startsWith("http://") || val.startsWith("https://")) {
    const driveMatch = val.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
    const driveOpen = val.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (driveOpen) return `https://lh3.googleusercontent.com/d/${driveOpen[1]}`;
    return val;
  }
  return PRODUCT_IMG[val] ?? undefined;
}
// Este bloque dibuja la foto de un producto dentro de su tarjeta, con flechas para pasar entre varias fotos si el producto tiene mas de una. Parte tecnica, normalmente no hay que tocarla.
/* ─── GALERIA DE PRODUCTOS ─── */
function ProductImage({ name, imagen, imagenesExtra = [] }: { name: string; imagen?: string; imagenesExtra?: string[] }) {
  const allImages = [imagen, ...imagenesExtra].filter(Boolean) as string[];
  const resolved = allImages.map(resolveProductImage).filter(Boolean) as string[];
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const current = resolved[idx];
  const total = resolved.length;

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + total) % total); setFailed(false); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % total); setFailed(false); };

  return (
    <div className="relative bg-muted h-44 flex items-center justify-center overflow-hidden">
      {current && !failed ? (
        <img
          key={idx}
          src={current}
          alt={name}
          className="w-full h-full object-contain p-3 transition-opacity duration-200"
          onError={() => setFailed(true)}
        />
      ) : (
        <ImageWithFallback src={isotipo} alt={name} className="w-20 h-20 object-contain opacity-20" />
      )}

      {/* Las flechas de izquierda y derecha y los puntitos de abajo solo aparecen cuando el producto tiene mas de una foto. */}
      {total > 1 && (
        <>
          <button onClick={prev} className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow text-foreground/60 hover:text-foreground transition-colors z-10">
            <ChevronLeft size={14} />
          </button>
          <button onClick={next} className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow text-foreground/60 hover:text-foreground transition-colors z-10">
            <ChevronRight size={14} />
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {resolved.map((_, i) => (
              <button key={`img-dot-${i}`} onClick={(e) => { e.stopPropagation(); setIdx(i); setFailed(false); }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "bg-accent" : "bg-foreground/20"}`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}
// Aqui abajo se dibujan los iconos que se mueven/animan en la seccion "Servicios" (radio, camara, escudo, wifi, llave y engranaje). Parte tecnica de diseño, normalmente no hay que tocarla.
/* ─── ICONOS ANIMADOS DE SERVICIOS ─── */
// Cada una de las funciones "SvcIcon..." de aqui abajo dibuja uno de los iconos animados de la seccion Servicios. Son dibujos hechos con codigo; no hace falta tocarlos.
function SvcIconRadio() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="10" />
      <rect x="2" y="10" width="20" height="10" rx="2" />
      <circle cx="8.5" cy="15" r="1.5" fill="currentColor" />
      <line x1="13.5" y1="13" x2="18" y2="13" />
      <line x1="13.5" y1="17" x2="18" y2="17" />
      <path className="svc-radio-a1" d="M9 6 a4.5 4.5 0 0 1 6 0" />
      <path className="svc-radio-a2" d="M6 3.5 a8.5 8.5 0 0 1 12 0" />
    </svg>
  );
}
function SvcIconCamera() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svc-anim-camera">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" className="svc-camera-lens" />
      <circle cx="12" cy="13" r="1" fill="currentColor" className="svc-camera-pupil" />
    </svg>
  );
}
function SvcIconShield() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path className="svc-shield-bg" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" className="svc-shield-check" />
    </svg>
  );
}
function SvcIconWifi() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path className="svc-wifi-a1" d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <path className="svc-wifi-a2" d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path className="svc-wifi-a3" d="M1.42 9a16 16 0 0 1 21.16 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}
function SvcIconWrench() {
  return <Wrench size={32} className="svc-anim-wiggle" />;
}
function SvcIconGear() {
  return <Settings size={32} className="svc-anim-spin" />;
}
// Este es el "molde" del titulo y subtitulo centrado que se repite arriba de varias secciones del sitio (Catalogo, Clientes, etc). No es una seccion en si, es una pieza que otras secciones reutilizan.
/* ─── ENCABEZADO DE SECCION ─── */
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
// De aqui hacia abajo esta TODO el sitio web (una sola pieza gigante). Primero estan los datos y la logica (como el carrito de compras y los formularios), y mas abajo esta el diseño visual dividido por secciones: Barra superior, Inicio, Servicios, Catalogo, Distribuidores, Nosotros, Clientes, Afiliados, Contacto y Pie de pagina. Busca el nombre de la seccion que quieras cambiar con Cmd/Ctrl+F.

/* ─── COMPONENTE PRINCIPAL ─── */
export default function App() {
  const [productos, setProductos] = useState<Product[]>(PRODUCTS);
  const [accesorios, setAccesorios] = useState<Accesorio[]>([]);
  useEffect(() => {
// URL del Google Apps Script conectado al Sheet de PRODUCTOS (trae el catalogo en vivo). Si se vuelve a publicar el Apps Script, actualiza esta URL.
    fetch("https://script.google.com/macros/s/AKfycbycg-QZ-dXtni1YfPDvXF2p-RFXw2VpLNwkLAef2xgI7HFvF47_NBRZjcanmZGg_QyHRw/exec")
      .then(r => r.json())
      .then(data => {
        setProductos(data.map((p: any) => ({
          id: p.id,
          name: p.nombre,
          model: p.modelo,
          category: p.categoria,
          brand: p.marca,
          description: p.descripcion,
          specs: splitCsv(p.specs),
          imagen: p.imagen,
          imagenesExtra: splitCsv(p.imagenes_extra),
          ficha_pdf: p.ficha_pdf,
          accesorios: splitCsv(p.accesorios),
        })));
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
// Misma fuente, pero trae los ACCESORIOS (parametro ?tipo=accesorios). Si cambia la URL del Apps Script, actualizala tambien aqui.
    fetch("https://script.google.com/macros/s/AKfycbycg-QZ-dXtni1YfPDvXF2p-RFXw2VpLNwkLAef2xgI7HFvF47_NBRZjcanmZGg_QyHRw/exec?tipo=accesorios")
      .then(r => r.json())
      .then(data => {
        setAccesorios((data as any[]).map((a: any) => ({
          id: a.id,
          nombre: a.nombre,
          categoria: a.categoria || "Accesorios",
          marca: a.marca,
          descripcion: a.descripcion,
          imagen: a.imagen,
          compatibleCon: (a.compatibleCon || []).map((x: any) => String(x).trim()).filter(Boolean),
        })));
      })
      .catch(() => {});
  }, []);
  // Arma la lista de categorias del filtro. Si dos productos traen la misma
  // categoria escrita distinto ("CCTV" y "cctv"), aparece una sola vez.
  const CATEGORIES = useMemo(() => {
    const vistas = new Map<string, string>();
    productos.forEach((p) => {
      const clave = norm(p.category);
      if (clave && !vistas.has(clave)) vistas.set(clave, (p.category ?? "").trim());
    });
    const radios = ["radios portatiles", "radios moviles", "radiocomunicacion"];
    const otras = [...vistas.entries()].filter(([clave]) => !radios.includes(clave)).map(([, texto]) => texto);
    return ["Todos", "Radiocomunicación", ...otras, "Accesorios"];
  }, [productos]);

  // Igual para las marcas: "MOTOROLA" y "Motorola" cuentan como una sola.
  const BRANDS = useMemo(() => {
    const vistas = new Map<string, string>();
    productos.forEach((p) => {
      const clave = norm(p.brand);
      if (clave && !vistas.has(clave)) vistas.set(clave, (p.brand ?? "").trim());
    });
    return ["Todas", ...[...vistas.values()].sort((a, b) => a.localeCompare(b))];
  }, [productos]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("inicio");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [accImgModal, setAccImgModal] = useState<string | null>(null)
  const [activeBrand, setActiveBrand] = useState("");
  const [expandedAccesorios, setExpandedAccesorios] = useState<Record<string, boolean>>({});
  const toggleAccesorios = (id: string) => (e: React.MouseEvent) => { e.stopPropagation(); setExpandedAccesorios((prev) => ({ ...prev, [id]: !prev[id] })); };
  const distCarouselRef = useRef(null)
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "", telefono: "", servicio: "", mensaje: "" });
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
    const [formError, setFormError] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [showPrivacy, setShowPrivacy] = useState(false);
  // Controla si esta abierta la ventana de Terminos y Condiciones.
  const [showTerms, setShowTerms] = useState(false);
// De aqui hacia abajo esta toda la logica del carrito de cotizacion (agregar productos, quitar, cambiar cantidad, y enviar la solicitud por correo con EmailJS).
  // ── CARRITO ──
  // ── CARRITO: que guarda ──
  // Cada renglon del carrito guarda dos cosas: que producto es y cuantas piezas se pidieron.
  interface CartItem { product: Product; qty: number }
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartSent, setCartSent] = useState(false);
  const [cartSending, setCartSending] = useState(false);
  const [cartError, setCartError] = useState(false);
  const [cartForm, setCartForm] = useState({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" });
  const [flyDots, setFlyDots] = useState<{ id: number; x: number; y: number; variant: number }[]>([]);
  const [cartBounce, setCartBounce] = useState(false);

  // Agrega un producto al carrito. Si ese producto ya estaba, en vez de repetirlo solo le suma 1 a la cantidad. Ademas lanza la animacion de la particula que vuela al carrito.
  const addToCart = (p: Product, e?: React.MouseEvent<HTMLButtonElement>) => {
    setCart(prev => {
      const exists = prev.find(i => i.product.id === p.id);
      return exists ? prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { product: p, qty: 1 }];
    });
    if (e) {
      const r = e.currentTarget.getBoundingClientRect();
      const ox = r.left + r.width / 2;
      const oy = r.top + r.height / 2;
      const now = Date.now();
      const newDots = [0, 1, 2, 3].map(v => ({ id: now + v, x: ox, y: oy, variant: v }));
      setFlyDots(prev => [...prev, ...newDots]);
      setTimeout(() => {
        setFlyDots(prev => prev.filter(f => !newDots.some(d => d.id === f.id)));
        setCartBounce(true);
        setTimeout(() => setCartBounce(false), 500);
      }, 900);
    }
  };
// Traduce un accesorio al mismo formato que un producto, para que el carrito pueda manejar los dos por igual.
const accesorioToProduct = (a: Accesorio): Product => ({
    id: 900000 + a.id,
    name: a.nombre,
    model: "",
    category: "Accesorios",
    brand: a.marca,
    description: a.descripcion,
    specs: [],
    imagen: a.imagen,
  });
  // Quitar un renglon del carrito, y subir o bajar la cantidad (nunca baja de 1).
  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.product.id !== id));
  const updateQty = (id: number, delta: number) => setCart(prev =>
    prev.map(i => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  );
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // Lo que pasa al apretar "Enviar solicitud" en el carrito: arma la lista de productos pedidos, junta los datos que escribio el cliente y lo manda todo por correo.
  const handleCartSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCartSending(true);
    setCartError(false);
    // Arma la lista de productos en texto, un renglon por producto, tal como se vera en el correo.
    const productList = cart.map(({ product: p, qty }) =>
      `• [x${qty}] ${p.brand} ${p.name} — Modelo: ${p.model}`
    ).join("\n");
    const templateParams = {
      // IMPORTANTE: este es el correo que RECIBE las solicitudes. Para que le lleguen a otra persona, cambia la direccion de la linea de abajo (y hazlo tambien en el otro lugar donde aparece to_email, mas adelante en este archivo).
      to_email: "nora.mancilla@prosesaingenieria.com",
      from_name: cartForm.nombre,
      empresa: cartForm.empresa,
      reply_to: cartForm.email,
      telefono: cartForm.telefono || "No proporcionado",
      mensaje: cartForm.mensaje || "Sin notas adicionales",
      productos: productList,
      total_items: cartCount,
    };
    // Envia el correo del carrito de cotizacion con EmailJS. Usa las 3 claves configuradas hasta arriba de este archivo (busca CONFIGURACION DE CORREO).
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: templateParams,
        }),
      });
      if (!res.ok) throw new Error("EmailJS error");
      setCartSent(true);
    } catch {
      setCartError(true);
    } finally {
      setCartSending(false);
    }
  };

  useEffect(() => {
    // Hace que las frases de clientes cambien solas cada cierto tiempo.
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const [catalogPage, setCatalogPage] = useState(0);
  const PRODUCTS_PER_PAGE = 8;

  // Marcas invisibles que senalan donde empieza cada seccion, para que los botones del menu sepan a donde bajar.
  const sectionRefs: Record<Section, React.RefObject<HTMLElement | null>> = {
    inicio: useRef(null),
    servicios: useRef(null),
    catalogo: useRef(null),
    distribuidores: useRef(null),
    nosotros: useRef(null),
    clientes: useRef(null),

    contacto: useRef(null),
  };

  useEffect(() => {
    // Detecta hacia donde va bajando el visitante: pinta de otro color la barra de arriba al bajar y resalta en el menu la seccion en la que va.
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const entries = Object.entries(sectionRefs) as [Section, React.RefObject<HTMLElement | null>][];
      for (const [id, ref] of [...entries].reverse()) {
        if (ref.current && window.scrollY >= ref.current.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])
  useEffect(() => {
    // Hace que el carrusel de logos de distribuidores avance solo.
    const el = distCarouselRef.current
    if (!el) return
    const advance = () => {
      const card = el.firstElementChild
      if (!card) return
      const step = card.offsetWidth + 16
      const half = el.scrollWidth / 2
      const next = el.scrollLeft + step
      if (next >= half) {
        el.scrollTo({ left: 0, behavior: 'auto' })
      } else {
        el.scrollTo({ left: next, behavior: 'smooth' })
      }
    }
    const id = setInterval(advance, 3500)
    return () => clearInterval(id)
  }, []);

  const scrollTo = (section: Section) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Aqui se decide que productos se muestran segun el buscador y los filtros.
  // Todas las comparaciones pasan por norm(), asi que no importan mayusculas,
  // acentos ni espacios de sobra en el Google Sheet.
  const filteredProducts = productos.filter((p) => {
    const cat = norm(p.category);
    const matchCat =
      activeCategory === "Todos" ||
      (norm(activeCategory) === "radiocomunicacion"
        ? cat === "radios portatiles" || cat === "radios moviles" || cat === "radiocomunicacion"
        : cat === norm(activeCategory));
    const q = norm(searchQuery);
    const matchSearch = q === "" || norm(p.name).includes(q) || norm(p.model).includes(q) || norm(p.brand).includes(q);
    const matchBrand = activeBrand === "" || norm(p.brand) === norm(activeBrand);
    return matchCat && matchSearch && matchBrand;
  });

// Lo mismo para los accesorios: misma tolerancia a mayusculas y acentos.
  const filteredAccesorios = accesorios.filter((a) => {
    const q = norm(searchQuery);
    const matchSearch = q === "" || norm(a.nombre).includes(q) || norm(a.marca).includes(q);
    const matchBrand = activeBrand === "" || norm(a.marca) === norm(activeBrand);
    return matchSearch && matchBrand;
  });
  const productNameById = useMemo(() => Object.fromEntries(productos.map((p) => [String(p.id), p.name])), [productos]);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  // Red de seguridad: si quedamos parados en una pagina que ya no existe (por
  // ejemplo la 3, cuando el filtro solo dejo 1 pagina), en vez de mostrar una
  // lista vacia nos movemos a la ultima pagina valida.
  const safePage = totalPages > 0 ? Math.min(catalogPage, totalPages - 1) : 0;
  const pagedProducts = filteredProducts.slice(safePage * PRODUCTS_PER_PAGE, (safePage + 1) * PRODUCTS_PER_PAGE);

const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormSending(true);
      setFormError(false);
      const templateParams = {
              // IMPORTANTE: este es el correo que RECIBE las solicitudes. Para que le lleguen a otra persona, cambia la direccion de la linea de abajo (y hazlo tambien en el otro lugar donde aparece to_email, mas adelante en este archivo).
              to_email: "nora.mancilla@prosesaingenieria.com",
              from_name: formData.nombre,
              empresa: formData.empresa,
              reply_to: formData.email,
              telefono: formData.telefono || "No proporcionado",
              mensaje: formData.mensaje || "Sin mensaje",
              productos: `Servicio de interés: ${formData.servicio || "No especificado"}`,
              total_items: 0,
      };
// Envia el correo del formulario de Contacto con EmailJS. Usa las 3 claves configuradas hasta arriba de este archivo (busca CONFIGURACION DE CORREO).
  try {
              const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                                    service_id: EMAILJS_SERVICE_ID,
                                    template_id: EMAILJS_TEMPLATE_ID,
                                    user_id: EMAILJS_PUBLIC_KEY,
                                    template_params: templateParams,
                        }),
              });
              if (!res.ok) throw new Error("EmailJS error");
              setFormSent(true);
      } catch {
              setFormError(true);
      } finally {
              setFormSending(false);
      }
};

// Enlaces del menu de navegacion (barra superior). Para agregar, quitar o renombrar una seccion del menu, edita esta lista.
  const NAV_LINKS: { id: Section; label: string }[] = [
    { id: "inicio", label: "Inicio" },
    { id: "servicios", label: "Servicios" },
    { id: "catalogo", label: "Catálogo" },
    { id: "distribuidores", label: "Distribuidores" },
    { id: "nosotros", label: "Nosotros" },
    { id: "clientes", label: "Clientes" },

    { id: "contacto", label: "Contacto" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Esta es la barra de arriba del sitio, la que se ve en todas las paginas (el logo, los botones de menu como Inicio/Servicios/Catalogo, el boton de WhatsApp y el carrito). */}
      {/* ─── BARRA DE NAVEGACION ─── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-gradient-to-b from-black/50 to-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            <button onClick={() => scrollTo("inicio")} className="flex-shrink-0">
              <ImageWithFallback
                src={scrolled ? logoColor : logoWhite}
                alt="PROSESA Ingeniería"
                className="object-contain"
                style={{ width: "300px", height: "100px" }}
              />
            </button>

            {/* Desktop nav */}
            {/* Menu de arriba en computadora: los botones Inicio, Servicios, Catalogo, etc. El texto de cada boton sale de la lista NAV_LINKS. */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-2 text-base font-semibold rounded transition-colors ${
                    activeSection === link.id
                      ? "text-accent"
                      : scrolled
                        ? "text-foreground hover:text-accent"
                        : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Botones de la derecha en computadora: WhatsApp, Cotizar y el icono del carrito con su numerito de piezas. */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="https://wa.me/message/WG4AQ44JG2URJ1" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${scrolled ? "bg-green-600 hover:bg-green-500 text-white" : "bg-white/15 hover:bg-white/25 text-white border border-white/30"}`}>
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
              <button onClick={() => scrollTo("contacto")} className="flex items-center gap-2 bg-accent hover:bg-orange-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-md">
                Cotizar
                <ArrowRight size={14} />
              </button>
              <button onClick={() => setCartOpen(true)} className={`relative flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl transition-colors ${scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"}`}>
                <span className={cartBounce ? "cart-receive" : ""}><ShoppingCart size={18} /></span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
                )}
              </button>
            </div>

            {/* Version para celular: solo el carrito y el boton de menu (las tres rayitas). */}
            <div className="flex items-center gap-2 lg:hidden">
              <button onClick={() => setCartOpen(true)} className={`relative p-2 ${scrolled ? "text-foreground" : "text-white"}`}>
                <ShoppingCart size={22} />
                {cartCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className={`p-2 ${scrolled ? "text-foreground" : "text-white"}`}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button key={`mobile-${link.id}`} onClick={() => scrollTo(link.id)} className="w-full text-left px-4 py-3 text-sm font-semibold text-foreground hover:text-accent hover:bg-muted rounded-xl transition-colors">
                  {link.label}
                </button>
              ))}
              <div className="pt-3 flex gap-2">
                <a href="https://wa.me/message/WG4AQ44JG2URJ1" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-semibold py-2.5 rounded-xl">
                  <WhatsAppIcon size={15} /> WhatsApp
                </a>
                <button onClick={() => scrollTo("contacto")} className="flex-1 flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-2.5 rounded-xl">
                  Cotizar <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Esta es la primera seccion que se ve al entrar al sitio (foto grande de fondo, titulo principal y los botones de "Ver productos" / "Cotizar"). Para cambiar el titulo o el texto de bienvenida, el texto esta unas lineas mas abajo. */}
      {/* ─── PORTADA ─── */}
      <section ref={sectionRefs.inicio as React.RefObject<HTMLElement>} id="inicio" className="relative min-h-[82vh] flex items-center overflow-hidden">
        {/* Foto de fondo a pantalla completa */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroPhoto}
            alt="Equipo PROSESA instalando sistema de seguridad"
            className="w-full h-full object-cover"
          />
          {/* Capa oscura base para mejor legibilidad */}
          <div className="absolute inset-0" style={{ background: "rgba(8,18,36,0.52)" }} />
          {/* Degradado direccional, muy oscuro abajo a la izquierda donde esta el texto, se aclara hacia arriba */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,10,22,0.90) 0%, rgba(10,24,52,0.60) 40%, rgba(10,24,52,0.20) 75%, transparent 100%)" }} />
          {/* Left-side vignette to anchor text column */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(4,10,22,0.55) 0%, transparent 60%)" }} />
          {/* Warm light bloom top-right */}
          <div className="absolute top-0 right-0 w-[600px] h-[400px] opacity-20" style={{ background: "radial-gradient(ellipse at top right, rgba(255,200,120,0.55), transparent 65%)" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-20 sm:pt-24 pb-10 sm:pb-12">
          <div className="max-w-2xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-white/80 text-xs font-semibold tracking-widest uppercase mb-5 border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              Distribuidores Certificados · Monterrey, N.L.
            </span>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4 sm:mb-5 text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Protegemos lo que{" "}
              <span style={{ background: "linear-gradient(175deg, #FFB347 0%, #F07800 35%, #2563EB 72%, #0A2A6E 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>más importa</span>
            </h1>

            <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl">
              Control de acceso y Telecomunicaciones para empresas industriales en México. Más de 20 años de experiencia respaldando operaciones.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button onClick={() => scrollTo("catalogo")} className="inline-flex items-center gap-2 bg-accent hover:bg-orange-500 text-white font-bold px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-orange-900/40 hover:-translate-y-0.5">
                Ver productos <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo("contacto")} className="inline-flex items-center gap-2 bg-white/15 hover:bg-white hover:text-primary backdrop-blur-sm border border-white/60 text-white font-semibold px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl transition-all duration-200">
                Cotizar ahora
              </button>
              <a href="https://wa.me/message/WG4AQ44JG2URJ1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl transition-all">
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Quick-stat strip */}
          <div className="mt-8 flex flex-wrap gap-6 md:gap-10">
            {[
              { value: "20+", label: "Años de experiencia" },
              { value: "500+", label: "Proyectos entregados" },
              { value: "6", label: "Marcas certificadas" },
              { value: "24/7", label: "Soporte técnico" },
            ].map((s, i) => (
              <div key={`hero-stat-${i}`} className="text-white">
                <div className="text-2xl md:text-3xl font-bold font-display" style={{ fontFamily: "'Rajdhani', sans-serif", color: "#F07800" }}>{s.value}</div>
                <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Seccion "Servicios" (los 6 recuadros con icono que explican lo que ofrece la empresa: Radiocomunicacion, Videovigilancia, Control de Acceso, Telecomunicaciones, Mantenimiento e Integracion). Para cambiar un texto o titulo, busca la lista un poco mas abajo donde dice title y desc. */}
      {/* ─── SERVICIOS ─── */}
      <section ref={sectionRefs.servicios as React.RefObject<HTMLElement>} id="servicios" className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-mono text-xs tracking-widest uppercase mb-3">Lo que hacemos</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Todo lo que tu empresa necesita</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">Desde la instalación hasta el soporte técnico, somos tu aliado tecnológico de confianza.</p>
          </div>

          {/* Visual service grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: <SvcIconRadio />,   title: "Radiocomunicación", desc: "Renta y venta de radios portátiles y digitales para trabajo en campo", color: "#1057A0", bg: "#EAF1FB" },
              { icon: <SvcIconCamera />,  title: "Videovigilancia",   desc: "Cámaras IP HD y 4K con monitoreo remoto",             color: "#0F7A55", bg: "#E8F5F0" },
              { icon: <SvcIconShield />,  title: "Control de Acceso", desc: "Biometría, torniquetes y gestión de entradas",         color: "#7C3AED", bg: "#F3EFFE" },
              { icon: <SvcIconWifi />,    title: "Telecomunicaciones",desc: "Redes LAN/WAN, fibra óptica y VoIP",                   color: "#0369A1", bg: "#E0F2FE" },
              { icon: <SvcIconWrench />,  title: "Mantenimiento",     desc: "Soporte técnico certificado 24/7",                    color: "#B45309", bg: "#FEF3C7" },
              { icon: <SvcIconGear />,    title: "Integración",       desc: "Proyectos llave en mano multisolución",               color: "#DC2626", bg: "#FEE2E2" },
            ].map((s, i) => (
              <div key={`service-${i}`} className="group flex flex-col items-start gap-4 p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300" style={{ backgroundColor: s.bg, color: s.color }}>
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual strip with photo */}
          <div className="mt-10 rounded-2xl overflow-hidden relative h-48 md:h-56">
            <img
              src="https://images.unsplash.com/photo-1600823921193-c388313a14a5?w=1400&h=400&fit=crop&auto=format"
              alt="Equipo PROSESA en instalación"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center" style={{ background: "linear-gradient(to right, rgba(10,20,40,0.85) 0%, rgba(10,20,40,0.5) 60%, transparent 100%)" }}>
              <div className="px-8 md:px-12">
                <p className="text-white/80 text-sm font-mono uppercase tracking-widest mb-1">Nuestro equipo en campo</p>
                <p className="text-white text-xl md:text-2xl font-bold max-w-md" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Instalamos y damos soporte donde nos necesites</p>
                <button onClick={() => scrollTo("contacto")} className="mt-4 inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-orange-500 transition-colors">
                  Habla con un especialista <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Seccion "Catalogo" (buscador, filtros por categoria/marca, y las tarjetas de cada producto o accesorio con foto, nombre y boton de "Agregar" al carrito). Los productos y accesorios NO se escriben aqui, vienen automaticamente del Google Sheet (ver el inicio de este archivo). */}
      {/* ─── CATÁLOGO ─── */}
      <section ref={sectionRefs.catalogo as React.RefObject<HTMLElement>} id="catalogo" className="py-10 md:py-16 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #E8F0FA 0%, #F4F7FB 40%, #EBF1F9 100%)" }}>
        {/* Soft accent wash top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none rounded-full" style={{ background: "radial-gradient(circle, rgba(240,120,0,0.06) 0%, transparent 65%)", transform: "translate(30%, -30%)" }} />
        {/* Soft primary wash bottom-left */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none rounded-full" style={{ background: "radial-gradient(circle, rgba(16,87,160,0.08) 0%, transparent 65%)", transform: "translate(-30%, 30%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Equipos y productos" title="Catálogo de Productos" subtitle="Más de 400 equipos de las mejores marcas. Filtra por categoría o busca por nombre y modelo." />

          {/* Search + filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nombre, modelo o marca…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCatalogPage(0); }}
                className="w-full pl-9 pr-4 py-2.5 bg-input-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50"
              />
            </div>
            <select
              value={activeBrand}
              onChange={(e) => { setActiveBrand(e.target.value); setCatalogPage(0); }}
              className="h-9 px-3 bg-input-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50"
            >
              <option value="">Filtrar por marca</option>
              {BRANDS.filter(b => b !== "Todas").map((brand) => (
                <option key={`brand-${brand}`} value={brand}>{brand}</option>
              ))}
            </select>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button key={`cat-${cat}`} onClick={() => { setActiveCategory(cat); setCatalogPage(0); }} className={`px-3 py-2 text-xs font-medium rounded-full border transition-colors ${activeCategory === cat ? "bg-accent border-accent text-white" : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          {activeCategory === "Accesorios" ? (
                filteredAccesorios.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {filteredAccesorios.map((a) => (
                      <div key={`acc-card-${a.id}`} className="product-card group bg-card border border-border rounded-xl overflow-hidden flex flex-col">
                        <div className="relative bg-muted h-44 flex items-center justify-center overflow-hidden">
                          {resolveProductImage(a.imagen) ? (
                            <img src={resolveProductImage(a.imagen)} alt={a.nombre} className="w-full h-full object-contain p-3" />
                          ) : (
                            <ImageWithFallback src={isotipo} alt={a.nombre} className="w-20 h-20 object-contain opacity-20" />
                          )}
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">{a.marca}</span>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">Accesorios</span>
                          </div>
                          <h4 className="font-semibold text-sm text-foreground mb-0.5 leading-snug">{a.nombre}</h4>
                          <p className="text-xs text-muted-foreground mb-2 flex-1">{a.descripcion}</p>
                          {a.compatibleCon.length > 0 && (
                            <p className="text-xs text-muted-foreground mb-2">Compatible con: {a.compatibleCon.map((cid) => productNameById[cid] || cid).join(", ")}</p>
                          )}
                          <div className="flex gap-2 mt-auto">
                            <button onClick={(e) => addToCart(accesorioToProduct(a), e)} className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary py-1.5 rounded-lg transition-all duration-200 font-semibold">
                              <ShoppingCart size={13} />
                              Agregar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-muted-foreground">
                    <Search size={32} className="mx-auto mb-3 opacity-40" />
                    <p>No se encontraron accesorios{searchQuery ? ` para "${searchQuery}"` : ""}</p>
                  </div>
                )
              ) : (
                pagedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pagedProducts.map((p) => (
                <div key={p.id} className="product-card group bg-card border border-border rounded-xl overflow-hidden flex flex-col">
                  {/* Image with zoom + shine */}
                  <div className="product-card-img-wrap relative overflow-hidden bg-muted">
                    <div className="product-card-img-inner">
                      <ProductImage name={p.name} imagen={p.imagen} imagenesExtra={p.imagenesExtra} />
                    </div>
                    {/* Shine sweep */}
                    <div className="product-card-shine" />
                    {/* Brand pill that slides in */}
                    {/* Etiqueta con el nombre de la marca que se ve encima de la foto del producto. */}
                    <div className="product-card-brand-pill absolute top-2 left-2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {p.brand}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">{p.brand}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{p.category}</span>
                    </div>
                    <h4 className="font-semibold text-sm text-foreground mb-0.5 leading-snug">{p.name}</h4>
                    <p className="text-xs text-muted-foreground font-mono mb-2">{p.model}</p>
                    {/* Muestra hasta 3 caracteristicas del producto (las que vienen del Google Sheet). */}
                    <ul className="space-y-1 mb-3 flex-1">
                      {p.specs.slice(0, 3).map((spec, i) => (
                        <li key={`spec-${i}`} className="flex items-start gap-1.5 text-xs text-muted-foreground leading-snug">
                          <span className="text-accent flex-shrink-0 mt-px product-card-dash">—</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                    {p.accesorios && p.accesorios.length > 0 && (
                      <div className="mt-2 mb-2 pt-2 border-t border-border">
                        <p className="text-xs font-medium text-muted-foreground mb-1.5">Accesorios</p>
                        <div className="flex gap-1.5 flex-wrap">
                          {p.accesorios.map((acc, i) => (
                            <img key={`acc-${acc}`} src={PRODUCT_IMG[acc] || ''} alt={`Accesorio ${i + 1}`} onClick={() => setAccImgModal(resolveProductImage(acc) || '')} className="w-10 h-10 object-cover rounded border border-border cursor-zoom-in hover:scale-[2.5] hover:z-50 transition-transform duration-200 relative" />
                          ))}
                        </div>
                      </div>
                    )}
                    {accesorios.filter((a) => a.compatibleCon.includes(String(p.id))).length > 0 && (
                    <div className="mt-2 mb-2 pt-2 border-t border-border">
                      <button type="button" onClick={toggleAccesorios(p.id)} className="flex items-center justify-between w-full text-xs font-medium text-muted-foreground mb-1.5 hover:text-foreground transition-colors">Accesorios compatibles<ChevronRight size={18} className={`transition-transform duration-200 ${expandedAccesorios[p.id] ? "rotate-90" : ""}`} /></button>
                      {expandedAccesorios[p.id] && (
                      <div className="flex flex-col gap-1.5">
                        {accesorios.filter((a) => a.compatibleCon.includes(String(p.id))).map((a) => (
                          <div key={`compat-acc-${a.id}`} className="flex items-center gap-2 p-1.5 -mx-1.5 rounded-md transition-all duration-200 hover:scale-105 hover:bg-accent/10">
                            <img src={resolveProductImage(a.imagen) || ''} alt={a.nombre} onClick={() => setAccImgModal(resolveProductImage(a.imagen) || '')} className="w-10 h-10 object-cover rounded border border-border cursor-zoom-in flex-shrink-0" />
                            <span className="text-sm text-foreground flex-1 leading-tight">{a.nombre}</span>
                            <button onClick={(e) => addToCart(accesorioToProduct(a), e)} className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors flex-shrink-0" title="Agregar al carrito">
                              <Plus size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                      )}
                    </div>
                  )}
                  {/* CTA row — slides up on hover */}
                    <div className="product-card-cta flex gap-2 mt-auto">
                      <button
                        onClick={(e) => addToCart(p, e)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary py-1.5 rounded-lg transition-all duration-200 font-semibold"
                      >
                        <ShoppingCart size={13} />
                        Agregar
                      </button>
                      {p.ficha_pdf && (
                        <a href={p.ficha_pdf} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-7 border border-border hover:border-accent/50 text-muted-foreground hover:text-accent rounded-lg transition-colors"
                          title="Descargar ficha técnica">
                          <Download size={12} />
                        </a>
                      )}
                      {p.accesorios && p.accesorios.length > 0 && (
                        <button onClick={() => setAccImgModal(PRODUCT_IMG[p.accesorios![0]] || '')}
                          className="flex items-center justify-center w-8 h-7 border border-border hover:border-accent/50 text-muted-foreground hover:text-accent rounded-lg transition-colors"
                          title="Ver accesorio en grande">
                          <Tag size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Search size={32} className="mx-auto mb-3 opacity-40" />
              <p>No se encontraron productos para "{searchQuery}"</p>
            </div>
          )
              )}

          {/* Pagination */}
          {activeCategory !== "Accesorios" && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button onClick={() => setCatalogPage(Math.max(0, safePage - 1))} disabled={safePage === 0} className="px-3 py-1.5 text-sm border border-border rounded-xl disabled:opacity-30 hover:border-accent/50 transition-colors">
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={`page-${i}`} onClick={() => setCatalogPage(i)} className={`w-8 h-8 text-sm rounded-full ${safePage === i ? "bg-accent text-white" : "border border-border hover:border-accent/50"} transition-colors`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setCatalogPage(Math.min(totalPages - 1, safePage + 1))} disabled={safePage >= totalPages - 1} className="px-3 py-1.5 text-sm border border-border rounded-xl disabled:opacity-30 hover:border-accent/50 transition-colors">
                Siguiente
              </button>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground mt-6">
            Mostrando {activeCategory === "Accesorios" ? filteredAccesorios.length : pagedProducts.length} de {activeCategory === "Accesorios" ? filteredAccesorios.length : filteredProducts.length} {activeCategory === "Accesorios" ? "accesorios" : "productos"} · <button onClick={() => scrollTo("contacto")} className="text-accent hover:underline">¿No encuentras lo que buscas? Contáctanos</button>
          </p>
        </div>
      </section>
      {/* Seccion con el carrusel de logos de las marcas que la empresa distribuye (Motorola, Kenwood, Hikvision, etc). La lista de marcas se define arriba en este archivo (busca DISTRIBUTORS). */}
      {/* ─── DISTRIBUIDORES ─── */}
      <section ref={sectionRefs.distribuidores as React.RefObject<HTMLElement>} id="distribuidores" className="py-8 md:py-12 bg-white relative overflow-hidden">
        {/* Animated diamond / rhombus grid */}
        <style>{`
          @keyframes diamondDrift0 { 0%,100%{transform:translate(0,0) rotate(45deg)} 50%{transform:translate(6px,-10px) rotate(45deg)} }
          @keyframes diamondDrift1 { 0%,100%{transform:translate(0,0) rotate(45deg)} 50%{transform:translate(-8px,8px) rotate(45deg)} }
          @keyframes diamondDrift2 { 0%,100%{transform:translate(0,0) rotate(45deg)} 50%{transform:translate(4px,12px) rotate(45deg)} }
          .d0{animation:diamondDrift0 9s ease-in-out infinite;}
          .d1{animation:diamondDrift1 11s ease-in-out infinite;}
          .d2{animation:diamondDrift2 7s ease-in-out 1s infinite;}
        `}</style>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* Large diamonds — left */}
          {[
            { x: 70,  y: 80,  s: 52, cls: "d1", stroke: "#1057A0", op: 0.08 },
            { x: 140, y: 200, s: 36, cls: "d0", stroke: "#1057A0", op: 0.06 },
            { x: 40,  y: 240, s: 28, cls: "d2", stroke: "#F07800", op: 0.07 },
            { x: 200, y: 60,  s: 22, cls: "d1", stroke: "#1057A0", op: 0.05 },
          ].map(({ x, y, s, cls, stroke, op }, i) => (
            <rect key={`dl-${i}`} x={x - s/2} y={y - s/2} width={s} height={s}
              fill="none" stroke={stroke} strokeWidth="1.5" opacity={op}
              className={cls} style={{ transformOrigin: `${x}px ${y}px` }}
            />
          ))}
          {/* Large diamonds — right (mirrored) */}
          {[
            { rx: 80,  y: 90,  s: 56, cls: "d0", stroke: "#1057A0", op: 0.07 },
            { rx: 160, y: 210, s: 38, cls: "d2", stroke: "#1057A0", op: 0.06 },
            { rx: 50,  y: 250, s: 30, cls: "d1", stroke: "#F07800", op: 0.07 },
            { rx: 220, y: 55,  s: 20, cls: "d2", stroke: "#1057A0", op: 0.05 },
          ].map(({ rx, y, s, cls, stroke, op }, i) => {
            const vw = 1440;
            const x = vw - rx;
            return (
              <rect key={`dr-${i}`} x={`calc(100% - ${rx + s/2}px)`} y={y - s/2} width={s} height={s}
                fill="none" stroke={stroke} strokeWidth="1.5" opacity={op}
                className={cls} style={{ transformOrigin: `calc(100% - ${rx}px) ${y}px` }}
              />
            );
          })}
        </svg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-accent font-mono text-xs tracking-widest uppercase mb-3">Marcas que representamos</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Trabajamos con los mejores</h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">Distribuidores certificados de las marcas líderes mundiales en seguridad y comunicación.</p>
          </div>

          {/* Infinite marquee — single row */}
          <style>{`
            @keyframes scroll-dist { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            .dist-scroll { animation: scroll-dist 32s linear infinite; }
            .dist-scroll:hover { animation-play-state: paused; }
          `}</style>

          <div className="overflow-hidden mb-10">
            <div className="dist-scroll flex gap-5" style={{ width: "max-content" }}>
              {[...DISTRIBUTORS, ...DISTRIBUTORS].map((d, i) => (
                <div key={`dr-${i}`} className="flex-shrink-0 w-44 h-20 bg-[#F4F7FB] rounded-2xl flex items-center justify-center px-5 border border-border/40 hover:border-primary/30 hover:bg-secondary/60 transition-colors cursor-default">
                  <ImageWithFallback src={d.logo} alt={d.name} className={`max-w-full object-contain ${d.name === "Hytera" ? "max-h-16" : "max-h-10"}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Certification strip */}
          <div className="bg-primary rounded-xl px-8 py-6 flex flex-col sm:flex-row items-center gap-5 text-white">
            <Award size={28} className="text-accent flex-shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <span className="font-semibold text-base">Productos 100% originales</span>
              <span className="text-white/65 text-sm ml-2">con garantía oficial y soporte directo de fabricante</span>
            </div>
            <button onClick={() => scrollTo("contacto")} className="flex-shrink-0 inline-flex items-center gap-2 bg-accent hover:bg-orange-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap">
              Consultar garantía <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
      {/* seccion "Nosotros" (fotos del equipo, texto de quienes somos, numero de anos de experiencia y proyectos, y la fila de "Sectores que atendemos"). Para cambiar el texto de presentacion de la empresa, esta unas lineas mas abajo. */}
      {/* ─── NOSOTROS ─── */}
      <section ref={sectionRefs.nosotros as React.RefObject<HTMLElement>} id="nosotros" className="relative bg-white py-8 md:py-14 overflow-hidden">
        {/* Animated hexagon grid background */}
        <style>{`
          @keyframes hexFloat0 { 0%,100%{transform:translateY(0) rotate(0deg) scale(1)} 50%{transform:translateY(-18px) rotate(8deg) scale(1.06)} }
          @keyframes hexFloat1 { 0%,100%{transform:translateY(0) rotate(0deg) scale(1)} 50%{transform:translateY(-24px) rotate(-6deg) scale(0.96)} }
          @keyframes hexFloat2 { 0%,100%{transform:translateY(0) rotate(0deg) scale(1)} 50%{transform:translateY(-14px) rotate(10deg) scale(1.04)} }
          .hex-anim-0{animation:hexFloat0 7s ease-in-out infinite;}
          .hex-anim-1{animation:hexFloat1 9s ease-in-out infinite;}
          .hex-anim-2{animation:hexFloat2 6s ease-in-out infinite;}
        `}</style>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* Row of hexagons — left side */}
          {[
            { cx: 60,  cy: 120, r: 48, cls: "hex-anim-1", op: 0.07 },
            { cx: 60,  cy: 260, r: 36, cls: "hex-anim-2", op: 0.05 },
            { cx: 160, cy: 60,  r: 30, cls: "hex-anim-0", op: 0.06 },
            { cx: 130, cy: 200, r: 52, cls: "hex-anim-1", op: 0.04 },
            { cx: 240, cy: 140, r: 28, cls: "hex-anim-2", op: 0.05 },
          ].map(({ cx, cy, r, cls, op }, i) => (
            <g key={`hexL-${i}`} className={cls} style={{ transformOrigin: `${cx}px ${cy}px` }}>
              <polygon
                points={Array.from({length:6},(_,k)=>`${cx+r*Math.cos((k*60-30)*Math.PI/180)},${cy+r*Math.sin((k*60-30)*Math.PI/180)}`).join(" ")}
                fill="none" stroke="#1057A0" strokeWidth="1.5" opacity={op}
              />
            </g>
          ))}
          {/* Row of hexagons — right side */}
          {[
            { cx: -90+1300, cy: 80,  r: 55, cls: "hex-anim-0", op: 0.07 },
            { cx: -60+1300, cy: 230, r: 40, cls: "hex-anim-2", op: 0.05 },
            { cx: -200+1300,cy: 150, r: 32, cls: "hex-anim-1", op: 0.06 },
            { cx: -280+1300,cy: 60,  r: 26, cls: "hex-anim-2", op: 0.04 },
            { cx: -160+1300,cy: 290, r: 44, cls: "hex-anim-0", op: 0.05 },
          ].map(({ cx, cy, r, cls, op }, i) => (
            <g key={`hexR-${i}`} className={cls} style={{ transformOrigin: `${cx}px ${cy}px` }}>
              <polygon
                points={Array.from({length:6},(_,k)=>`${cx+r*Math.cos((k*60-30)*Math.PI/180)},${cy+r*Math.sin((k*60-30)*Math.PI/180)}`).join(" ")}
                fill="none" stroke="#F07800" strokeWidth="1.5" opacity={op}
              />
            </g>
          ))}
        </svg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Dentro de "Nosotros": el bloque de dos columnas, con el texto de quienes somos de un lado y las fotos del equipo del otro. */}
          {/* ── Main two-column layout ── */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

            {/* Photos collage */}
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3 h-[280px] sm:h-[360px] lg:h-[420px]">
                <div className="rounded-2xl overflow-hidden">
                  <ImageWithFallback src={teamPhoto2} alt="Técnico en plataforma instalando equipo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="rounded-2xl overflow-hidden flex-1">
                    <ImageWithFallback src={teamPhoto1} alt="Técnico instalando cámara" className="w-full h-full object-cover" />
                  </div>
                  {/* Warm stats tile */}
                  <div className="rounded-2xl bg-primary p-5 flex flex-col justify-center">
                    <div className="text-4xl font-bold text-white font-display mb-0.5" style={{ fontFamily: "'Rajdhani', sans-serif" }}>500+</div>
                    <div className="text-sm text-white/80 font-medium">Proyectos entregados en México</div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 left-6 bg-accent text-white rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
                <div className="text-3xl font-bold font-display leading-none" style={{ fontFamily: "'Rajdhani', sans-serif" }}>20+</div>
                <div className="text-xs font-semibold leading-tight">Años de<br/>experiencia</div>
              </div>
            </div>

            {/* Text content */}
            <div className="order-1 lg:order-2">
              <span className="inline-block text-accent font-mono text-xs tracking-widest uppercase mb-4">Quiénes somos</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Un equipo que pone las manos en el trabajo
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-4">
                Somos <strong className="text-foreground">PROSESA — Protección de Sistemas Electrónicos</strong>, una empresa regiomontana con más de 20 años protegiendo lo que más importa a las empresas: su seguridad, su comunicación y su continuidad operativa.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Instalamos, integramos y damos soporte a sistemas de radiocomunicación, videovigilancia, control de acceso y telecomunicaciones. No mandamos a alguien más — nuestros propios ingenieros certificados van a tu instalación.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: <CheckCircle size={16} />, text: "Ingenieros certificados por fabricante" },
                  { icon: <Globe size={16} />,        text: "Cobertura en toda la república" },
                  { icon: <Factory size={16} />,      text: "Experiencia industrial y hotelera" },
                  { icon: <Truck size={16} />,         text: "Equipo propio de instalación" },
                ].map((item, i) => (
                  <div key={`nosotros-item-${i}`} className="flex items-start gap-2.5 bg-secondary/50 rounded-xl px-3 py-3">
                    <span className="text-primary mt-0.5 flex-shrink-0">{item.icon}</span>
                    <span className="text-sm text-foreground/75 font-medium leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("contacto")} className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Habla con nosotros <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Dentro de "Nosotros": la fila de iconos con los sectores a los que atiende la empresa (industria, construccion, transporte, etc). Para cambiar un sector, edita el texto y el icono de su tarjeta. */}
          {/* ── SECTORES ── */}
          <div className="bg-[#F4F7FB] rounded-2xl px-8 py-10">
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Sectores que atendemos</h3>
              <p className="text-muted-foreground text-sm">Soluciones especializadas para cada industria</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { name: "Construcción",      Icon: Wrench,    bg: "#F97316", light: "#FFF4ED" },
                { name: "Hotelero",          Icon: Star,      bg: "#EAB308", light: "#FFFBEB" },
                { name: "Comercial",         Icon: Tag,       bg: "#22C55E", light: "#F0FDF4" },
                { name: "Institucional",     Icon: Building2, bg: "#3B82F6", light: "#EFF6FF" },
                { name: "Industrial",        Icon: Factory,   bg: "#8B5CF6", light: "#F5F3FF" },
                { name: "Seguridad privada", Icon: Shield,    bg: "#EF4444", light: "#FEF2F2" },
                { name: "Transporte",        Icon: Truck,     bg: "#06B6D4", light: "#ECFEFF" },
              ].map(({ name, Icon, bg, light }, i) => (
                <div
                  key={`sector-${i}`}
                  className="group flex flex-col items-center gap-2.5 bg-white rounded-2xl p-4 cursor-default shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                  style={{ "--sector-bg": bg, "--sector-light": light } as React.CSSProperties}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rounded-2xl group-hover:scale-110"
                    style={{ backgroundColor: light, color: bg }}
                  >
                    <div className="transition-transform duration-300 group-hover:rotate-[-12deg]">
                      <Icon size={22} />
                    </div>
                  </div>
                  <span
                    className="text-xs font-semibold text-center leading-tight transition-colors duration-300 text-foreground/70 group-hover:text-foreground"
                  >{name}</span>
                  {/* Animated underline */}
                  <div
                    className="h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-8"
                    style={{ backgroundColor: bg }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
      {/* seccion "Clientes" (las frases de clientes que van rotando y, mas abajo, el carrusel con los logos de las empresas que confian en PROSESA). Las frases estan al inicio de este archivo (busca TESTIMONIALS) y los logos en CLIENT_LOGOS. */}
      {/* ─── CLIENTES ─── */}
      <section ref={sectionRefs.clientes as React.RefObject<HTMLElement>} id="clientes" className="py-10 md:py-16 bg-[#F4F7FB] relative overflow-hidden">
        {/* Hexagon decorations — visible but subtle on the blue-grey bg */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {[
            { cx: 60,   cy: 80,  r: 55, op: 0.13, cls: "hex-anim-1" },
            { cx: 100,  cy: 240, r: 38, op: 0.10, cls: "hex-anim-2" },
            { cx: 220,  cy: 130, r: 28, op: 0.08, cls: "hex-anim-0" },
            { cx: -30,  cy: 380, r: 45, op: 0.09, cls: "hex-anim-2" },
          ].map(({ cx, cy, r, op, cls }, i) => (
            <g key={`chL-${i}`} className={cls} style={{ transformOrigin: `${cx}px ${cy}px` }}>
              <polygon
                points={Array.from({length:6},(_,k)=>`${cx+r*Math.cos((k*60-30)*Math.PI/180)},${cy+r*Math.sin((k*60-30)*Math.PI/180)}`).join(" ")}
                fill="none" stroke="#1057A0" strokeWidth="2" opacity={op}
              />
            </g>
          ))}
          {[
            { rx: 60,  cy: 70,  r: 60, op: 0.12, cls: "hex-anim-0" },
            { rx: 110, cy: 260, r: 40, op: 0.09, cls: "hex-anim-1" },
            { rx: 230, cy: 140, r: 30, op: 0.08, cls: "hex-anim-2" },
            { rx: 20,  cy: 400, r: 48, op: 0.10, cls: "hex-anim-1" },
          ].map(({ rx, cy, r, op, cls }, i) => {
            const pts = Array.from({length:6},(_,k)=>`calc(100% - ${rx - r*Math.cos((k*60-30)*Math.PI/180)}px),${cy+r*Math.sin((k*60-30)*Math.PI/180)}`).join(" ");
            return (
              <g key={`chR-${i}`} className={cls} style={{ transformOrigin: `calc(100% - ${rx}px) ${cy}px` }}>
                <polygon points={pts} fill="none" stroke="#1057A0" strokeWidth="2" opacity={op} />
              </g>
            );
          })}
        </svg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Lo que dicen nuestros clientes" title="Clientes que confían en PROSESA" subtitle="Empresas líderes de la industria en México que respaldan nuestro trabajo." />

          {/* Testimonial carousel */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative bg-primary rounded-2xl p-8 md:p-10 text-center overflow-hidden">
              {/* Decorative quote mark */}
              <div className="absolute top-5 left-7 text-white/10 font-serif leading-none select-none" style={{ fontSize: "120px", lineHeight: 1 }}>&ldquo;</div>
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={`testimonial-${i}`}
                  style={{ display: i === testimonialIdx ? "block" : "none" }}
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {[1,2,3,4,5].map(s => <Star key={`testimonial-star-${s}`} size={16} className="text-accent fill-accent" />)}
                  </div>
                  <p className="text-white text-lg md:text-xl leading-relaxed font-medium mb-6 relative z-10">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5">
                    <span className="text-accent font-bold text-sm">—</span>
                    <span className="text-white font-semibold text-sm">{t.company}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {TESTIMONIALS.map((_, i) => (
                <button key={`dot-${i}`} onClick={() => setTestimonialIdx(i)}
                  className={`rounded-full transition-all duration-300 ${i === testimonialIdx ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-muted-foreground"}`}
                />
              ))}
            </div>
          </div>

          {/* Client logos carousel */}
          <div className="border-t border-border pt-12">
            <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-mono mb-10">Algunos de nuestros clientes</p>
            <div className="overflow-hidden relative rounded-2xl py-4" >
              <div className="flex animate-marquee gap-16 items-center" style={{ width: 'max-content' }}>
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((c, i) => (
                  <div key={`logo-${i}`} className="flex-shrink-0 flex items-center justify-center" style={{ width: "240px", height: "120px" }}>
                    <ImageWithFallback src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain opacity-100 transition-opacity mix-blend-multiply" style={{ mixBlendMode: "multiply", transform: (c.name === "CEMEX" || c.name === "METALSA") ? "scale(0.55)" : undefined }} />
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button onClick={() => scrollTo("contacto")} className="inline-flex items-center gap-2 bg-accent hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Hablar con un especialista <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* seccion del programa de "Afiliados" (los 3 pasos para recomendar clientes y ganar comision). Para cambiar los textos de los pasos, busca la lista que dice "num", "title" y "desc" un poco mas abajo. */}
      {/* ─── AFILIADOS ─── */}
      <section className="py-12 md:py-20 overflow-hidden relative" style={{ background: "linear-gradient(135deg, #1057A0 0%, #0A3060 60%, #0E1828 100%)" }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(circle, #F07800 0%, transparent 65%)", transform: "translate(-30%, -30%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-15" style={{ background: "radial-gradient(circle, #F07800 0%, transparent 65%)", transform: "translate(30%, 30%)" }} />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10 -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, #4090D0 0%, transparent 60%)" }} />
        {/* Floating dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            {w:8,h:8,top:"10%",left:"8%",op:0.25},
            {w:5,h:5,top:"70%",left:"12%",op:0.2},
            {w:10,h:10,top:"30%",right:"6%",op:0.2},
            {w:6,h:6,top:"80%",right:"15%",op:0.15},
            {w:4,h:4,top:"50%",left:"50%",op:0.12},
          ].map((dot,i) => (
            <div key={`afl-dot-${i}`} className="absolute rounded-full bg-white"
              style={{ width:dot.w, height:dot.h, top:dot.top, left:(dot as any).left, right:(dot as any).right, opacity:dot.op }} />
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-5">
              <Share2 size={13} className="text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Programa de Afiliados</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Recomienda y gana comisiones
            </h2>
            <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
              No necesitas ser especialista. Conoces a alguien que necesite seguridad o comunicación? Preséntanos y gana una comisión cuando cerremos el trato.
            </p>
          </div>

          {/* Steps — horizontal flow */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-12">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-0.5 bg-gradient-to-r from-accent/30 via-accent to-accent/30 z-0" />

            {[
              {
                num: "1",
                emoji: "👋",
                title: "Contáctanos",
                desc: "Escríbenos por WhatsApp o correo. Te registramos como afiliado en menos de 24 horas, sin costo ni requisitos.",
                color: "bg-blue-50 border-blue-200",
                numColor: "bg-primary text-white",
              },
              {
                num: "2",
                emoji: "📣",
                title: "Recomienda",
                desc: "Presenta PROSESA a empresas que necesiten seguridad electrónica, cámaras, radios o control de acceso.",
                color: "bg-orange-50 border-orange-200",
                numColor: "bg-accent text-white",
              },
              {
                num: "3",
                emoji: "💰",
                title: "Cobra tu comisión",
                desc: "Cuando el cliente cierre contrato, tú recibes tu comisión. Así de simple. Sin letra chica.",
                color: "bg-emerald-50 border-emerald-200",
                numColor: "bg-emerald-600 text-white",
              },
            ].map((step, i) => (
              <div key={`afl-step-${i}`} className={`relative z-10 ${step.color} border-2 rounded-3xl p-7 flex flex-col items-center text-center shadow-sm`}>
                <div className={`w-10 h-10 rounded-full ${step.numColor} font-bold text-lg flex items-center justify-center mb-4 shadow-md`} style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {step.num}
                </div>
                <div className="text-4xl mb-3">{step.emoji}</div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => scrollTo("contacto")}
              className="inline-flex items-center gap-2.5 bg-accent hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-base shadow-lg shadow-accent/25"
            >
              <WhatsAppIcon size={18} />
              Quiero ser afiliado
            </button>
            <p className="text-white/50 text-xs mt-3">Sin costo · Sin requisitos · Comisión garantizada</p>
          </div>
        </div>
      </section>
      {/* seccion "Contacto" (el formulario para pedir informacion, el telefono, el correo, el boton de WhatsApp, el mapa y el horario de atencion). El telefono y correo que se muestran aqui estan escritos mas abajo, donde dice "Telefono" y "Correo electronico". */}
      {/* ─── CONTACTO ─── */}
      <section ref={sectionRefs.contacto as React.RefObject<HTMLElement>} id="contacto" className="py-12 md:py-20 bg-[#F4F7FB] relative overflow-hidden">
        {/* Decorative lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {[0,1,2,3,4,5,6].map(i => (
            <line key={`dl-${i}`} x1={-40 + i*60} y1="0" x2={160 + i*60} y2="100%" stroke="#1057A0" strokeWidth="1" opacity="0.05" />
          ))}
          {[0,1,2,3,4,5,6].map(i => (
            <line key={`dr-${i}`} x1={`calc(100% + 40px - ${i*60}px)`} y1="0" x2={`calc(100% - 160px - ${i*60}px)`} y2="100%" stroke="#F07800" strokeWidth="1" opacity="0.04" />
          ))}
          <line x1="0" y1="28%" x2="15%" y2="28%" stroke="#1057A0" strokeWidth="1.5" opacity="0.08" />
          <line x1="0" y1="68%" x2="10%" y2="68%" stroke="#F07800" strokeWidth="1.5" opacity="0.07" />
          <line x1="85%" y1="22%" x2="100%" y2="22%" stroke="#1057A0" strokeWidth="1.5" opacity="0.08" />
          <line x1="90%" y1="72%" x2="100%" y2="72%" stroke="#F07800" strokeWidth="1.5" opacity="0.07" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-mono text-xs tracking-widest uppercase mb-3">Contáctanos</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Hablemos de tu proyecto</h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">Un especialista te contactará en menos de 24 horas con una propuesta personalizada.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-border shadow-sm p-6 md:p-7">
              {/* Si el mensaje ya se envio, en lugar del formulario se muestra la palomita verde de "Mensaje enviado". */}
              {formSent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">¡Mensaje enviado!</h3>
                  <p className="text-muted-foreground text-sm">Un especialista de PROSESA se comunicará contigo en menos de 24 horas hábiles.</p>
                  <button onClick={() => setFormSent(false)} className="mt-6 text-accent hover:underline text-sm">Enviar otro mensaje</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Campos del formulario de contacto: nombre, empresa, correo, telefono y mensaje. Para agregar o quitar un campo hay que cambiarlo aqui Y en la plantilla de EmailJS. */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Nombre completo *</label>
                      <input required type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ing. Juan Pérez" className="w-full px-3 py-2.5 bg-[#F4F7FB] border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Empresa *</label>
                      <input required type="text" value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} placeholder="CEMEX, PEMEX, …" className="w-full px-3 py-2.5 bg-[#F4F7FB] border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Correo electrónico *</label>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="jperez@empresa.com" className="w-full px-3 py-2.5 bg-[#F4F7FB] border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Teléfono</label>
                      <input type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} placeholder="(81) 1234-5678" className="w-full px-3 py-2.5 bg-[#F4F7FB] border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Servicio de interés</label>
                    <select value={formData.servicio} onChange={(e) => setFormData({ ...formData, servicio: e.target.value })} className="w-full px-3 py-2.5 bg-[#F4F7FB] border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20">
                      <option value="">Seleccionar servicio…</option>
                      <option>Renta de radiocomunicación</option>
                      <option>Venta de radiocomunicación</option>
                      <option>CCTV y Videovigilancia</option>
                      <option>Control de Acceso</option>
                      <option>Telecomunicaciones</option>
                      <option>Mantenimiento y Soporte</option>
                      <option>Integración de Sistemas</option>
                      <option>Cotización de productos</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Mensaje *</label>
                    <textarea required rows={4} value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} placeholder="Describe brevemente tu proyecto o necesidad…" className="w-full px-3 py-2.5 bg-[#F4F7FB] border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 resize-none" />
                  </div>
                  {formError && <p className="text-xs text-red-500 text-center bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-2">Hubo un error al enviar. Intenta de nuevo o escribenos por WhatsApp.</p>}
                  <button type="submit" disabled={formSending} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-base disabled:opacity-60">{formSending ? "Enviando..." : "Enviar mensaje"} <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Contact cards */}
              {[
                { icon: <Phone size={18} />, label: "Teléfono", value: "(81) 8334 2330 / (81) 8334 2343", color: "bg-blue-50 border-blue-100", iconColor: "text-primary bg-blue-100" },
                { icon: <Mail size={18} />, label: "Correo electrónico", value: "ventas@prosesaingenieria.com", color: "bg-orange-50 border-orange-100", iconColor: "text-accent bg-orange-100" },
              ].map((item, i) => (
                <div key={`contact-info-${i}`} className={`flex items-start gap-4 ${item.color} border rounded-2xl p-4`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconColor}`}>{item.icon}</div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-sm text-foreground font-medium leading-snug">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a href="https://wa.me/message/WG4AQ44JG2URJ1" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366] hover:bg-green-500 rounded-2xl p-4 transition-colors group">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                  <WhatsAppIcon size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">Chatear por WhatsApp</p>
                  <p className="text-white/80 text-xs">Atención inmediata · Lun–Vie</p>
                </div>
                <ChevronRight size={16} className="text-white/60 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-border flex-1 min-h-[180px]">
                <iframe
                  title="Ubicación PROSESA"
                  width="100%"
                  height="100%"
                  style={{ minHeight: "180px", border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.5!2d-100.2385!3d25.7037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662be8d6b48b3b7%3A0x1!2s3a.+Avenida+1635%2C+Arboledas+de+Nueva+Linda+Vista%2C+67110+Guadalupe%2C+N.L.!5e0!3m2!1ses!2smx!4v1"
                />
              </div>

              {/* Hours */}
              <div className="bg-white border border-border rounded-2xl p-4 text-sm">
                <p className="font-semibold text-foreground mb-1.5">Horario de atención</p>
                <div className="space-y-0.5 text-muted-foreground text-xs">
                  <p>Lunes – Viernes: 8:00 – 18:00 hrs</p>
                  <p>Sábado: 9:00 – 13:00 hrs</p>
                  <p className="text-primary font-medium mt-1">Soporte técnico 24/7 para clientes con contrato</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* pie de pagina del sitio (logo, redes sociales, enlaces del menu, telefono y correo, y el aviso de derechos con el boton de Politica de Privacidad). Aparece igual en todas las secciones porque esta al final del sitio. */}
      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0E1E30] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
            {/* Brand + RRSS centradas debajo del logo */}
            <div className="flex flex-col items-center gap-3">
              <ImageWithFallback src={logoWhite} alt="PROSESA Ingeniería" className="object-contain" style={{ width: "340px", height: "113px" }} />
              <div className="flex justify-center gap-2.5">
                <a href="https://www.facebook.com/profile.php?id=61560702311211" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 hover:bg-blue-600 text-white/60 hover:text-white rounded-full flex items-center justify-center transition-colors"><Facebook size={14} /></a>
                <a href="https://www.instagram.com/prosesa.mx/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 hover:bg-pink-600 text-white/60 hover:text-white rounded-full flex items-center justify-center transition-colors"><Instagram size={14} /></a>
                <a href="https://www.linkedin.com/company/protecciondesistemaselectronicos" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 hover:bg-blue-800 text-white/60 hover:text-white rounded-full flex items-center justify-center transition-colors"><Linkedin size={14} /></a>
              </div>
            </div>
            {/* Nav links */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">Navegación</p>
              {[["Servicios","servicios"],["Catálogo","catalogo"],["Distribuidores","distribuidores"],["Nosotros","nosotros"],["Clientes","clientes"],["Contacto","contacto"]].map(([label, id]) => (
                <button key={`footer-${id}`} onClick={() => scrollTo(id as Section)} className="text-sm text-white/60 hover:text-accent transition-colors">{label}</button>
              ))}
            </div>
            {/* Contact quick */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">Contacto</p>
              {/* Telefono y correo del pie de pagina edita el texto directamente aqui para cambiarlos */}
              <p className="flex items-center gap-1.5 text-sm text-white/60"><Phone size={12} className="text-accent" /> (81) 8334 2330</p>
              <p className="flex items-center gap-1.5 text-sm text-white/60"><Mail size={12} className="text-accent" /> ventas@prosesaingenieria.com</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/35">© 2025 PROSESA · Protección de Sistemas Electrónicos, S.A. de C.V.</p>
            {/* Enlaces legales del pie de pagina. Cada boton abre su ventana. */}
            <div className="flex items-center gap-4">
              <button onClick={() => setShowPrivacy(true)} className="text-xs text-white/35 hover:text-accent transition-colors underline underline-offset-2">Política de Privacidad</button>
              <button onClick={() => setShowTerms(true)} className="text-xs text-white/35 hover:text-accent transition-colors underline underline-offset-2">Términos y Condiciones</button>
            </div>
          </div>
        </div>
      </footer>
      {/* este es el panel del carrito de cotizacion que se abre desde el lado derecho al hacer clic en el icono del carrito (lista de productos elegidos, formulario de datos y boton para enviar la cotizacion). */}
      {/* ─── CART DRAWER ─── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          {/* Panel */}
          <div className="w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-primary text-white">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} />
                <span className="font-display font-bold text-lg" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  Orden de cotización
                </span>
                {cartCount > 0 && <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
              </div>
              <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Package size={32} className="text-muted-foreground" />
                  </div>
                  <p className="font-semibold text-foreground mb-1">Tu carrito esta vacio</p>
                  <p className="text-muted-foreground text-sm mb-6">Agrega productos del catalogo para armar tu cotizacion</p>
                  <button onClick={() => { setCartOpen(false); scrollTo("catalogo"); }} className="bg-primary hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
                    Ver catalogo
                  </button>
                </div>
              ) : cartSent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={36} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Solicitud enviada</h3>
                  <p className="text-muted-foreground text-sm mb-6">Un especialista de PROSESA te contactara en menos de 24 horas con tu cotizacion personalizada.</p>
                  <button onClick={() => { setCartSent(false); setCart([]); setCartOpen(false); setCartForm({ nombre: "", empresa: "", email: "", telefono: "", mensaje: "" }); }}
                    className="text-primary hover:underline text-sm font-medium">Nueva cotizacion</button>
                </div>
              ) : (
                <>
                  {/* Product list */}
                  <div className="px-5 py-4 space-y-3 border-b border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Productos seleccionados</p>
                    {cart.map(({ product: p, qty }) => (
                      <div key={`ci-${p.id}`} className="flex items-start gap-3 bg-[#F4F7FB] rounded-xl p-3">
                        <div className="w-12 h-12 bg-white rounded-lg flex-shrink-0 overflow-hidden border border-border">
                          {p.imagen && resolveProductImage(p.imagen)
                            ? <img src={resolveProductImage(p.imagen)} alt={p.name} className="w-full h-full object-contain p-1" />
                            : <div className="w-full h-full flex items-center justify-center"><Package size={16} className="text-muted-foreground" /></div>
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-accent uppercase tracking-wider">{p.brand}</p>
                          <p className="text-sm font-semibold text-foreground leading-tight truncate">{p.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{p.model}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <button onClick={() => removeFromCart(p.id)} className="text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                          <div className="flex items-center gap-1 bg-white border border-border rounded-lg">
                            <button onClick={() => updateQty(p.id, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded-l-lg transition-colors"><Minus size={11} /></button>
                            <span className="w-6 text-center text-xs font-semibold">{qty}</span>
                            <button onClick={() => updateQty(p.id, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded-r-lg transition-colors"><Plus size={11} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => { setCartOpen(false); scrollTo("catalogo"); }} className="w-full text-center text-xs text-primary hover:underline font-medium mt-1">+ Agregar mas productos</button>
                  </div>

                  {/* Quote form */}
                  {/* Datos que se le piden al cliente dentro del carrito antes de mandar la cotizacion. */}
                  <form onSubmit={handleCartSubmit} className="px-5 py-4 space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Datos para la cotizacion</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Nombre *</label>
                        <input required type="text" value={cartForm.nombre} onChange={e => setCartForm({...cartForm, nombre: e.target.value})} placeholder="Tu nombre" className="w-full px-3 py-2 bg-[#F4F7FB] border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20" />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Empresa *</label>
                        <input required type="text" value={cartForm.empresa} onChange={e => setCartForm({...cartForm, empresa: e.target.value})} placeholder="Tu empresa" className="w-full px-3 py-2 bg-[#F4F7FB] border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Correo *</label>
                      <input required type="email" value={cartForm.email} onChange={e => setCartForm({...cartForm, email: e.target.value})} placeholder="correo@empresa.com" className="w-full px-3 py-2 bg-[#F4F7FB] border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Telefono</label>
                      <input type="tel" value={cartForm.telefono} onChange={e => setCartForm({...cartForm, telefono: e.target.value})} placeholder="(81) 1234-5678" className="w-full px-3 py-2 bg-[#F4F7FB] border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Notas adicionales</label>
                      <textarea rows={3} value={cartForm.mensaje} onChange={e => setCartForm({...cartForm, mensaje: e.target.value})} placeholder="Cantidad estimada, plazo de entrega, instalacion, etc." className="w-full px-3 py-2 bg-[#F4F7FB] border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 resize-none" />
                    </div>
                    {cartError && (
                      <p className="text-xs text-red-500 text-center bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.
                      </p>
                    )}
                    <button type="submit" disabled={cartSending} className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-accent/20">
                      {cartSending ? (
                        <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Enviando…</>
                      ) : (
                        <><Send size={15} /> Solicitar cotización ({cartCount} {cartCount === 1 ? "producto" : "productos"})</>
                      )}
                    </button>
                    <p className="text-center text-xs text-muted-foreground">Sin costo ni compromiso. Respuesta en menos de 24 horas.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ventana emergente que muestra el texto legal de Politica de Privacidad cuando alguien hace clic en ese enlace en el pie de pagina. El texto completo esta escrito aqui abajo. */}
      {/* ─── POLÍTICA DE PRIVACIDAD MODAL ─── */}
      {/* Ventana de Politica de Privacidad. El texto legal completo esta escrito aqui abajo; para cambiarlo, edita los parrafos directamente. */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowPrivacy(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
              <h2 className="font-display text-xl font-bold text-primary" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Política de Privacidad</h2>
              <button onClick={() => setShowPrivacy(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5 text-sm text-foreground leading-relaxed space-y-5">
              <p>PROSESA se compromete a proteger su privacidad. Esta política explica cómo recopilamos, usamos y divulgamos información personal a través de nuestro sitio web <strong>prosesaingenieria.com</strong> y nuestros canales de redes sociales.</p>

              <div>
                <h3 className="font-semibold text-base text-primary mb-2">Definiciones y Términos Clave</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><span className="font-medium text-foreground">Cookie:</span> Pequeña cantidad de datos generados por un sitio web y guardados por su navegador web. Se utiliza para identificar su navegador, proporcionar análisis y recordar información como su idioma o información de inicio de sesión.</li>
                  <li><span className="font-medium text-foreground">Compañía:</span> PROSESA — Protección de Sistemas Electrónicos, S.A. de C.V., ubicada en 3a. Avenida 1635, Arboledas de Nueva Linda Vista, 67110 Guadalupe, N.L.</li>
                  <li><span className="font-medium text-foreground">Plataforma:</span> Sitio web, aplicación web o aplicación digital de acceso público de PROSESA.</li>
                  <li><span className="font-medium text-foreground">Dirección IP:</span> A cada dispositivo conectado a Internet se le asigna un número conocido como dirección de protocolo de Internet (IP). Estos números generalmente se asignan en bloques geográficos.</li>
                  <li><span className="font-medium text-foreground">Datos personales:</span> Cualquier información que, directa o indirectamente, permita identificar a una persona física.</li>
                  <li><span className="font-medium text-foreground">Terceros:</span> Anunciantes, patrocinadores de concursos, socios promocionales y de marketing, y otros.</li>
                  <li><span className="font-medium text-foreground">Sitio web:</span> El sitio de PROSESA accesible en <span className="text-accent">https://www.prosesaingenieria.com/</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base text-primary mb-2">Uso de la Información</h3>
                <p className="text-muted-foreground">La información recopilada se utiliza para los siguientes fines:</p>
                <ul className="mt-2 space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Personalizar la experiencia del usuario.</li>
                  <li>Mejorar la plataforma y nuestros servicios.</li>
                  <li>Mejorar la atención al cliente.</li>
                  <li>Procesar transacciones y solicitudes de cotización.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base text-primary mb-2">Almacenamiento de Datos</h3>
                <p className="text-muted-foreground">Almacenamos todas las conversaciones y los datos personales con proveedores que cumplen con la normativa de protección de datos, durante un máximo de 6 años, a menos que se elimine su cuenta o se solicite su eliminación antes de ese plazo.</p>
              </div>

              <div>
                <h3 className="font-semibold text-base text-primary mb-2">Derechos GDPR y LFPDPPP</h3>
                <p className="text-muted-foreground">En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México) y el Reglamento General de Protección de Datos (GDPR), usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales en cualquier momento.</p>
              </div>

              <div>
                <h3 className="font-semibold text-base text-primary mb-2">Contacto</h3>
                <p className="text-muted-foreground">Para ejercer sus derechos o cualquier consulta sobre privacidad, contáctenos:</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li><span className="font-medium text-foreground">Correo:</span> prosesa@prosesaingenieria.com</li>
                  <li><span className="font-medium text-foreground">Teléfono:</span> (81) 8334 2330 / (81) 8334 2343</li>
                  <li><span className="font-medium text-foreground">Dirección:</span> 3a. Avenida 1635, Arboledas de Nueva Linda Vista, 67110 Guadalupe, N.L.</li>
                </ul>
              </div>

              <p className="text-xs text-muted-foreground border-t border-border pt-4">Última actualización: 2025. PROSESA se reserva el derecho de modificar esta política en cualquier momento. Los cambios serán publicados en esta página.</p>
            </div>
          </div>
        </div>
      )}

        {/* ══════════════════════════════════════════════════════════════
             TERMINOS Y CONDICIONES
             ══════════════════════════════════════════════════════════════
             Ventana que se abre con el enlace "Terminos y Condiciones" del
             pie de pagina. Funciona igual que la de Politica de Privacidad.

             >>> AQUI VA EL TEXTO. Busca mas abajo el letrero que dice
                 PEGA AQUI EL TEXTO y reemplaza ese parrafo por el tuyo.

             Para separar el texto en secciones con titulo, copia este molde
             tantas veces como necesites:

                 <div>
                   <h3 className="font-semibold text-base text-primary mb-2">Titulo de la seccion</h3>
                   <p className="text-muted-foreground">Texto de la seccion.</p>
                 </div>

             Cada parrafo suelto va dentro de <p> ... </p>
          ══════════════════════════════════════════════════════════════ */}
        {showTerms && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowTerms(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                <h2 className="font-display text-xl font-bold text-primary" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Términos y Condiciones</h2>
                <button onClick={() => setShowTerms(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-5 text-sm text-foreground leading-relaxed space-y-5">

                {/* ─────────── PEGA AQUI EL TEXTO ─────────── */}
                <p className="text-muted-foreground">
                 TÉRMINOS Y CONDICIONES DE USO, COMPRA, CONTRATACIÓN Y RENTA
Última actualización: 11 de agosto del 2026
1. IDENTIFICACIÓN DEL PROVEEDOR
Los presentes Términos y Condiciones regulan el acceso, navegación, compra de bienes, contratación de servicios y renta de equipos ofrecidos a través del sitio web www.prosesaingenieria.com (en adelante, el “Sitio”).
El proveedor responsable es:
Razón social: PROTECCIÓN DE SISTEMAS ELECTRONICOS
 Nombre comercial: PROSESA INGENIERIA
 RFC: PSE120330387
 Domicilio: CALLE TERCER AVENIDA 1635, ARBOLEDAS DE NUEVA LINDA VISTA,GUADALUPE, NUEVO LEÓN.
 Teléfono: (81) 8334-2330 / (81) 8334-2343
 Correo electrónico: PROSESA@PROSESAINGENIERIA.COM
 Sitio web: www.prosesaingenieria.com
En adelante, la empresa será denominada como “EL PROVEEDOR”.
La persona que navegue, compre, contrate un servicio o rente equipos a través del Sitio será denominada como “EL CLIENTE” o “EL CONSUMIDOR”, según corresponda.

2. ACEPTACIÓN DE LOS TÉRMINOS Y CONDICIONES
El acceso y uso del Sitio, así como la adquisición de cualquier producto, contratación de servicio o renta de equipo, implica que EL CLIENTE manifiesta haber leído, comprendido y aceptado los presentes Términos y Condiciones.
Cuando la legislación aplicable requiera consentimiento expreso, EL CLIENTE deberá manifestarlo mediante los mecanismos habilitados en el Sitio.
Si EL CLIENTE no está de acuerdo con alguno de estos términos, deberá abstenerse de utilizar el Sitio o contratar los productos y servicios ofrecidos.
EL PROVEEDOR podrá modificar estos Términos y Condiciones cuando resulte necesario. Las modificaciones serán publicadas en el Sitio indicando la fecha de actualización correspondiente.
Las condiciones aplicables a una operación serán las vigentes al momento en que EL CLIENTE realice la compra, contratación o reservación correspondiente, sin perjuicio de los derechos que legalmente correspondan al consumidor.

 
 
 
3. USO DEL SITIO
EL CLIENTE se compromete a utilizar el Sitio de manera lícita y conforme a estos Términos y Condiciones.
Queda prohibido utilizar el Sitio para:
a) Realizar actividades fraudulentas o ilícitas.
b) Intentar obtener acceso no autorizado a sistemas, cuentas o información.
c) Introducir virus, código malicioso o cualquier mecanismo que pueda afectar la operación del Sitio.
d) Utilizar información, imágenes, marcas, textos o materiales del Sitio sin autorización.
e) Realizar compras utilizando información o medios de pago que no pertenezcan legítimamente al usuario.
f) Utilizar los servicios o equipos adquiridos para actividades contrarias a la legislación aplicable.
EL PROVEEDOR podrá suspender o cancelar operaciones cuando existan indicios razonables de fraude, suplantación de identidad, uso indebido de medios de pago o cualquier otra conducta ilícita, sin perjuicio de las obligaciones legales que correspondan.

4. PRODUCTOS Y SERVICIOS
EL PROVEEDOR podrá comercializar, entre otros:
Equipos electrónicos.
Equipos de radiocomunicación.
Accesorios.
Refacciones.
Consumibles.
Servicios técnicos.
Programación o configuración de equipos.
Mantenimiento.
Instalación.
Soporte técnico.
 
 
Servicios de comunicación.
Renta de equipos.
Otros productos o servicios descritos en el Sitio.
Las características, fotografías, especificaciones, disponibilidad y precios de cada producto o servicio serán indicados en la publicación correspondiente.
Las imágenes son ilustrativas cuando así se indique. Las características técnicas de los productos estarán sujetas a las especificaciones del fabricante.

5. PRECIOS
Los precios serán publicados en moneda nacional, salvo que expresamente se indique otra moneda.
El precio total aplicable a la operación deberá ser informado al CLIENTE antes de finalizar la compra, incluyendo los impuestos, cargos y conceptos que correspondan.
Los gastos de envío, instalación, configuración, programación, traslado, maniobras u otros servicios adicionales serán informados antes de confirmar la operación cuando resulten aplicables.
EL PROVEEDOR podrá modificar precios y promociones, pero dichas modificaciones no afectarán operaciones que ya hayan sido confirmadas, salvo los casos permitidos por la legislación aplicable.
En caso de existir un error evidente en el precio publicado que resulte manifiestamente incorrecto, EL PROVEEDOR podrá contactar al CLIENTE para confirmar la operación antes de procesarla, respetando en todo momento los derechos que correspondan conforme a la legislación aplicable.

6. DISPONIBILIDAD DE PRODUCTOS
La publicación de un producto no garantiza necesariamente su disponibilidad inmediata.
En caso de que un producto adquirido no se encuentre disponible, EL PROVEEDOR informará al CLIENTE y, según corresponda, podrá ofrecer:
a) Sustitución por un producto equivalente, previa aceptación del CLIENTE.
b) Reprogramación de la entrega.
c) Cancelación de la operación.
d) Reembolso de las cantidades que legalmente correspondan.
 
 
 
7. PROCESO DE COMPRA
Para adquirir un producto o contratar un servicio, EL CLIENTE deberá:
Seleccionar el producto o servicio.
Proporcionar los datos solicitados.
Seleccionar el método de entrega, cuando corresponda.
Seleccionar el método de pago.
Revisar el resumen de la operación.
Aceptar los presentes Términos y Condiciones.
Confirmar la operación.
La recepción de una confirmación electrónica acredita la recepción de la solicitud, pero no necesariamente implica que la operación haya sido procesada o enviada, salvo que la comunicación indique expresamente lo contrario.

8. MÉTODOS DE PAGO
EL PROVEEDOR podrá aceptar los métodos de pago que se encuentren disponibles en el Sitio.
Entre ellos podrán encontrarse:
Transferencia bancaria.
Depósito bancario.
Plataformas de pago electrónico.
Otros medios expresamente habilitados.
Los pagos estarán sujetos a los procesos de autorización y validación correspondientes.
EL PROVEEDOR no tendrá acceso a información financiera sensible que sea procesada directamente por las instituciones bancarias o plataformas de pago, salvo aquella información que dichas plataformas legítimamente proporcionen para identificar o confirmar una operación.

 
 
 
 
 
9. FACTURACIÓN
EL CLIENTE podrá solicitar factura de las operaciones realizadas, proporcionando los datos fiscales necesarios dentro del plazo establecido por EL PROVEEDOR y conforme a la legislación fiscal aplicable.
Los datos proporcionados para facturación deberán ser correctos y completos.
EL PROVEEDOR no será responsable por errores ocasionados por información fiscal incorrecta proporcionada por EL CLIENTE.

10. ENVÍOS Y ENTREGAS
El envío de los productos estará sujeto a negociación entre  EL CLIENTE  y EL PROVEEDOR durante el proceso de compra.
Los tiempos de entrega son estimados y pueden variar debido a factores externos, incluyendo disponibilidad del producto, empresa transportista, condiciones climáticas, días inhábiles, zonas extendidas o circunstancias de fuerza mayor.
En caso de envio a domicilio expresado por EL CLIENTE , este deberá proporcionar correctamente su domicilio y datos de contacto.
Cuando la entrega requiera firma, identificación o cualquier mecanismo de recepción, EL CLIENTE deberá cumplir con los requisitos correspondientes.
Una vez entregado el paquete, EL CLIENTE deberá revisar, cuando sea posible, el estado exterior del mismo y reportar cualquier anomalía a EL PROVEEDOR.

11. SERVICIOS
La contratación de servicios estará sujeta a las características, alcance, precio, duración y condiciones indicadas en la cotización, orden de servicio, ficha del producto o confirmación correspondiente.
Cuando un servicio requiera información, acceso, instalaciones, permisos o colaboración por parte del CLIENTE, éste deberá proporcionarlos oportunamente.
Las fechas de prestación podrán modificarse cuando existan circunstancias ajenas a EL PROVEEDOR o cuando EL CLIENTE no proporcione oportunamente la información o condiciones necesarias.
 
 
 
 
Cualquier servicio adicional no contemplado originalmente podrá generar un costo adicional, el cual deberá ser informado y, cuando corresponda, autorizado previamente por EL CLIENTE.

12. GARANTÍAS
Los productos que cuenten con garantía estarán sujetos a los términos y condiciones establecidos por el fabricante y/o por EL PROVEEDOR, según corresponda.
La garantía no cubrirá daños ocasionados por:
a) Golpes, caídas o accidentes.
b) Humedad o exposición a líquidos cuando el equipo no esté diseñado para ello.
c) Uso incorrecto.
d) Instalaciones incorrectas.
e) Alteraciones, modificaciones o reparaciones realizadas por personas no autorizadas.
f) Uso de accesorios, baterías, cargadores o componentes incompatibles.
g) Desgaste normal por uso.
h) Daños derivados de voltaje, alimentación eléctrica o condiciones externas fuera de las especificaciones del fabricante.
i) Uso distinto al indicado por el fabricante.
Lo anterior se aplicará sin limitar los derechos que correspondan al consumidor conforme a la legislación aplicable.

13. POLÍTICA DE DEVOLUCIONES, CAMBIOS Y CANCELACIONES
13.1 Solicitud de devolución
EL CLIENTE podrá solicitar una devolución, cancelación o cambio mediante:
Correo: PROSESA@PROSESAINGENIERIA.COM
 Teléfono: 81 8334-2330
 Horario: LUN-VIE DE 8:00 A.M A 5:30 P.M
La solicitud deberá incluir, cuando corresponda:
Nombre del CLIENTE.
Número de pedido.
Producto o servicio contratado.
 
 
Motivo de la solicitud.
Fotografías o evidencia del estado del producto cuando resulte necesario.
Información adicional solicitada por EL PROVEEDOR.
EL PROVEEDOR informará al CLIENTE el procedimiento aplicable.

13.2 Derecho de revocación
Cuando resulte aplicable conforme a la legislación de protección al consumidor, EL CLIENTE podrá ejercer los derechos de revocación o devolución dentro del plazo legal correspondiente.
No serán aplicables las excepciones o limitaciones previstas en esta política cuando contradigan un derecho irrenunciable reconocido al consumidor por la legislación aplicable.

13.3 Productos que pueden ser devueltos
Sin perjuicio de los derechos legales del consumidor, podrán aceptarse devoluciones cuando:
a) El producto haya sido entregado incorrectamente.
b) El producto presente un defecto atribuible al proveedor o fabricante.
c) El producto haya sufrido daños durante el transporte y se determine que corresponde una reclamación.
d) La devolución se encuentre amparada por la garantía.
e) Exista cualquier otro supuesto previsto por la legislación aplicable.
Cuando la devolución corresponda a un supuesto legal o a un defecto atribuible a EL PROVEEDOR, los gastos de devolución serán cubiertos por EL PROVEEDOR cuando así corresponda legalmente.

13.4 Condiciones de devolución
Cuando legalmente proceda una devolución por voluntad del CLIENTE, el producto deberá entregarse, en la medida permitida por la legislación aplicable:
En condiciones razonables.
Con sus accesorios.
Con manuales y documentación.
Con empaque original cuando resulte aplicable.
 
 
Sin modificaciones no autorizadas.
La ausencia de empaque o documentación no podrá utilizarse para restringir derechos que legalmente correspondan al consumidor

13.5 Productos no retornables
Podrán existir productos o servicios que, por su naturaleza, no puedan ser devueltos o que estén sujetos a condiciones especiales.
Entre ellos pueden encontrarse, dependiendo del caso:
Servicios que ya hayan sido completamente prestados.
Productos personalizados o fabricados bajo especificaciones particulares del CLIENTE.
Productos que por su naturaleza no puedan ser devueltos.
Consumibles abiertos o utilizados cuando la legislación permita dicha excepción.
Licencias, activaciones o servicios digitales cuando hayan sido utilizados, en los casos legalmente permitidos.
Otros productos respecto de los cuales exista una excepción legal aplicable.
Las excepciones serán informadas antes de finalizar la compra cuando corresponda.

13.6 Reembolsos
Cuando corresponda realizar un reembolso, éste será procesado conforme al medio de pago utilizado originalmente, salvo que EL CLIENTE autorice expresamente otro mecanismo cuando la legislación permita dicha alternativa.
El tiempo efectivo en que el dinero se refleje en la cuenta del CLIENTE puede depender de la institución bancaria, procesador de pagos o medio utilizado.
No se condicionará indebidamente una devolución legalmente procedente a la aceptación de vales, tarjetas de regalo o créditos internos.

14. CANCELACIÓN DE SERVICIOS
Las condiciones de cancelación de servicios dependerán de la naturaleza del servicio contratado.
 
 
 
 
Cuando un servicio requiera reservación de personal, equipo, transporte, instalaciones o recursos específicos, EL PROVEEDOR podrá establecer cargos de cancelación previamente informados, siempre que sean legalmente procedentes y hayan sido aceptados por EL CLIENTE.
Los derechos legales de cancelación o revocación del consumidor prevalecerán sobre cualquier condición contractual que los limite indebidamente.
 
15. CONDICIONES ESPECIALES PARA RENTA DE EQUIPOS DE RADIOCOMUNICACIÓN
Esta sección será aplicable a la renta temporal de radios portátiles, radios móviles, repetidores, accesorios y demás equipos de radiocomunicación ofrecidos por EL PROVEEDOR.
15.1 Propiedad de los equipos
Todos los equipos entregados en renta continuarán siendo propiedad de EL PROVEEDOR, salvo que exista un contrato escrito que establezca expresamente lo contrario.
La renta únicamente concede al CLIENTE el derecho temporal de uso del equipo durante el periodo contratado.
EL CLIENTE no podrá vender, ceder, subarrendar, empeñar, transferir o entregar los equipos a terceros sin autorización previa y por escrito de EL PROVEEDOR.

15.2 Entrega y recepción
Antes de la entrega, EL PROVEEDOR podrá registrar:
Marca.
Modelo.
Número de serie.
Número de inventario.
Accesorios entregados.
Estado físico.
Estado de funcionamiento.
Nivel o condición de batería.
Otros datos de identificación.




 
 
EL CLIENTE deberá revisar los equipos al recibirlos y reportar cualquier anomalía inmediatamente.
Salvo que se haga constar una observación en el acta o comprobante de entrega, se entenderá que el equipo fue recibido en condiciones aparentes adecuadas de funcionamiento.

15.3 Depósito en garantía
EL PROVEEDOR podrá solicitar un depósito en garantía antes de entregar los equipos.
El monto será informado previamente al CLIENTE.
El depósito podrá utilizarse, cuando legalmente proceda y de acuerdo con las condiciones contratadas, para cubrir:
Daños imputables al CLIENTE.
Pérdida del equipo.
Accesorios faltantes.
Costos de reparación.
Incumplimiento de obligaciones económicas.
Cargos por entrega tardía.
Otros conceptos expresamente establecidos en la orden de renta.
Una vez finalizada la renta, entregados los equipos y verificado su estado, el depósito será devuelto en los términos establecidos en la cotización o contrato de renta.

15.4 Responsabilidad del CLIENTE
Durante el periodo de renta, EL CLIENTE será responsable de custodiar adecuadamente los equipos.
EL CLIENTE deberá:
a) Utilizar los equipos conforme a las instrucciones proporcionadas.
b) Evitar golpes, caídas, humedad y exposición a condiciones que puedan dañarlos.
c) Utilizar únicamente accesorios compatibles y autorizados.
d) No modificar, abrir o reparar los equipos.
e) No retirar etiquetas, números de serie o identificadores.
 
 
f) No cambiar configuraciones técnicas sin autorización.
g) No permitir el uso de los equipos por personas no autorizadas cuando ello represente un riesgo de daño o uso indebido.
h) Devolver los equipos en la fecha acordada.

15.5 Pérdida, robo o daño
En caso de robo, pérdida, destrucción o daño grave de un equipo, EL CLIENTE deberá notificar inmediatamente a EL PROVEEDOR.
Cuando corresponda, EL CLIENTE deberá presentar denuncia o constancia ante las autoridades competentes.
La responsabilidad económica del CLIENTE será determinada considerando el contrato de renta, el estado del equipo, el daño ocasionado y la legislación aplicable.
EL PROVEEDOR podrá cobrar el costo de reparación o reposición cuando el daño, pérdida o destrucción sea imputable al CLIENTE.

15.6 Uso de frecuencias y cumplimiento regulatorio
EL CLIENTE deberá utilizar los equipos únicamente dentro de los parámetros, frecuencias, configuraciones y condiciones autorizadas.
EL CLIENTE no podrá modificar o reprogramar equipos para operar en frecuencias no autorizadas ni utilizar el equipo para interferir deliberadamente otros sistemas de radiocomunicación.
Cuando el servicio contratado involucre frecuencias, concesiones, autorizaciones, constancias de uso, redes o cualquier otro elemento sujeto a regulación, las partes deberán cumplir con las disposiciones aplicables y con las autorizaciones correspondientes.
EL CLIENTE será responsable de proporcionar información veraz sobre el lugar, actividad y finalidad para la que requiere los equipos.
Cuando el uso específico del equipo requiera una autorización, concesión o permiso a nombre del CLIENTE, éste deberá obtenerla y mantenerla vigente.
EL PROVEEDOR podrá solicitar documentación que permita acreditar la legalidad del uso solicitado.
 
 
 
            15.7 Prohibiciones sobre los equipos
Queda prohibido:
Alterar el hardware.
Abrir los equipos.
Modificar potencia, frecuencia u otros parámetros técnicos sin autorización.
Eliminar números de serie.
Instalar software no autorizado.
Utilizar accesorios incompatibles que puedan dañar el equipo.
Utilizar los equipos para interferir comunicaciones.
Utilizar los equipos para actividades ilícitas.
Subarrendar los equipos.
Sacar los equipos del territorio autorizado en el contrato cuando exista dicha restricción.
Entregar los equipos a terceros sin autorización.

15.8 Renta por tiempo adicional
Si EL CLIENTE conserva los equipos después de la fecha y hora acordadas, podrán generarse cargos adicionales conforme a la tarifa de renta vigente o a la tarifa específicamente establecida en el contrato.
La devolución tardía no implicará automáticamente una ampliación gratuita del periodo de renta.

15.9 Fallas durante la renta
Si un equipo presenta una falla no imputable al CLIENTE, EL PROVEEDOR procurará repararlo o sustituirlo por otro equipo equivalente, sujeto a disponibilidad.
Cuando corresponda, EL PROVEEDOR podrá ofrecer una solución alternativa.
No se considerarán fallas imputables al equipo aquellas ocasionadas por golpes, humedad, modificaciones, accesorios incompatibles, uso incorrecto, negligencia o cualquier otra causa atribuible al CLIENTE.
 
 
 
 

16. LIMITACIÓN DE RESPONSABILIDAD
EL PROVEEDOR no será responsable por daños indirectos, pérdida de información, pérdida de ingresos o interrupciones ocasionadas por hechos fuera de su control, salvo cuando dicha responsabilidad sea exigible conforme a la legislación aplicable.
En el caso de servicios de radiocomunicación, EL CLIENTE reconoce que la cobertura y calidad de la comunicación pueden depender de factores como:
Topografía.
Edificaciones.
Interferencia electromagnética.
Condiciones atmosféricas.
Saturación.
Ubicación de los equipos.
Infraestructura utilizada.
Obstáculos físicos.
Disponibilidad de redes o sistemas de terceros.
La contratación de un equipo de radiocomunicación no garantiza cobertura absoluta en cualquier ubicación.
Ninguna disposición de estos Términos y Condiciones tendrá como finalidad excluir o limitar derechos que legalmente sean irrenunciables para el consumidor.

17. PROPIEDAD INTELECTUAL
Todos los contenidos del Sitio, incluyendo textos, fotografías, gráficos, logotipos, diseños, marcas, nombres comerciales, software y elementos visuales, son propiedad de EL PROVEEDOR o de sus respectivos titulares.
Queda prohibida su reproducción, distribución, modificación o utilización comercial sin autorización previa.
Las marcas de terceros pertenecen a sus respectivos propietarios.

 
 
 
 
18. PRIVACIDAD Y DATOS PERSONALES
Los datos personales proporcionados por EL CLIENTE serán tratados conforme al Aviso de Privacidad de EL PROVEEDOR.
El Aviso de Privacidad podrá consultarse en:
el enlace "Política de Privacidad" ubicado en el pie de página de este mismo Sitio
EL CLIENTE deberá consultar dicho documento para conocer las finalidades, mecanismos, derechos y procedimientos relacionados con el tratamiento de sus datos personales.

29. COMUNICACIONES ELECTRÓNICAS
EL CLIENTE acepta que determinadas comunicaciones relacionadas con sus operaciones puedan realizarse por medios electrónicos, incluyendo correo electrónico, mensajes, notificaciones dentro del Sitio u otros medios de contacto proporcionados.
Estas comunicaciones podrán incluir:
Confirmaciones de compra.
Información de envío.
Facturación.
Solicitudes de información.
Confirmaciones de renta.
Avisos relacionados con servicios.
Respuestas a solicitudes de atención.

20. CASOS FORTUITOS Y FUERZA MAYOR
EL PROVEEDOR no será responsable por retrasos o incumplimientos derivados de circunstancias fuera de su control razonable, incluyendo desastres naturales, incendios, inundaciones, fallas generalizadas de telecomunicaciones, interrupciones de suministro, conflictos laborales, actos de autoridad, restricciones gubernamentales, disturbios, guerras, pandemias u otros eventos similares.
EL PROVEEDOR procurará informar al CLIENTE y adoptar medidas razonables para reanudar sus obligaciones.

 
 
 
21. ATENCIÓN A CLIENTES Y RECLAMACIONES
EL CLIENTE podrá presentar dudas, aclaraciones, reclamaciones o solicitudes mediante:
Correo: PROSESA@PROSESAINGENIERIA.COM
 Teléfono: 81 8334-2330
 WhatsApp: 81 2469 6183
 Horario: Lunes a Viernes de 8:00 a 18:00 hrs y Sábados de 9:00 a 13:00 hrs
EL PROVEEDOR procurará atender las solicitudes dentro de un plazo razonable y conforme a la naturaleza del caso.

22. LEGISLACIÓN APLICABLE
Estos Términos y Condiciones se regirán por las leyes aplicables de los Estados Unidos Mexicanos.
En materia de protección al consumidor, se respetarán los derechos reconocidos por la legislación mexicana aplicable.
Cuando corresponda, serán aplicables las disposiciones de la Ley Federal de Protección al Consumidor y demás ordenamientos relacionados con la operación.
En materia de radiocomunicaciones y uso del espectro radioeléctrico, serán aplicables las disposiciones correspondientes y las autorizaciones, concesiones o condiciones regulatorias que resulten procedentes.

23. JURISDICCIÓN Y COMPETENCIA
Para la interpretación y cumplimiento de estos Términos y Condiciones, las partes se sujetarán a las autoridades y procedimientos que resulten competentes conforme a la legislación aplicable.
Nada de lo establecido en esta cláusula pretende limitar el derecho del consumidor a acudir ante las autoridades de protección al consumidor que legalmente resulten competentes.

24. NULIDAD PARCIAL
Si alguna disposición de estos Términos y Condiciones fuera considerada inválida, ilegal o inaplicable, las demás disposiciones permanecerán vigentes.
La disposición afectada deberá interpretarse, en la medida legalmente posible, de manera que conserve su finalidad original sin contravenir la legislación aplicable.
 
 

25. PREVALENCIA DE DERECHOS DEL CONSUMIDOR
Ninguna disposición de estos Términos y Condiciones deberá interpretarse como una renuncia, limitación o eliminación de derechos que sean reconocidos al consumidor por disposiciones legales de carácter obligatorio.
En caso de existir contradicción entre una disposición de estos Términos y Condiciones y una disposición legal imperativa aplicable, prevalecerá la disposición legal correspondiente.

26. VIGENCIA
Los presentes Términos y Condiciones entran en vigor a partir de su publicación en el Sitio y permanecerán vigentes hasta que sean modificados o sustituidos.
Fecha de entrada en vigor: 19 de agosto del 2026
Última actualización: 19 de agosto del 2026

DATOS DE CONTACTO DEL PROVEEDOR
Razón social: PROTECCIÓN DE SISTEMAS ELECTRÓNICOS
 Nombre comercial: PROSESA INGENIERÍA
 RFC: PSE120330387
 Domicilio: CALLE TERCER AVENIDA 1635, ARBOLEDAS DE NUEVA LINDA VISTA,GUADALUPE, NUEVO LEÓN.
 Teléfono: 81 8334-2330
 Correo electrónico: PROSESA@PROSESAINGENIERIA.COM
 Sitio web: www.prosesaingenieria.com
                </p>
                {/* ─────────── FIN DEL TEXTO ─────────── */}

                <p className="text-xs text-muted-foreground border-t border-border pt-4">Última actualización: 2025. PROSESA · Protección de Sistemas Electrónicos, S.A. de C.V.</p>
              </div>
            </div>
          </div>
        )}
      {/* de aqui hasta el final de este archivo estan todos los "efectos visuales" del sitio (animaciones al pasar el mouse, el carrusel, las particulas que vuelan al carrito, etc). Es la parte mas tecnica del archivo: para cambios de diseño avanzados aqui, lo recomendable es pedirle apoyo a un desarrollador. */}
      {/* ─── GLOBAL STYLES ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Rajdhani', sans-serif; }
        .font-mono { font-family: 'DM Mono', monospace; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(240,120,0,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(240,120,0,0.6); }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        .animate-marquee { animation: marquee 18s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }

        /* ── Fly-to-cart particles ── */
        /* Animacion decorativa de la particula que vuela hacia el carrito. */
        @keyframes flyMain {
          0%   { transform: translate(-50%,-50%) scale(1.2) rotate(0deg);   opacity: 1; }
          40%  { transform: translate(calc(-50% + 20px), calc(-50% - 120px)) scale(0.9) rotate(-25deg); opacity: 1; }
          100% { transform: translate(calc(50vw - 44px), calc(-50vh + 22px)) scale(0.15) rotate(-60deg); opacity: 0; }
        }
        @keyframes flyOrb1 {
          0%   { transform: translate(-50%,-50%) scale(1); opacity: 1; }
          30%  { transform: translate(calc(-50% - 40px), calc(-50% - 55px)) scale(0.8); opacity: 0.9; }
          100% { transform: translate(calc(50vw - 50px), calc(-50vh + 20px)) scale(0.1); opacity: 0; }
        }
        @keyframes flyOrb2 {
          0%   { transform: translate(-50%,-50%) scale(1); opacity: 1; }
          35%  { transform: translate(calc(-50% + 55px), calc(-50% - 40px)) scale(0.75); opacity: 0.85; }
          100% { transform: translate(calc(50vw - 46px), calc(-50vh + 22px)) scale(0.1); opacity: 0; }
        }
        @keyframes flyBurst {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          40%  { transform: translate(-50%,-50%) scale(2.8); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(4.5); opacity: 0; }
        }
        @keyframes cartReceive {
          0%   { transform: scale(1); }
          25%  { transform: scale(1.45) rotate(-10deg); }
          55%  { transform: scale(0.88) rotate(6deg); }
          80%  { transform: scale(1.12) rotate(-3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .fly-particle   { position: fixed; z-index: 9999; pointer-events: none; }
        .fly-particle-0 { color: #F07800; animation: flyMain 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .fly-particle-1 { animation: flyOrb1 0.78s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.04s forwards; }
        .fly-particle-2 { animation: flyOrb2 0.78s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.08s forwards; }
        .fly-particle-3 { animation: flyBurst 0.55s ease-out forwards; }
        .fly-orb {
          display: block;
          width: 9px; height: 9px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #FFB347, #F07800);
          box-shadow: 0 0 6px #F0780088;
        }
        .fly-particle-3 .fly-orb {
          width: 22px; height: 22px;
          background: none;
          border: 2.5px solid #F07800;
          box-shadow: none;
          opacity: 0.7;
        }
        .cart-receive { display: inline-block; animation: cartReceive 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards; }

        /* ── Product card hover ── */
        /* Efecto que se aplica a la tarjeta de un producto cuando el visitante pasa el mouse encima (se levanta un poco). */
        .product-card {
          transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.32s ease,
                      border-color 0.2s ease;
          will-change: transform;
        }
        .product-card:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 16px 40px -8px rgba(16,87,160,0.18), 0 4px 12px -4px rgba(240,120,0,0.12);
          border-color: rgba(240,120,0,0.35);
        }

        /* image zoom */
        .product-card-img-inner {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-origin: center;
        }
        .product-card:hover .product-card-img-inner { transform: scale(1.07); }

        /* shine sweep */
        .product-card-shine {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%);
          transform: translateX(-100%);
          transition: transform 0s;
        }
        .product-card:hover .product-card-shine {
          transform: translateX(150%);
          transition: transform 0.55s ease;
        }

        /* brand pill slides in from left */
        .product-card-brand-pill {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.25s ease 0.05s, transform 0.25s ease 0.05s;
        }
        .product-card:hover .product-card-brand-pill {
          opacity: 1;
          transform: translateX(0);
        }

        /* accent dashes animate */
        .product-card-dash {
          display: inline-block;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .product-card:hover .product-card-dash { transform: translateX(3px); }

        /* CTA row subtle lift */
        .product-card-cta {
          transition: transform 0.25s ease;
        }
        .product-card:hover .product-card-cta { transform: translateY(-2px); }

        /* ── Service icon animations ── */
        /* Movimientos de los iconos de la seccion Servicios (giro, parpadeo, ondas de wifi, etc). */
        @keyframes svcSpin     { to { transform: rotate(360deg); } }
        @keyframes svcWiggle   { 0%,100%{ transform: rotate(-20deg); } 50%{ transform: rotate(20deg); } }
        @keyframes svcArcPulse { 0%,100%{ opacity: 0.2; stroke-width: 2; } 50%{ opacity: 1; stroke-width: 2.5; } }
        @keyframes svcCamClick { 0%,100%{ transform: scale(1); } 25%{ transform: scale(0.88); } 60%{ transform: scale(1.06); } }
        @keyframes svcLensPop  { 0%,100%{ transform: scale(1); } 30%{ transform: scale(0.6); } 65%{ transform: scale(1.15); } }
        @keyframes svcShieldIn { 0%{ clip-path: inset(100% 0 0 0); opacity:0; } 100%{ clip-path: inset(0% 0 0 0); opacity:0.18; } }
        @keyframes svcCheckIn  { 0%{ stroke-dashoffset: 20; opacity:0; } 100%{ stroke-dashoffset: 0; opacity:1; } }

        .svc-anim-spin  { transform-origin: center; }
        .svc-anim-wiggle{ transform-origin: center; }

        .group:hover .svc-anim-spin   { animation: svcSpin 1.8s linear infinite; }
        .group:hover .svc-anim-wiggle { animation: svcWiggle 0.35s ease-in-out 5; }
        .group:hover .svc-anim-camera { animation: svcCamClick 0.45s ease-out; }
        .group:hover .svc-camera-lens { animation: svcLensPop  0.45s ease-out; transform-origin: 12px 13px; }
        .group:hover .svc-radio-a1    { animation: svcArcPulse 1s ease-in-out infinite 0s; }
        .group:hover .svc-radio-a2    { animation: svcArcPulse 1s ease-in-out infinite 0.35s; }
        .group:hover .svc-wifi-a1     { animation: svcArcPulse 1s ease-in-out infinite 0s; }
        .group:hover .svc-wifi-a2     { animation: svcArcPulse 1s ease-in-out infinite 0.2s; }
        .group:hover .svc-wifi-a3     { animation: svcArcPulse 1s ease-in-out infinite 0.4s; }

        .svc-shield-bg    { fill: transparent; transition: fill 0.35s ease; }
        .svc-shield-check { stroke-dasharray: 20; stroke-dashoffset: 20; opacity: 0; transition: none; }
        .group:hover .svc-shield-bg    { fill: currentColor; opacity: 0.18; }
        .group:hover .svc-shield-check { animation: svcCheckIn 0.4s ease-out 0.15s forwards; }
      `}</style>

      {/* Efecto visual: cuando alguien agrega un producto al carrito, se ve volar una pequena particula hacia el icono del carrito. Es solo decorativo. */}
      {/* ─── FLY-TO-CART PARTICLES ─── */}
      {flyDots.map(({ id, x, y, variant }) => (
        <div key={id} className={`fly-particle fly-particle-${variant}`} style={{ left: x, top: y }}>
          {variant === 0 ? <ShoppingCart size={18} /> : <span className="fly-orb" />}
        </div>
      ))}

      {accImgModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 backdrop-blur-sm" onClick={() => setAccImgModal(null)}>
          <div className="relative p-4" onClick={e => e.stopPropagation()}>
            <button onClick={() => setAccImgModal(null)} className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-gray-800 flex items-center justify-center font-bold text-xl shadow-lg hover:bg-gray-100 z-10">×</button>
            <img src={accImgModal} alt="Accesorio" className="max-w-[80vw] max-h-[80vh] object-contain rounded-lg shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
