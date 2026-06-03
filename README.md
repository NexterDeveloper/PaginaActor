# Aythami Hernandez — Portfolio de Actor

Portfolio profesional de actor construido con **Next.js 14**, **TypeScript**, **Tailwind CSS** y **Supabase**.

## 🚀 Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animaciones)
- **Supabase** (base de datos + storage)
- **bcryptjs** (hash de contraseña admin)
- **jose** (tokens JWT para sesión admin)

## 📁 Estructura

```
├── app/
│   ├── page.tsx               # Página principal (portfolio)
│   ├── admin/
│   │   ├── page.tsx           # Login admin (/admin)
│   │   └── dashboard/         # Panel de control (protegido)
│   └── api/
│       ├── contact/           # API formulario de contacto
│       └── admin/             # API login/logout admin
├── components/
│   ├── sections/              # Secciones de la página
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── AnimatedSection.tsx
├── lib/
│   ├── supabase/              # Clientes Supabase (server/client)
│   ├── auth.ts                # JWT admin
│   ├── types.ts               # Tipos TypeScript
│   └── default-content.ts     # Contenido por defecto
├── middleware.ts              # Protección rutas admin
├── supabase/migrations/       # SQL de base de datos
└── scripts/hash-password.js   # Generador de hash de contraseña
```

## ⚙️ Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/NexterDeveloper/PaginaActor.git
cd PaginaActor
npm install
```

### 2. Crear el proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto.
2. En el panel de Supabase, ve a **SQL Editor** y ejecuta el contenido de `supabase/migrations/001_init.sql`.
3. Copia tu **Project URL** y **anon key** desde *Settings > API*.

### 3. Generar el hash de la contraseña admin

```bash
node scripts/hash-password.js TU_CONTRASEÑA_SEGURA
```

Esto imprime un hash bcrypt. Cópialo.

### 4. Configurar las variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
ADMIN_PASSWORD_HASH=$2a$12$...el-hash-generado-arriba...
ADMIN_JWT_SECRET=una-cadena-aleatoria-de-al-menos-32-caracteres
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🔒 Panel de Administración

Accede en: [http://localhost:3000/admin](http://localhost:3000/admin)

- La contraseña se almacena **hasheada con bcrypt** en las variables de entorno.
- La sesión usa un **token JWT** firmado con HMAC-SHA256, almacenado en una cookie `httpOnly`.
- El panel de `/admin/dashboard` está protegido por middleware de Next.js.

## 🌐 Despliegue en Vercel

```bash
npx vercel --prod
```

Configura las mismas variables de entorno en el dashboard de Vercel en *Settings > Environment Variables*.

## 🎨 Personalizar el contenido

Edita `lib/default-content.ts` para cambiar nombre, bio, proyectos y datos de contacto.
En producción, conecta Supabase y lee los datos dinámicamente desde la base de datos.
