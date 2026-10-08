# Web de Irene Cuesta: portfolio de marketing digital

> **Para Claude (o quien abra este proyecto por primera vez):** este documento es la fuente de verdad del proyecto. Explica qué es, cómo está construido, qué dirección de diseño sigue, todos los datos reales de Irene y lo que queda pendiente. Léelo entero antes de tocar nada. Al final hay unas **reglas de trabajo** que conviene respetar.

Última actualización: 8 de octubre de 2026.

---

## 1. Qué es este proyecto

Portfolio web personal de **Irene Cuesta Martínez**, especialista en marketing digital (social media, Meta Ads, SEO, contenido, diseño y fotografía). Sustituirá a su web actual en Wix: https://12helloirene.wixsite.com/misitio

- **Tipo:** web estática de **una sola página** con secciones y navegación por anclas.
- **Tecnología:** HTML + CSS + JavaScript sin frameworks ni proceso de compilación. Se abre directamente en el navegador.
- **Idioma:** español como principal. Hay un botón ES/EN que traduce los títulos, menús y textos clave; el resto del contenido sigue en español.
- **Estado:** la plantilla visual está terminada y tiene el contenido real. Faltan las imágenes de los proyectos, los casos de estudio detallados y lo necesario para publicar (ver §9).

### Cómo se llegó aquí (resumen)
1. Se diseñaron 4 plantillas alternativas (`01` a `04`). **Irene eligió la `01-minimal`.**
2. Se le añadió la paleta naranja (principal) + azul (contraste).
3. Se migró todo el contenido de su web de Wix y de su CV.
4. Se aplicaron ideas de un portfolio de Behance que le gustó a Irene ([Amal Krishna – Digital Marketing Portfolio](https://www.behance.net/gallery/251873235/Digital-Marketing-Portfolio-Amal-Krishna-P-V)): portada con foto y cifras, títulos en minúscula con punto naranja, línea de tiempo de experiencia y herramientas agrupadas.

---

## 2. Cómo abrir y ver la web

**Opción rápida:** doble clic en `01-minimal/index.html`.

**Opción recomendada (servidor local)**, desde la carpeta raíz del proyecto:

```bash
python -m http.server 5500
```

Después abre http://localhost:5500/01-minimal/

- Si no hay Python, `npx serve .` hace lo mismo.
- En Claude Code ya existe la configuración `.claude/launch.json` (servidor "plantillas", puerto 5500) para la vista previa.
- **Ojo con la caché:** si al editar CSS o JS no ves los cambios, recarga con **Ctrl+F5**.

---

## 3. Estructura de carpetas

```
Web-irene/
├── README.md                ← este documento
├── CLAUDE.md                ← puntero corto a este README (Claude Code lo lee solo)
├── index.html               ← selector visual de las 4 plantillas (ya no se usa)
├── .claude/launch.json      ← servidor local para la vista previa
│
├── 01-minimal/              ★ LA WEB ELEGIDA: aquí se trabaja
│   ├── index.html           ← toda la página
│   ├── styles.css           ← estilos (tokens de color al principio)
│   ├── script.js            ← tema, idioma, filtros, contadores, formulario…
│   ├── img/
│   │   └── irene-cuesta.png ← foto de la portada (339×419, baja resolución)
│   ├── cv/
│   │   ├── cv.html          ← CV editable (misma identidad visual que la web)
│   │   ├── Irene-Cuesta-CV.pdf ← CV exportado (enlazado desde la web)
│   │   ├── foto-irene.png   ← foto usada en el CV
│   │   └── qr-portfolio.svg ← QR que apunta a la web de Wix (actualizar al publicar)
│   └── ANALISIS-CONTENIDOS.md ← análisis de la web de Wix (histórico, ver nota)
│
├── 02-happy-flower/         ← plantilla descartada (colores vivos)
├── 03-apple/                ← plantilla descartada (estilo Apple)
└── 04-editorial/            ← plantilla descartada (estilo revista) + INSPIRACION.md
```

- Las carpetas `02`, `03` y `04` y el `index.html` de la raíz son **alternativas descartadas**. Se conservan como referencia y se pueden borrar sin afectar a la web.
- `ANALISIS-CONTENIDOS.md` recoge la migración desde Wix. Algunos pendientes que menciona ya están resueltos (ciudad, CV local, experiencia, herramientas): **si hay contradicciones, manda este README.**

---

## 4. Cómo está construida la página (`01-minimal/index.html`)

### Orden de secciones

| # | Sección | `id` | Título visible | Contenido |
|---|---|---|---|---|
| — | Cabecera | `top` | — | Logo "Irene Cuesta®", menú, botón ES/EN, modo claro/oscuro y menú hamburguesa en móvil |
| — | Portada | — | "Irene Cuesta." | Rol + ciudad + hora local, foto con etiquetas flotantes, bienvenida, botones y **barra de 4 cifras** |
| 01 | Trabajos | `trabajos` | trabajos. | 8 proyectos con filtros por categoría |
| 02 | Servicios | `servicios` | lo que hago. | 6 servicios numerados |
| 03 | Sobre mí | `sobre-mi` | sobre mí. | Retrato (provisional), bio, competencias y botón al CV |
| 04 | Experiencia | `experiencia` | experiencia. | Línea de tiempo profesional + formación + idiomas y cursos |
| 05 | Herramientas | `herramientas` | herramientas. | 5 grupos de herramientas |
| 06 | Marcas | — | marcas. | 10 marcas en texto (pendiente de pasar a logotipos) |
| 07 | Contacto | `contacto` | ¿hablamos? | Email grande, LinkedIn, email, CV y formulario |
| — | Pie | — | — | © 2026, LinkedIn, aviso legal, privacidad y volver arriba |

**Menú:** Trabajos · Servicios · Sobre mí · Experiencia · ¿Hablamos?

### Patrón de cabecera de sección
Todas las secciones usan la misma estructura. Respétala al añadir secciones nuevas:

```html
<header class="section-head grid">
  <p class="section-head__label mono reveal">(01)</p>
  <h2 class="section-head__title reveal"><span data-i18n="work.title">trabajos</span><span class="dot">.</span></h2>
  <p class="section-head__desc reveal" data-i18n="work.desc">Frase corta descriptiva.</p>
</header>
```

El punto (o el "?") va **fuera** del `span` traducible para que no desaparezca al cambiar de idioma.

### Funciones de `script.js`

| Función | Cómo se usa en el HTML |
|---|---|
| **Modo claro/oscuro** | Atributo `data-theme` en `<html>`. Sigue al sistema operativo y guarda la elección en `localStorage` (`ic-theme`). Se aplica en el `<head>` antes de pintar para evitar parpadeos. |
| **Idioma ES/EN** | Cualquier elemento con `data-i18n="clave"` cambia su texto. Las traducciones están en el objeto `dict` (`es` / `en`) al principio de `script.js`. Se guarda en `localStorage` (`ic-lang`). |
| **Contadores animados** | `<dd data-count="4000" data-prefix="+" data-suffix="" data-sep=".">`. `data-sep` añade separador de miles. |
| **Filtros de trabajos** | Botones `.chip[data-filter="estrategia"]` filtran los `<li class="work-row" data-category="estrategia">`. Las categorías son `estrategia`, `feed`, `branding` y `foto`. El contador "08 / 08" se actualiza solo. |
| **Vista previa flotante** | En escritorio con ratón, al pasar por un proyecto aparece la imagen de su `data-img` siguiendo al cursor. En móvil y tablet se ve la imagen dentro de la tarjeta. |
| **Animaciones de entrada** | Cualquier elemento con clase `.reveal` aparece al hacer scroll. Se desactivan si el usuario tiene activado "reducir movimiento". |
| **Hora local** | Reloj con la zona horaria `Europe/Madrid` en la portada. |
| **Formulario** | Valida los campos y muestra "¡Gracias! Te respondo pronto." **No envía nada todavía** (ver §9). |

### Responsive (puntos de corte en `styles.css`)
- **≤1024px:** foto y texto de portada apilados, cifras en 2×2, experiencia y formación en una columna, herramientas en 3 columnas.
- **≤760px:** menú hamburguesa, títulos a ancho completo, herramientas en 2 columnas, marcas en 2 columnas.
- **≤600px:** foto de portada a 240px.
- **≤420px:** ajustes finos de tipografía.
- Comprobado sin scroll horizontal a 360, 375, 750, 1366 y 1440px.

---

## 5. Dirección de diseño

### Concepto
**Minimalismo suizo con un acento cálido.** Base en blanco y negro, mucho aire, líneas finas de 1px y una rejilla de 12 columnas. La tipografía es la protagonista. El naranja aporta la personalidad y el azul aparece solo en detalles pequeños.

### Paleta (variables al principio de `styles.css`)

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` / `--bg-2` | `#ffffff` / `#f5f5f5` | `#0a0a0a` / `#141414` | Fondos |
| `--fg` / `--fg-2` | `#111111` / `#3d3d3d` | `#f2f2f2` / `#bdbdbd` | Texto principal y secundario |
| `--muted` | `#8a8a8a` | `#8a8a8a` | Etiquetas y metadatos |
| `--line` / `--line-strong` | `#e8e8e8` / `#d6d6d6` | `#1f1f1f` / `#2e2e2e` | Líneas y bordes |
| **`--accent`** (naranja base) | `#f26419` | `#ff7a33` | Botón principal, filtro activo, punto de los títulos y de "Cuesta.", líneas superiores de las listas, círculo de la foto |
| **`--accent-ink`** (naranja intenso) | `#b8430a` | `#ff9a5c` | Naranja **para texto**: cifras, hovers, datos destacados |
| **`--accent-soft`** (naranja suave) | `#ffe6d6` | `#2a160b` | Fondos y tintes (hover de botones) |
| `--on-accent` | `#111111` | `#0a0a0a` | Texto sobre naranja (negro, **no blanco**) |
| **`--contrast`** (azul) | `#0e70aa` | `#47b5f5` | **Solo detalles pequeños:** numeración (01), fechas, punto de "disponible", hora, foco de teclado, títulos de grupos de herramientas |
| `--contrast-soft` | `#e3f2fb` | `#0b2233` | Hover de etiquetas |

**Reglas de color:**
- Naranja = elementos principales. Azul = complementario del naranja (~202° en el círculo cromático), **solo en elementos pequeños**. Nunca uses azul en bloques grandes.
- Sobre naranja, el texto va **en negro**: el blanco no llega a contraste AA.
- Si necesitas naranja como texto sobre fondo claro, usa `--accent-ink`, no `--accent`.
- Todos los colores deben salir de las variables. No escribas hexadecimales sueltos en el CSS.

### Tipografía (Google Fonts)
- **Inter Tight** (300–700): todo el texto. Los titulares van muy grandes, apretados (`letter-spacing` de -0.05 a -0.065em) y con peso 500–600.
- **JetBrains Mono** (400–500): etiquetas pequeñas en MAYÚSCULAS, numeraciones, fechas y categorías (clase `.mono`).

### Elementos de estilo característicos
- **Títulos de sección en minúscula con punto naranja:** "trabajos.", "lo que hago.", "¿hablamos?". Viene del Behance de referencia y encaja con el tono en minúsculas de Irene.
- **Nombre gigante** "Irene / Cuesta." en la portada, con el punto en naranja.
- **Imágenes en blanco y negro** que pasan a color al pasar el ratón. Mantiene la estética monocroma aunque las imágenes sean de colores.
- **Foto de portada** con un círculo naranja detrás y etiquetas tipo "píldora" flotando alrededor.
- **Línea naranja de 2px** al inicio de cada lista o rejilla (trabajos, servicios, cifras, herramientas, experiencia).
- **Subrayado naranja** en la frase clave de "sobre mí" (`<mark>`).
- **Movimiento sutil:** entradas al hacer scroll, subrayados animados y desplazamientos de 10–14px al pasar el ratón. Curva de animación `cubic-bezier(0.22, 1, 0.36, 1)`.

### Accesibilidad (mantener)
Contraste AA en todos los textos de ambos modos, foco de teclado visible (azul), enlace "Saltar al contenido", HTML semántico, `alt` en todas las imágenes y respeto a "reducir movimiento".

---

## 6. Tono de voz

Así habla Irene en su web original. Hay que mantenerlo:
- **Cercano y con personalidad**, en primera persona: "te doy la bienvenida…", "podríamos hacer muy buen equipo :)".
- **Minúsculas** en títulos y llamadas a la acción cortas ("¿hablamos?", "ver trabajos").
- **Lenguaje inclusivo** cuando toque: "¿trabajamos juntos/as?".
- **Profesional sin ser corporativo:** habla de estrategia y resultados, pero con calidez.
- Frases suyas que conviene conservar: *"el arte de comunicar con mucha personalidad"*, *"maniática de la perfección, la organización y de que todo salga tal y como lo habíamos pensado"*, *"donde la estrategia se fusiona con la creatividad"*, *"lo que más disfruto hacer"*.

---

## 7. Datos de Irene (fuente de verdad)

> Todo lo que aparece aquí sale de su web de Wix o de su CV. **No inventes datos, años, cifras ni herramientas.** Si falta algo, pregúntaselo a Irene.

### Perfil
- **Nombre:** Irene Cuesta Martínez (en la web: "Irene Cuesta").
- **Nacimiento:** 2001, Gijón (Asturias). **Vive en:** Gijón, y trabaja también en remoto.
- **Rol:** especialista en marketing digital: estrategia de social media, campañas de Meta Ads, SEO y marketing de contenidos. Combina creatividad, análisis de datos y optimización de resultados.
- **Objetivo:** crecer en performance marketing y formarse en inteligencia artificial y marketing de contenidos.

### Contacto
- **Email:** irenecuestamartinez@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/irenecuestamartinez/
- **Teléfono:** aparece en el CV (PDF). **No se muestra en la web** salvo que Irene lo pida.

### Cifras destacadas (barra de la portada)
| Cifra | Concepto | Fuente |
|---|---|---|
| +4.000 | Seguidores con redes y Meta Ads | CV (JC Innovación) |
| +40 % | Alcance orgánico gracias al SEO | CV (JC Innovación) |
| 50+ | Cuentas de Meta gestionadas | CV (ElAyudante) |
| 296K+ | Reproducciones en Instagram | Wix (Janel Cuesta) |

Otras cifras disponibles: **+39.000 reproducciones en TikTok** (Janel Cuesta) y **24+ creatividades** para redes (9+3 de Fontcal y 9+3 de Trofeos Sport).

### Experiencia profesional
1. **Responsable de Marketing Digital · JC Innovación · 2024–2026.** Estrategia de marketing digital, redes sociales y Meta Ads (+4.000 seguidores) y SEO (+40 % de alcance orgánico).
2. **Técnica de Marketing · ElAyudante · 2024.** Más de 50 cuentas de Meta con diseño y planificación de contenido, SEO, webs en WordPress y justificaciones del Kit Digital.
3. **Técnica de Marketing y Comunicación · Grupo Pacha · 2022.** Webs en Drupal, difusión de eventos en Resident Advisor, redacción para Diario de Ibiza y Periódico de Ibiza, fotografía y edición en eventos (Solomun, Marco Carola) y proyectos de marketing para la recuperación postpandemia. *(La cifra de 128 M€ del CV es la facturación de la empresa, no un resultado de Irene: no la uses como logro suyo.)*
4. **Community Manager · Grupo Irons · 2022.** Estrategia de redes, edición audiovisual, planificación con el equipo de fotografía y promoción de eventos.

### Formación
- **Doble Grado en Publicidad, Relaciones Públicas y Marketing + Periodismo y Redes Sociales.** Cesine Centro Universitario, Santander, 2019–2024.
- **Erasmus+ · Audencia SciencesCom Programme.** Audencia Business School, Nantes (Francia), agosto–diciembre de 2021.
- **Exchange Promotion Program in Media.** Sejong University, Seúl (Corea del Sur), marzo–junio de 2021.

### Idiomas y cursos
- Español nativo · Inglés B2 (Cambridge First Certificate in English).
- Curso *Facebook & Instagram Ads*, Instituto Marketing, 32 h.

### Herramientas (por grupos)
- **Campañas y analítica:** Meta Ads, Google Analytics, SEO.
- **Email y contenido:** Mailchimp, copywriting de marca.
- **Web:** WordPress, Drupal.
- **Diseño:** Canva, GIMP.
- **Vídeo y audio:** DaVinci Resolve, CapCut, Audacity.

### Competencias
Adaptación y aprendizaje rápido · Pensamiento analítico · Creatividad y storytelling · Comunicación e inteligencia emocional · Atención al detalle · Visión estratégica.

### Proyectos (sección Trabajos)
| # | Proyecto | Categoría | Descripción | Dato clave |
|---|---|---|---|---|
| 01 | **Janel Cuesta** | Estrategia digital | Estrategia digital integral para una empresa del sector metalúrgico con poca presencia digital previa: redes, SEO, email marketing, web corporativa y tienda online. Contenido orgánico y campañas en Meta. | +296.000 reproducciones en Instagram, +39.000 en TikTok. Webs: janelcuesta.com y tienda.janelcuesta.com |
| 02 | **MIMI** | Branding | Identidad visual completa para una marca de bisutería: logotipo, tarjetas informativas y pegatinas. Gestión de Instagram, Facebook y TikTok con una comunidad de chicas interesadas en las joyas. | Logo + RRSS |
| 03 | **Fontcal Fontanería** | Feed y diseño | Darse a conocer en Instagram de forma sencilla y directa, mostrando sus servicios con su imagen de marca. | 9 posts + 3 stories destacadas |
| 04 | **Sainz Fisioterapia** | Feed y diseño | Contenido educativo que da a conocer la trayectoria de la clínica y construye comunidad. | Contenido educativo |
| 05 | **Trofeos Sport** | Feed y diseño | Reorganizar el feed para hacerlo más atractivo y promocionar productos de forma clara y coherente. | 9 posts + 3 stories destacadas |
| 06 | **Audiónica** | Feed y diseño | Reestructurar el feed para mejorar su apariencia y crear una experiencia más atractiva y coherente. | Rediseño de feed |
| 07 | **MIMI · La Esencia** | Fotografía | Fotos para el lanzamiento de la primera colección: destacar la personalidad de la marca e inspirar a su público a ser auténtico. | Lanzamiento |
| 08 | **Yo te lo cuento** | Fotografía | Web de fotografía documental con sus fotos y entrevistas a Daniel Ochoa de Olza y José Colón. | yo-te-lo-cuento.webnode.es |

**Duda abierta:** no está confirmado si **JC Innovación** (su empleo en el CV) y **Janel Cuesta** (proyecto en Wix) son la misma empresa. Ahora aparecen por separado. Si lo son, conviene unificarlos en un único caso fuerte.

### Marcas (sección Marcas)
JC Innovación · ElAyudante · Grupo Pacha · Grupo Irons · Janel Cuesta · MIMI · Fontcal Fontanería · Sainz Fisioterapia · Trofeos Sport · Audiónica.

---

## 8. Cómo hacer los cambios más habituales

**Cambiar la imagen de un proyecto.** En `index.html`, dentro del `<li class="work-row">` del proyecto:
1. Cambia `data-img="…"` (vista previa de escritorio) y el `src` del `<img>` (móvil) por la **misma ruta**, p. ej. `img/trabajos/janel-cuesta.jpg`.
2. Usa formato **4:3** (1200×900 recomendado) y un `alt` descriptivo.

Ahora todas son fotos provisionales de `picsum.photos`.

**Añadir un proyecto.** Copia un `<li class="work-row">` entero y cambia `id`, `data-category` (`estrategia` · `feed` · `branding` · `foto`), número, título, descripción, categoría y dato clave. Después actualiza el "08" del menú (`<sup>`) y el "08 / 08" del contador.

**Añadir una categoría de filtro.** Añade un botón `.chip` con `data-filter="nueva"` y `data-i18n="filter.nueva"`, y su traducción en `dict.es` y `dict.en` de `script.js`.

**Cambiar o añadir un texto traducible.** Ponle `data-i18n="seccion.clave"` y añade la clave en **ambos** idiomas dentro de `dict` en `script.js`.

**Cambiar un color.** Edita solo las variables de `:root` (modo claro) y `[data-theme="dark"]` (modo oscuro) al principio de `styles.css`, y comprueba el contraste AA.

**Cambiar una cifra de la portada.** En `<dl class="kpis">`, modifica `data-count`, `data-prefix`, `data-suffix` y `data-sep`, y también el texto interior (es lo que se ve sin JavaScript).

**Sustituir la foto de la portada.** Reemplaza `img/irene-cuesta.png`. Si cambia la proporción, ajusta `width`/`height` en el HTML y `aspect-ratio` en `.hero__photo img`.

**Actualizar el CV.**
1. Edita `cv/cv.html`, que tiene la misma identidad visual que la web.
2. Expórtalo a PDF, por ejemplo con Chrome → Imprimir → Guardar como PDF (A4, márgenes "Ninguno", con "Gráficos de fondo" activado), o con Chrome sin interfaz:
   ```bash
   chrome --headless --no-pdf-header-footer --print-to-pdf=Irene-Cuesta-CV.pdf cv.html
   ```
3. Guárdalo como `cv/Irene-Cuesta-CV.pdf`, que es el archivo enlazado desde la web.

---

## 9. Pendiente (por prioridad)

**Contenido que debe aportar Irene**
- [ ] Imágenes de los 8 proyectos (4:3, ~1200×900) para sustituir las de picsum.
- [ ] Foto de portada en **mayor resolución** (la actual mide 339×419) y otro retrato para "sobre mí" (4:5, ~900×1125), que ahora es provisional.
- [ ] Confirmar si JC Innovación y Janel Cuesta son la misma empresa.
- [ ] Logotipos de las marcas en monocromo, y confirmar que se pueden mostrar.
- [ ] 1–3 testimonios de clientes.
- [ ] Su Instagram o TikTok profesional, si quiere enlazarlo.

**Siguiente fase de diseño: casos de estudio** (formato inspirado en el Behance de referencia)
- [ ] Páginas o fichas de caso para Janel Cuesta/JC Innovación, MIMI y Yo te lo cuento, con esta estructura:
  1. **Resumen:** qué es la marca, el objetivo y 4 columnas (*Mi rol · Servicios · Plataformas · Resultados clave*).
  2. **Creatividades:** rejilla de posts, stories y reels con sus reproducciones.
  3. **Resultados:** captura del panel de Meta Ads, 4 cifras y una frase de conclusión ("key insight").

  URLs propuestas: `/trabajos/janel-cuesta`, `/trabajos/mimi`, `/trabajos/yo-te-lo-cuento`. Para esto Irene debe aportar capturas de Meta Ads y cifras por campaña (conversaciones, coste por resultado, alcance).
- [ ] Galería de creatividades para los proyectos de feed (Fontcal, Sainz, Trofeos, Audiónica) en lugar de una fila por proyecto.
- [ ] Ahora los enlaces de los proyectos no llevan a ninguna parte (`preventDefault` en `script.js`). Hay que conectarlos cuando existan los casos.

**Antes de publicar**
- [ ] Textos de **Aviso legal** y **Política de privacidad** (RGPD/LSSI). Ahora son enlaces `#`.
- [ ] Conectar el formulario a un servicio real (Formspree, Netlify Forms, etc.). Ahora no envía nada.
- [ ] Dominio propio (p. ej. irenecuesta.com) y, opcionalmente, email profesional.
- [ ] Actualizar el QR del CV (`cv/qr-portfolio.svg`) y su texto en `cv/cv.html`, que ahora apuntan a la web de Wix, para que apunten al nuevo dominio.
- [ ] Publicar la carpeta `01-minimal/` en un hosting estático (Netlify, Vercel, GitHub Pages…). No hay que compilar nada.
- [ ] Opcional: etiquetas Open Graph (imagen para compartir en redes), favicon y analítica.

---

## 10. Reglas de trabajo (para Claude)

1. **Trabaja solo en `01-minimal/`.** Las demás plantillas están descartadas.
2. **No inventes datos.** Ni cifras, ni años, ni herramientas, ni clientes, ni testimonios. Usa solo lo que hay en §7 o lo que aporte Irene. Si falta un dato, pregúntalo o deja un comentario `<!-- pendiente -->`.
3. **Respeta la dirección de diseño** (§5): blanco y negro + naranja principal + azul solo en detalles, colores siempre mediante variables, títulos en minúscula con punto naranja, imágenes en B/N que pasan a color.
4. **Cada texto nuevo visible y relevante necesita traducción** ES/EN en `script.js`.
5. **Mantén la accesibilidad:** contraste AA en ambos modos, `alt` en imágenes, foco visible y "reducir movimiento".
6. **Comprueba siempre** en modo claro y oscuro, y en móvil (360–375px) y escritorio (≥1366px), sin scroll horizontal.
7. **Sin frameworks ni compilación** salvo que Irene lo pida expresamente: la web debe seguir funcionando abriendo `index.html`.
8. **Mantén el tono de voz de Irene** (§6).
9. **Actualiza este README** cuando cambie algo importante: secciones, datos o pendientes.
