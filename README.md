# Registro de Aduanas

Registro de Aduanas es una aplicación de demostración (proyecto universitario) para gestionar declaraciones aduaneras desde dos roles: Viajero y Funcionario. Está lista para ejecutarse localmente sin servicios externos.

Características principales
- Portal del Viajero: crear y ver declaraciones, generar código QR, subir bienes y documentos.
- Panel del Funcionario: listar, filtrar y cambiar el estado de declaraciones.
- Modo demo local: mock de API y autenticación para presentación sin backend.

Rápido inicio (5 minutos)
Requisito: Node.js 18 o superior.

Opción A — Doble clic (recomendado para PCs compartidas)
1. Cloná el repo o descargalo como ZIP y extraé la carpeta.
2. Hacé doble clic en `start.bat` (Windows) o `start.ps1`.
3. Se abre el navegador en http://localhost:5173.

Opción B — Manual
1. `git clone https://github.com/ddoblejotadev/RegistroDeAduanas`
2. `cd RegistroDeAduanas`
3. `npm install`
4. `npm run dev`
5. Abrir http://localhost:5173 (o la URL que muestre Vite)

Notas de compatibilidad
- El repo incluye [.nvmrc](.nvmrc) y una verificación automática para asegurar Node.js 18 o superior antes de instalar.
- El lockfile está fijado en formato 2 para que `npm install` funcione también en máquinas con npm más antiguo.
- En Windows, si la PC de la U tiene una versión vieja de Node, instala Node 18 con nvm-windows y después corre `npm install` otra vez.
- Si `npm run dev` muestra un puerto distinto, abre la URL exacta que imprime Vite.
- Si algo falla después de clonar, borra `node_modules` y vuelve a ejecutar `npm install` desde la carpeta del proyecto.

Flujo recomendado en una PC nueva
1. Instalar Node 18 o superior.
2. Abrir una terminal dentro de la carpeta del repo.
3. Ejecutar `npm install`.
4. Ejecutar `npm run dev`.
5. Abrir la URL local que indique Vite.

Instalar Node con nvm-windows (recomendado para PCs compartidas)
1. Si ya tenés Node.js instalado, desinstalalo primero desde "Agregar o quitar programas".
2. Descargar e instalar nvm-windows desde su repositorio oficial.
3. Abrir PowerShell o CMD como usuario normal.
4. Ejecutar `nvm install 18`.
5. Ejecutar `nvm use 18`.
6. Confirmar con `node -v` y volver a correr `npm install` dentro del proyecto.

Cuentas de prueba
- viajero@test.cl — contraseña: viajero123
- admin@aduana.cl — contraseña: admin123

Solución de problemas en PCs compartidas (TATE)
- **"node -v" muestra una versión pero no es la que esperaba**: Abrí una terminal nueva y ejecutá `where node`. Si aparecen varias rutas, tenés instalaciones duplicadas. Desinstalá Node desde "Agregar o quitar programas" y usá nvm-windows (ver instrucciones arriba).
- **Error "Node.js 18+ requerido"**: Ejecutá `node -v` para ver la versión actual. Si es menor a 18, seguí los pasos de "Instalar Node con nvm-windows" arriba.
- **npm install falla con errores de permisos**: En las TATE a veces no tenés permisos de escritura. Probá `npm install --no-optional` o ejecutá PowerShell como administrador.
- **npm install falla por el firewall de la U**: Algunas universidades bloquean npm. Probá con `npm config set registry https://registry.npmmirror.com` y volvé a ejecutar `npm install`.
- **Después de instalar Node 18 con nvm, "node -v" sigue mostrando la versión vieja**: Ejecutá `nvm list` para ver las versiones instaladas, y después `nvm use 18`. Si sigue, cerrá y abrí de nuevo la terminal.

Consejos para la presentación
- Para entrar ya autenticado en la máquina de la U, abre DevTools → Application → Session Storage y añade la clave `mock_auth_user` con el valor JSON del usuario (ej. `{ "id": "mock-viajero-001", "email": "viajero@test.cl", "full_name": "Juan Pérez" }`).
- Alternativamente, pide que use el login en la UI — las cuentas arriba funcionan.

¿Quieres que añada un script que pre-llene la sesión automáticamente al abrir la app?"}