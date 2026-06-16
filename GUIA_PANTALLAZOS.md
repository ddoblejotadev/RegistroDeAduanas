# 📸 Guía de Pantallazos para Presentación - Control de Versiones

## 🎯 Repositorio GitHub
**URL:** https://github.com/ddoblejotadev/RegistroDeAduanas

---

## 📋 CHECKLIST DE PANTALLAZOS - Orden de Presentación

### 1️⃣ PANTALLA 1: Página Principal del Repositorio
**URL:** https://github.com/ddoblejotadev/RegistroDeAduanas

**Qué mostrar:**
```
✓ Nombre del repositorio
✓ Descripción del proyecto
✓ Número de commits
✓ Branches activos
✓ Últimos cambios
```

**Qué capturar:**
- Pantalla completa de la página principal
- Muestra que es un proyecto colaborativo

---

### 2️⃣ PANTALLA 2: Vista de Commits (History)
**URL:** https://github.com/ddoblejotadev/RegistroDeAduanas/commits/main

**Qué mostrar:**
```
✓ Historial completo de commits
✓ Quién hizo cada commit (Juan Llontop, Cristobal Ceballos)
✓ Fecha y hora
✓ Mensajes descriptivos
✓ Hash de commit
```

**Qué capturar:**
- Los últimos 10 commits visibles
- Enfatizar los que tienen "Co-authored-by"
- Mostrar auditoría y features en orden

---

### 3️⃣ PANTALLA 3: Gráfico de Red (Network Graph)
**URL:** https://github.com/ddoblejotadev/RegistroDeAduanas/network

**Qué mostrar:**
```
✓ Estructura visual de branches
✓ Merges realizados
✓ Trabajo paralelo de ambos desarrolladores
✓ Puntos de integración
```

**ESTO ES CRUCIAL - Muestra visualmente:**
- main branch
- feature/auth-system (Cristobal)
- feature/components-ui (Juan)
- feature/documentos-form (Ambos)
- Los 3 merges exitosos

---

### 4️⃣ PANTALLA 4: Commits por Autor
**URL:** https://github.com/ddoblejotadev/RegistroDeAduanas/graphs/contributors

**Qué mostrar:**
```
✓ Contribuciones por persona
✓ Número de commits de cada uno
✓ Líneas de código agregadas/removidas
✓ Estadísticas semanales
```

**Qué capturar:**
- Gráfico que muestra ambos colaboradores
- Estadísticas visuales de participación

---

### 5️⃣ PANTALLA 5: Detalles de Commit Colaborativo
**URL:** https://github.com/ddoblejotadev/RegistroDeAduanas/commit/[commit-hash]

**Ejemplo: Commit con Co-authored-by**
```bash
audit: eliminar vulnerabilidades de seguridad y limpiar imports no utilizados

Co-authored-by: Juan Llontop <juan@example.com>
Co-authored-by: Cristobal Ceballos <cristobal@example.com>
```

**Qué capturar:**
- Mensaje del commit mostrando ambos autores
- Cambios realizados
- Archivos modificados
- Diferencias (diffs)

---

### 6️⃣ PANTALLA 6: Pull Requests (si las hay)
**URL:** https://github.com/ddoblejotadev/RegistroDeAduanas/pulls

**Qué mostrar:**
```
✓ PRs cerrados (merged)
✓ Revisiones de código
✓ Comentarios colaborativos
✓ Confirmaciones de merge
```

---

### 7️⃣ PANTALLA 7: Issues (Tracked Work)
**URL:** https://github.com/ddoblejotadev/RegistroDeAduanas/issues

**Qué mostrar:**
```
✓ Issues cerrados
✓ Asignaciones
✓ Tracking de features
```

---

## 🖥️ PANTALLAZOS DESDE TERMINAL (Adicional)

### Comando 1: Gráfico de Commits Local
```bash
git log --graph --oneline --all --decorate
```

**Qué capturar:**
- Árbol completo de branches
- Merges visualizados con líneas
- Puntos de integración claros

---

### Comando 2: Contribuciones por Autor
```bash
git shortlog -sn --all
```

**Qué capturar:**
- Número de commits por persona
- Confirmación de ambos colaboradores

---

### Comando 3: Log Formateado con Autores
```bash
git log --pretty=format:"%h - %an (%ar): %s" --all | head -20
```

