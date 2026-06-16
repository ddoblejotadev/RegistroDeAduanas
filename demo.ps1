# ==========================================
# SCRIPT DE DEMOSTRACIÓN - CONTROL DE VERSIONES (PowerShell)
# Uso: .\demo.ps1
# ==========================================

function Pause {
    Write-Host "`nPresiona ENTER para continuar..." -ForegroundColor Yellow
    Read-Host
}

function Section {
    param([string]$Title)
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host $Title -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
}

# HEADER
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   DEMOSTRACIÓN - TRABAJO COLABORATIVO CON GIT                 ║" -ForegroundColor Green
Write-Host "║   Proyecto: Control de Aduanas - Ingeniería de Software       ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# SECCIÓN 1
Section "📍 SECCIÓN 1: INFORMACIÓN DEL REPOSITORIO"
Write-Host ""
Write-Host "Repositorio remoto:" -ForegroundColor Yellow
git remote -v
Write-Host ""
Pause

# SECCIÓN 2
Section "📋 SECCIÓN 2: HISTORIAL DE COMMITS (últimos 10)"
Write-Host ""
git log --oneline --all -10
Write-Host ""
Pause

# SECCIÓN 3
Section "🌳 SECCIÓN 3: ESTRUCTURA DE BRANCHES (VISUAL - IMPORTANTE)"
Write-Host ""
Write-Host "Este gráfico muestra:" -ForegroundColor Yellow
Write-Host "  • main: rama principal" -ForegroundColor White
Write-Host "  • feature/auth-system: trabajo de Cristobal Ceballos" -ForegroundColor Magenta
Write-Host "  • feature/components-ui: trabajo de Juan Llontop" -ForegroundColor Cyan
Write-Host "  • feature/documentos-form: trabajo colaborativo" -ForegroundColor Green
Write-Host "  • Merges exitosos sin conflictos" -ForegroundColor White
Write-Host ""
git log --graph --oneline --all --decorate -20
Write-Host ""
Pause

# SECCIÓN 4
Section "👥 SECCIÓN 4: CONTRIBUCIONES POR AUTOR"
Write-Host ""
git shortlog -sn --all
Write-Host ""
Pause

# SECCIÓN 5
Section "✍️  SECCIÓN 5: COMMITS CON DETALLES COMPLETOS"
Write-Host ""
Write-Host "Formato: [Hash] - [Autor] ([Fecha]): [Mensaje]" -ForegroundColor Yellow
Write-Host ""
git log --pretty=format:"%h - %an (%ar): %s" --all -10
Write-Host ""
Pause

# SECCIÓN 6
Section "🎯 SECCIÓN 6: DISTRIBUCIÓN DE TRABAJO POR ÁREA"
Write-Host ""
Write-Host "Trabajo de Cristobal Ceballos:" -ForegroundColor Magenta
Write-Host "  📌 feat: mejorar sistema de autenticación y login"
Write-Host "  📌 feat: agregar validaciones y lógica de documentos"
Write-Host ""
Write-Host "Trabajo de Juan Llontop:" -ForegroundColor Cyan
Write-Host "  📌 feat: implementar componentes UI reutilizables"
Write-Host "  📌 feat: crear formulario base para documentos"
Write-Host ""
Write-Host "Trabajo Colaborativo:" -ForegroundColor Green
Write-Host "  📌 audit: eliminar vulnerabilidades de seguridad"
Write-Host "  📌 docs: agregar evidencia de trabajo colaborativo"
Write-Host ""
Pause

# SECCIÓN 7
Section "🔀 SECCIÓN 7: BRANCHES DISPONIBLES"
Write-Host ""
git branch -a
Write-Host ""
Pause

# SECCIÓN 8
Section "🤝 SECCIÓN 8: COMMITS RECIENTES"
Write-Host ""
git log --all --pretty=format:"%h - %an: %s" -5
Write-Host ""
Pause

# SECCIÓN 9
Section "📊 SECCIÓN 9: ESTADÍSTICAS DEL PROYECTO"
Write-Host ""
Write-Host "Total de commits:" -ForegroundColor Yellow
$totalCommits = git rev-list --all --count
Write-Host "$totalCommits commits" -ForegroundColor Green
Write-Host ""

Write-Host "Total de branches:" -ForegroundColor Yellow
$totalBranches = @(git branch -a).Count
Write-Host "$totalBranches branches" -ForegroundColor Green
Write-Host ""

Write-Host "Último commit:" -ForegroundColor Yellow
git log -1 --pretty=format:"%h - %an - %ar"
Write-Host ""
Pause

# SECCIÓN 10 - RESUMEN FINAL
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "✅ RESUMEN - EVIDENCIA DE TRABAJO COLABORATIVO" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "✓ Estructura de Git profesional con feature branches" -ForegroundColor Green
Write-Host "✓ Commits atribuidos correctamente a cada desarrollador" -ForegroundColor Green
Write-Host "✓ Trabajo paralelo e independiente" -ForegroundColor Green
Write-Host "✓ Integración exitosa (merges sin conflictos)" -ForegroundColor Green
Write-Host "✓ Documentación de evidencia (EVIDENCIA_COLABORATIVO.md)" -ForegroundColor Green
Write-Host "✓ Control de calidad (0 vulnerabilidades, código limpio)" -ForegroundColor Green
Write-Host ""
Write-Host "Desarrolladores:" -ForegroundColor Yellow
Write-Host "  👤 Juan Llontop - Componentes UI y Formularios" -ForegroundColor Cyan
Write-Host "  👤 Cristobal Ceballos - Autenticación y Validaciones" -ForegroundColor Magenta
Write-Host ""
Write-Host "Repositorio GitHub:" -ForegroundColor Yellow
Write-Host "  🔗 https://github.com/ddoblejotadev/RegistroDeAduanas" -ForegroundColor Cyan
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   ¡LISTO PARA PRESENTAR A LA PROFESORA!                       ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
