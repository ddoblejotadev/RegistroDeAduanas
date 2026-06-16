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

¿Quieres que añada un script que pre-llene la sesión automáticamente al abrir la app?"}