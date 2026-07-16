# Registro de Aduanas — Paso Los Libertadores

Aplicación de demostración (proyecto universitario) para gestionar declaraciones aduaneras en el **Paso Los Libertadores** (frontera Chile-Argentina). Soporta tres roles: **Viajero**, **Funcionario de Aduanas** y **Administrador**.

Incluye flujo completo desde la llegada del viajero hasta el cruce fronterizo, con derivaciones a SAG y PDI/Migraciones cuando corresponde.

## Características

- **Portal del Viajero**: declarar datos personales, vehículo, bienes, menores a cargo y alimentos/mascotas; generar código QR.
- **Panel del Funcionario**: listar, filtrar, cambiar estados, **derivar a SAG o PDI**, agregar notas.
- **Panel del Administrador**: estadísticas generales y gestión de usuarios.
- **Flujo SAG**: si el viajero declara alimentos o mascotas, la declaración se deriva automáticamente al SAG.
- **Flujo PDI**: el funcionario puede derivar a PDI/Migraciones si requiere revisión migratoria.
- **Declaración de vehículo**: patente, tipo de permiso, plazo y país de origen (opcional).
- **Modo demo local**: mock de API y autenticación para presentación sin backend.
- **GitHub Pages**: deploy automático con cada push a `main`.

## Roles y cuentas de prueba

| Rol | Email | Contraseña |
|---|---|---|
| Viajero | `viajero@test.cl` | `viajero123` |
| Funcionario | `admin@aduana.cl` | `admin123` |
| Administrador | `admin@aduana.cl` | `admin123` |

## Demo online

La app está disponible en GitHub Pages:

```
https://ddoblejotadev.github.io/RegistroDeAduanas/
```

Se actualiza automáticamente al hacer push a `main` (via GitHub Actions con Vite build).

## Inicio rápido (5 minutos)

**Requisito**: Node.js 18 o superior.

### Opción A — Doble clic (recomendado)
1. Cloná el repo o descargalo como ZIP y extraé la carpeta.
2. Hacé doble clic en `start.bat` (Windows) o `start.ps1`.
3. Se abre el navegador en http://localhost:5173.

### Opción B — Manual
```bash
git clone https://github.com/ddoblejotadev/RegistroDeAduanas
cd RegistroDeAduanas
npm install
npm run dev
```

Abrir http://localhost:5173 (o la URL que muestre Vite).

## Estados de una declaración

```
pendiente → en_revision → derivado_sag → aprobado
                        → derivado_pdi → aprobado
                        → aprobado
                        → rechazado
```

## Flujo del proceso

1. El viajero llega al paso fronterizo e inicia sesión.
2. Completa la declaración: datos personales, vehículo (opcional), bienes, menores a cargo.
3. Indica si declara **alimentos o mascotas** (derivación a SAG automática).
4. El sistema genera un código QR.
5. El funcionario escanea el QR, revisa la declaración y puede derivar a PDI si lo requiere.
6. El funcionario aprueba o rechaza la declaración.
7. El viajero cruza la frontera.

## Stack técnico

- **Frontend**: React 18 + Vite 4 + Tailwind CSS + shadcn/ui
- **Estado/API**: TanStack React Query + Mock API local
- **Formularios**: React Hook Form + Zod
- **Routing**: React Router (HashRouter para GitHub Pages)
- **Autenticación**: Mock Auth (sessionStorage)

## Solución de problemas

Ver sección [Solución de problemas en PCs compartidas (TATE)](#solución-de-problemas-en-pcs-compartidas-tate) más abajo.

### Consejos para la presentación

- Para pre-cargar sesión: DevTools → Application → Session Storage → añadir clave `mock_auth_user` con valor:
  ```json
  { "id": "mock-viajero-001", "email": "viajero@test.cl", "full_name": "Juan Pérez" }
  ```
- Cuentas de prueba funcionan en la UI de login.
- La app deployada en GitHub Pages no requiere configuración adicional.
