# Registro de Aduanas

Registro de Aduanas es una aplicación de demostración (proyecto universitario) para gestionar declaraciones aduaneras desde dos roles: Viajero y Funcionario. Está lista para ejecutarse localmente sin servicios externos.

Características principales
- Portal del Viajero: crear y ver declaraciones, generar código QR, subir bienes y documentos.
- Panel del Funcionario: listar, filtrar y cambiar el estado de declaraciones.
- Modo demo local: mock de API y autenticación para presentación sin backend.

Rápido inicio (5 minutos)
1. git clone https://github.com/ddoblejotadev/RegistroDeAduanas
2. cd RegistroDeAduanas
3. npm install
4. npm run dev
5. Abrir http://localhost:5173 (o la URL que muestre Vite)

Cuentas de prueba
- viajero@test.cl — contraseña: viajero123
- admin@aduana.cl — contraseña: admin123

Consejos para la presentación
- Para entrar ya autenticado en la máquina de la U, abre DevTools → Application → Session Storage y añade la clave `mock_auth_user` con el valor JSON del usuario (ej. `{ "id": "mock-viajero-001", "email": "viajero@test.cl", "full_name": "Juan Pérez" }`).
- Alternativamente, pide que use el login en la UI — las cuentas arriba funcionan.

¿Quieres que añada un script que pre-llene la sesión automáticamente al abrir la app?

---

## Requisitos de Node

Para evitar errores por instalaciones mezcladas de Node/npm, usa una versión LTS de Node (recomendada: Node 18) antes de ejecutar `npm install`.

En Windows puedes usar `nvm` (nvm-windows) o instalar Node desde nodejs.org. Comandos útiles:

```powershell
node -v
npm -v
where.exe node
where.exe npm
```

Si usas `nvm`, coloca la versión en `.nvmrc` (ya incluida) y ejecuta:

```powershell
nvm install 18
nvm use 18
node -v
npm -v
cd "C:\\Users\\av-alumno\\Downloads\\RegistroDeAduanas-main\\RegistroDeAduanas-main"
npm install
npm run dev
```

Problema común: tener una copia rota de `npm` en `AppData\\Roaming\\nvm\\<version>\\node_modules\\npm` o instalaciones de Node en `C:\\Program Files\\nodejs` puede provocar errores como "Class extends value undefined". Si ves ese error, limpia las instalaciones antiguas y usa una sola fuente de Node (nvm o instalador oficial).

Con estos pasos, `npm install` y `npm run dev` deberían funcionar en cualquier equipo con una instalación correcta de Node.