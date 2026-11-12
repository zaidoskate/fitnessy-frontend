# Fitnessy Frontend

Cliente web de la plataforma Fitnessy para el registro, consulta y moderacion comunitaria de marcas deportivas en levantamiento de potencia y calistenia pesada. Esta aplicacion interactua de forma desacoplada con el backend mediante una API RESTful con autenticacion basada en JSON Web Tokens (JWT).

---

## 1. Descripcion General de la Arquitectura

La aplicacion esta desarrollada bajo una arquitectura de Single Page Application (SPA) modular y orientada a componentes:

- **Framework y Bundler:** React 19 estructurado sobre Vite 6.
- **Sistema de Estilos:** Tailwind CSS 3 con tokens tipograficos y de paleta sobria personalizada (Space Grotesk, JetBrains Mono y Material Symbols).
- **Gestion de Estado y Autenticacion:** Context API (`AuthContext`) para control de sesion JWT, persistencia en almacenamiento local y autorizacion condicional por rol (`user` y `admin`).
- **Pruebas Unitarias:** Vitest para validacion de transformaciones, ordenamientos y logica de dominio en utilidades criticas.

---

## 2. Requisitos del Sistema

Para la ejecucion local de este proyecto se requiere contar con las siguientes herramientas instaladas:

- **Node.js:** version 18.18.0 o superior (recomendado LTS v20.x o v22.x).
- **Gestor de paquetes:** npm version 9.x o superior (incluido con Node.js).
- **Servidor Backend:** Instancia en ejecucion de `fitnessy-backend` (por defecto en `http://localhost:5000`).

---

## 3. Instalacion y Configuracion

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/zaidoskate/fitnessy-frontend.git
cd fitnessy-frontend
```

### Paso 2: Instalar dependencias
Ejecute el comando de instalacion de dependencias mediante npm:
```bash
npm install
```

### Paso 3: Configuracion de Variables de Entorno
Cree un archivo `.env` en la raiz del proyecto tomando como plantilla `.env.example`:

En sistemas Unix/macOS:
```bash
cp .env.example .env
```

En Windows (PowerShell):
```powershell
Copy-Item .env.example .env
```

Defina la variable requerida para la comunicacion con la API:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 4. Ejecucion del Proyecto

### Modo de desarrollo
Para iniciar el servidor de desarrollo local con recarga en caliente (HMR):
```bash
npm run dev
```
La aplicacion estara disponible por defecto en:
`http://localhost:5173`

### Compilacion para produccion
Para validar y generar el empaquetado optimizado en el directorio `dist/`:
```bash
npm run build
```

### Vista previa de produccion
Para servir localmente el bundle generado en `dist/`:
```bash
npm run preview
```

### Analisis estatico (Linter)
Para ejecutar la revision de reglas de estilo y sintaxis con ESLint:
```bash
npm run lint
```

---

## 5. Ejecucion de Pruebas Unitarias

La suite de pruebas esta configurada con Vitest y cubre algoritmos de filtrado, ordenamiento de marcas por carga, calculo de coeficientes relativos y formateo de datos:

```bash
npm test
```

Para ejecutar las pruebas en modo de observacion interactivo (watch mode):
```bash
npx vitest
```

---

## 6. Estructura del Proyecto

```text
fitnessy-frontend/
├── public/                 # Recursos estaticos servidos directamente
├── src/
│   ├── assets/             # Activos graficos e iconos vectoriales
│   ├── components/         # Componentes modulares reutilizables de UI
│   │   ├── AuthModal.jsx           # Modal de inicio de sesion y registro
│   │   ├── CategoriesSidebar.jsx   # Barra lateral y gestion de categorias
│   │   ├── CategoryFormModal.jsx   # Modal de creacion/edicion de categorias
│   │   ├── Footer.jsx              # Pie de pagina semantico
│   │   ├── HeroBanner.jsx          # Seccion principal de bienvenida y acciones
│   │   ├── Navbar.jsx              # Barra de navegacion superior
│   │   ├── RecordFormModal.jsx     # Modal de creacion/edicion de records
│   │   ├── RecordsSection.jsx      # Feed paginado con filtros y moderacion
│   │   ├── SplitBanner.jsx         # Metricas del sistema y procedimiento
│   │   └── TopPodium.jsx           # Salon de la fama y podio Top 3
│   ├── context/
│   │   └── AuthContext.jsx # Proveedor de estado global para sesion y JWT
│   ├── services/
│   │   └── api.js          # Capa de consumo HTTP de la API RESTful
│   ├── utils/
│   │   ├── records.js      # Funciones puras de calculo, orden y formateo
│   │   └── records.test.js # Suite de pruebas unitarias con Vitest
│   ├── App.jsx             # Componente raiz y orquestador del dashboard
│   ├── index.css           # Directivas globales de Tailwind CSS y capas base
│   └── main.jsx            # Punto de entrada de la aplicacion React
├── .env.example            # Plantilla de variables de entorno
├── eslint.config.js        # Configuracion de ESLint v9
├── index.html              # Plantilla HTML base con fuentes y metadatos
├── package.json            # Manifiesto de dependencias y scripts de npm
├── postcss.config.js       # Configuracion de PostCSS
├── tailwind.config.js      # Configuracion de tema y paleta oficial
└── vite.config.js          # Configuracion del empaquetador Vite
```

---

## 7. Roles y Funcionalidades del Sistema

1. **Usuario Publico (Sin autenticacion):**
   - Exploracion del feed de levantamientos validados.
   - Filtrado dinamico por disciplina deportiva y busqueda en tiempo real por nombre de atleta o pais.
   - Paginacion reactiva ajustada a la densidad de datos devuelta por la API.
   - Consulta de estadisticas de la comunidad y del podio oficial (Salon de la Fama).

2. **Atleta Autenticado (Rol: `user`):**
   - Registro de nuevas marcas de levantamiento (peso, repeticiones, fecha, categoria), las cuales ingresan al sistema en estatus pendiente de validacion.
   - Edicion y eliminacion exclusiva de sus propios registros deportivos.

3. **Administrador (Rol: `admin`):**
   - Transformacion de la interfaz hacia el panel de control y moderacion.
   - Validacion y aprobacion de envios pendientes para su promocion al Salon de la Fama (`PATCH /api/records/:id/status`).
   - Moderacion integral (edicion y eliminacion) de cualquier record registrado en la plataforma.
   - Administracion completa de disciplinas deportivas (creacion, actualizacion y eliminacion de categorias).
