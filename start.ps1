#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Inicia la app Registro de Aduanas. Verifica Node, instala dependencias si hace falta y levanta el servidor.
#>

$ErrorActionPreference = 'Stop'
$requiredMajor = 18

# --- Verificar Node ---
try {
  $nodeVer = (node -v).TrimStart('v')
  $major = $nodeVer.Split('.')[0] -as [int]
} catch {
  Write-Host ""
  Write-Host "[ERROR] Node.js no esta instalado. Descargalo de https://nodejs.org/ o usa nvm:" -ForegroundColor Red
  Write-Host "  nvm install $requiredMajor" -ForegroundColor Yellow
  Write-Host "  nvm use $requiredMajor" -ForegroundColor Yellow
  Write-Host ""
  Read-Host "Presione Enter para salir"
  exit 1
}

if ($major -lt $requiredMajor) {
  Write-Host ""
  Write-Host "[ERROR] Node.js $requiredMajor+ requerido. Tenes: $nodeVer" -ForegroundColor Red
  Write-Host "  Ejecute: nvm install $requiredMajor && nvm use $requiredMajor" -ForegroundColor Yellow
  Write-Host ""
  Read-Host "Presione Enter para salir"
  exit 1
}

Write-Host "[OK] Node.js $nodeVer detectado"

# --- Instalar dependencias si no existen ---
if (-not (Test-Path "node_modules")) {
  Write-Host ""
  Write-Host "[INFO] Instalando dependencias..." -ForegroundColor Cyan
  npm install
  if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] npm install fallo." -ForegroundColor Red
    Write-Host "  Pruebe con: npm config set registry https://registry.npmmirror.com" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Presione Enter para salir"
    exit 1
  }
  Write-Host "[OK] Dependencias instaladas"
} else {
  Write-Host "[OK] node_modules encontrado"
}

# --- Iniciar servidor ---
Write-Host ""
Write-Host "[INFO] Iniciando servidor..." -ForegroundColor Cyan
Write-Host "       Abra http://localhost:5173 en su navegador"
Write-Host ""
npm run dev
Read-Host "Presione Enter para salir"