**Qué capturar:**
- Commits con autores claramente identificados
- Fechas relativas
- Mensajes descriptivos

---

### Comando 4: Diff entre Branches
```bash
git diff feature/auth-system feature/components-ui
```

**Qué capturar:**
- Diferencias entre el trabajo de cada uno
- Confirmación de que trabajaron en áreas distintas

---

## 📊 SECUENCIA RECOMENDADA PARA LA PRESENTACIÓN

### Parte 1: Introducción al Repositorio (2-3 minutos)
1. **Pantalla 1:** Página principal de GitHub
2. **Pantalla 2:** Lista de commits
3. **Comentario:** "Aquí se ve el historial completo de trabajo"

### Parte 2: Trabajo Colaborativo (3-4 minutos)
4. **Pantalla 3:** Network graph (LA MÁS IMPORTANTE)
5. **Explicar:** "Aquí se ve claramente cómo trabajamos en paralelo:
   - Cristobal en autenticación
   - Juan en componentes UI
   - Ambos en documentos
   - Merges exitosos a main"

### Parte 3: Estadísticas de Trabajo (2-3 minutos)
6. **Pantalla 4:** Gráfico de contribuidores
7. **Pantalla 5:** Detalle de commit colaborativo
8. **Comentario:** "Ambos trabajamos juntos y el sistema trackea quién hizo qué"

### Parte 4: Control de Calidad (1-2 minutos)
9. **Mostrar:** EVIDENCIA_COLABORATIVO.md en el repo
10. **Mencionar:** "0 vulnerabilidades, código limpio, auditoría pasada"

---

## 🎨 TIPS VISUALES PARA IMPACTAR A LA PROFE

### ✨ Lo que MÁS impacta:

1. **El Network Graph**
   - Es lo más visual
   - Muestra claramente "trabajo paralelo"
   - Demuestra integración profesional

2. **Los commits con Co-authored-by**
   - Prueba documentada de colaboración
   - Sistema de versionamiento respeta ambos autores

3. **Commits descriptivos**
   - Mensajes en formato Conventional Commits
   - Categorías: feat:, fix:, audit:, docs:, merge:
   - Demuestra profesionalismo

4. **Estadísticas de GitHub**
   - Gráficos automáticos
   - Números que hablan por sí solos

---

## 📝 NOTAS PARA LA PRESENTACIÓN

### Puntos clave a mencionar:

```
✅ "Usamos Git con estrategia de feature branches"
✅ "Cada uno trabajó en su rama independiente"
✅ "Cristobal: Sistema de autenticación"
✅ "Juan: Componentes UI reutilizables"
✅ "Integramos con merges sin conflictos"
✅ "GitHub trackea automáticamente cada contribución"
✅ "Co-authored-by: Línea que demuestra trabajo colaborativo en un commit"
✅ "Auditoría: 0 vulnerabilidades, código limpio"
```

---

## 🔗 ENLACES DIRECTOS PARA COPIAR EN PRESENTACIÓN

**Página Principal:**
https://github.com/ddoblejotadev/RegistroDeAduanas

**Commits:**
https://github.com/ddoblejotadev/RegistroDeAduanas/commits/main

**Network (MÁS IMPORTANTE):**
https://github.com/ddoblejotadev/RegistroDeAduanas/network

**Contribuidores:**
https://github.com/ddoblejotadev/RegistroDeAduanas/graphs/contributors

**Insights:**
https://github.com/ddoblejotadev/RegistroDeAduanas/insights

---

## 🎯 ORDEN FINAL DE PANTALLAZOS (Para PowerPoint/Presentación)

### Slide 1: Repositorio
[Pantalla 1: Página principal]

### Slide 2: Historial de Commits
[Pantalla 2: Commits]

### Slide 3: Estructura de Branches (CLAVE)
[Pantalla 3: Network graph]

### Slide 4: Contribuciones
[Pantalla 4: Contributors]

### Slide 5: Ejemplo Commit Colaborativo
[Pantalla 5: Detalle de commit]

### Slide 6: Control de Calidad
[Pantalla 6: EVIDENCIA_COLABORATIVO.md]

### Slide 7: Conclusión
"Trabajo colaborativo exitoso usando Git"

---

**¡Listo para presentar! 🚀**

Generado: 2026-06-15  
Proyecto: Control de Aduanas - Ingeniería de Software
