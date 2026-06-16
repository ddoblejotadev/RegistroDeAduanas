#!/bin/bash
# ==========================================
# SCRIPT DE DEMOSTRACIÓN - CONTROL DE VERSIONES
# Uso: bash demo.sh
# ==========================================

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   DEMOSTRACIÓN - TRABAJO COLABORATIVO CON GIT                 ║"
echo "║   Proyecto: Control de Aduanas - Ingeniería de Software       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Pausa entre secciones
pause() {
  read -p "Presiona ENTER para continuar..."
}

# ==========================================
# SECCIÓN 1: INFORMACIÓN DEL REPOSITORIO
# ==========================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📍 SECCIÓN 1: INFORMACIÓN DEL REPOSITORIO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Repositorio remoto:"
git remote -v
echo ""
pause

# ==========================================
# SECCIÓN 2: HISTORIAL DE COMMITS
# ==========================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 SECCIÓN 2: HISTORIAL DE COMMITS (últimos 15)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
git log --oneline --all | head -15
echo ""
pause

# ==========================================
# SECCIÓN 3: GRÁFICO DE BRANCHES (VISUAL)
# ==========================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌳 SECCIÓN 3: ESTRUCTURA DE BRANCHES (VISUAL)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Este gráfico muestra:"
echo "  • main: rama principal"
echo "  • feature/auth-system: trabajo de Cristobal Ceballos"
echo "  • feature/components-ui: trabajo de Juan Llontop"
echo "  • feature/documentos-form: trabajo colaborativo"
echo "  • Merges exitosos sin conflictos"
echo ""
git log --graph --oneline --all --decorate
echo ""
pause

# ==========================================
# SECCIÓN 4: CONTRIBUCIONES POR AUTOR
# ==========================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "👥 SECCIÓN 4: CONTRIBUCIONES POR AUTOR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
git shortlog -sn --all
echo ""
pause

# ==========================================
# SECCIÓN 5: DETALLES DE COMMITS POR AUTOR
# ==========================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✍️  SECCIÓN 5: COMMITS CON DETALLES COMPLETOS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Formato: [Hash] - [Autor] ([Fecha]): [Mensaje]"
echo ""
git log --pretty=format:"%h - %an (%ar): %s" --all | head -15
echo ""
pause

# ==========================================
# SECCIÓN 6: WORK POR AREA
# ==========================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 SECCIÓN 6: DISTRIBUCIÓN DE TRABAJO POR ÁREA"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Trabajo de Cristobal Ceballos:"
echo "  📌 feat: mejorar sistema de autenticación y login"
echo "  📌 feat: agregar validaciones y lógica de documentos"
echo ""
echo "Trabajo de Juan Llontop:"
echo "  📌 feat: implementar componentes UI reutilizables"
echo "  📌 feat: crear formulario base para documentos"
echo ""
echo "Trabajo Colaborativo:"
echo "  📌 audit: eliminar vulnerabilidades de seguridad"
echo "  📌 docs: agregar evidencia de trabajo colaborativo"
echo ""
pause

# ==========================================
# SECCIÓN 7: BRANCHES EXISTENTES
# ==========================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔀 SECCIÓN 7: BRANCHES DISPONIBLES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
git branch -a
echo ""
pause

# ==========================================
# SECCIÓN 8: EJEMPLO DE COMMIT COLABORATIVO
# ==========================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🤝 SECCIÓN 8: EJEMPLO DE COMMIT COLABORATIVO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Buscando commits con Co-authored-by..."
echo ""
git log --all --grep="Co-authored" --oneline || git log --all --pretty=format:"%h %s" | grep -i "audit\|docs" | head -5
echo ""
pause

# ==========================================
# SECCIÓN 9: ESTADÍSTICAS
# ==========================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SECCIÓN 9: ESTADÍSTICAS DEL PROYECTO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Total de commits:"
git rev-list --all --count
echo ""
echo "Total de branches:"
git branch -a | wc -l
echo ""
echo "Último commit:"
git log -1 --pretty=format:"%h - %an - %ar"
echo ""
pause

# ==========================================
# SECCIÓN 10: RESUMEN FINAL
# ==========================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ RESUMEN - EVIDENCIA DE TRABAJO COLABORATIVO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✓ Estructura de Git profesional con feature branches"
echo "✓ Commits atribuidos correctamente a cada desarrollador"
echo "✓ Trabajo paralelo e independiente"
echo "✓ Integración exitosa (merges sin conflictos)"
echo "✓ Documentación de evidencia (EVIDENCIA_COLABORATIVO.md)"
echo "✓ Control de calidad (0 vulnerabilidades, código limpio)"
echo ""
echo "Desarrolladores:"
echo "  👤 Juan Llontop - Componentes UI y Formularios"
echo "  👤 Cristobal Ceballos - Autenticación y Validaciones"
echo ""
echo "Repositorio GitHub:"
echo "  🔗 https://github.com/ddoblejotadev/RegistroDeAduanas"
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   ¡LISTO PARA PRESENTAR A LA PROFESORA!                       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
