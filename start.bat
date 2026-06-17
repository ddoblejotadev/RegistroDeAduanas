@echo off
setlocal enabledelayedexpansion

set "required=18"

REM --- Verificar Node ---
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js no esta instalado.
    echo         Descargalo de https://nodejs.org/ o usa nvm:
    echo   nvm install %required%
    echo   nvm use %required%
    echo.
    pause
    exit /b 1
)

for /f "tokens=1 delims=v." %%a in ('node -v') do set "major=%%a"
REM node -v devuelve "vXX.YY.ZZ", extraemos el numero
for /f "tokens=1 delims=v." %%a in ('node -v') do (
    if "%%a"=="" (
        for /f "tokens=1 delims=." %%b in ('node -v') do set "major=%%b"
    ) else (
        set "major=%%a"
    )
)

REM --- Extraer major version ---
for /f %%a in ('node -v') do set "ver=%%a"
set "ver=%ver:~1%"
for /f "tokens=1 delims=." %%a in ("%ver%") do set "major=%%a"

if %major% lss %required% (
    echo.
    echo [ERROR] Node.js %required%+ requerido. Tenes: %ver%
    echo         Ejecuta: nvm install %required%  ^&^&  nvm use %required%
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js %ver% detectado

REM --- Instalar dependencias si no existen ---
if not exist node_modules\* (
    echo.
    echo [INFO] Instalando dependencias...
    call npm install
    if !errorlevel! neq 0 (
        echo.
        echo [ERROR] npm install fallo.
        echo         Proba con: npm config set registry https://registry.npmmirror.com
        echo.
        pause
        exit /b 1
    )
    echo [OK] Dependencias instaladas
) else (
    echo [OK] node_modules encontrado
)

echo.
echo [INFO] Iniciando servidor...
echo        Abri http://localhost:5173 en tu navegador
echo.
npm run dev
pause
