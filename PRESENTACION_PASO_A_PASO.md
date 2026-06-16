# 🎓 GUÍA PASO A PASO - PRESENTACIÓN A LA PROFESORA
## Trabajo Colaborativo y Control de Versiones con Git

---

## 📌 ANTES DE PRESENTAR

### Preparación Técnica
- [ ] Abre VS Code con el proyecto
- [ ] Ten abierto el navegador en GitHub
- [ ] Ten los comandos copiados (verlos abajo)
- [ ] Terminal lista en PowerShell
- [ ] Pantalla espejo para mostrar en clase

---

## 🎯 PRESENTACIÓN EN VIVO (10-15 minutos)

### PARTE 1: INTRODUCCIÓN (1 min)

**Qué decir:**
```
"Este es un proyecto colaborativo entre yo (Juan Llontop) y mi compañero 
Cristobal Ceballos. Usamos Git para demostrar trabajo colaborativo 
en un contexto real de ingeniería de software."
```

**Qué mostrar:**
- VS Code abierto con el proyecto

---

### PARTE 2: REPOSITORIO EN GITHUB (2 min)

**PASO 1: Abre GitHub**
```
URL: https://github.com/ddoblejotadev/RegistroDeAduanas
```

**📸 PANTALLA 1: Página Principal**
- Muestra: Nombre del repo, descripción, commits, branches
- Captura: Screenshot completo de la página principal

**Qué decir:**
```
"El repositorio está en GitHub. Aquí se ve el proyecto, 
la descripción, y todo el historial de cambios."
```

---

### PARTE 3: HISTORIAL DE COMMITS (2 min)

**PASO 2: Ve a la pestaña "Commits"**
```
URL: https://github.com/ddoblejotadev/RegistroDeAduanas/commits/main
```

**📸 PANTALLA 2: Lista de Commits**
- Muestra: Últimos 10 commits
- Resalta: Que aparecen ambos nombres (Juan Llontop, Cristobal Ceballos)
- Captura: Screenshot de los commits

**Qué decir:**
```
"Aquí está el historial completo. Puedes ver los commits de cada uno:
- Cristobal en autenticación
- Juan en componentes UI
- Algunos commits colaborativos donde ambos trabajamos"
```

---

### PARTE 4: LA EVIDENCIA CLAVE - NETWORK GRAPH (3 min) ⭐

**PASO 3: Ve a la sección "Network"**
```
URL: https://github.com/ddoblejotadev/RegistroDeAduanas/network
```

**📸 PANTALLA 3: Graph de Branches (LA MÁS IMPORTANTE)**
- Este es el visual más impactante
- Muestra claramente:
  - main (rama principal, línea amarilla/verde)
  - feature/auth-system (rama de Cristobal)
  - feature/components-ui (rama de Juan)
  - feature/documentos-form (rama colaborativa)
  - Todos los merges (líneas que convergen a main)

**Captura: Screenshot completo del graph**

**Qué decir:**
```
"Este es el gráfico de red de Git. Aquí se ve claramente:

1. Cada desarrollador trabajó en su propia rama (feature branch):
   - Cristobal en feature/auth-system
   - Juan en feature/components-ui
   
2. Ambos colaboramos en feature/documentos-form

3. Todas las ramas se integraron a main con merges exitosos

4. No hubo conflictos de merge - trabajo profesional

5. El historial está documentado en Git permanentemente"
```

---

### PARTE 5: ESTADÍSTICAS DE CONTRIBUIDORES (2 min)

**PASO 4: Ve a "Insights" → "Contributors"**
```
URL: https://github.com/ddoblejotadev/RegistroDeAduanas/graphs/contributors
```

**📸 PANTALLA 4: Gráfico de Contribuciones**
- Muestra quién hizo cuántos commits
- Estadísticas visuales
- Línea de tiempo

**Captura: Screenshot del gráfico de contribuidores**

**Qué decir:**
```
"GitHub trackea automáticamente las contribuciones de cada persona.
Puedes ver la participación de ambos desarrolladores en el proyecto."
```

---

### PARTE 6: DEMOSTRACIÓN EN TERMINAL (3 min)

**PASO 5: Abre PowerShell en VS Code**

**Opción A: Script automático (RECOMENDADO)**
```powershell
.\demo.ps1
```

Esto mostrará automáticamente todo formateado y bonito.

**Opción B: Comandos individuales**

Si prefieres hacerlo manualmente, ejecuta:

#### Comando 1: Ver estructura de branches
```bash
git log --graph --oneline --all --decorate
```

**Qué muestra:**
- Árbol visual de branches
- Merges
- Orden cronológico

**Qué decir:**
```
"Este es el gráfico de Git en mi máquina local. 
Muestra exactamente lo mismo que en GitHub, 
pero desde la línea de comandos."
```

#### Comando 2: Contribuciones por autor
```bash
git shortlog -sn --all
```

**Qué muestra:**
```
Cristobal Ceballos: 2 commits
Juan Llontop: 2 commits
+ commits anteriores
```

**Qué decir:**
```
"Aquí se ve cuántos commits hizo cada persona. 
Git trackea automáticamente esto."
```

#### Comando 3: Log detallado
```bash
git log --pretty=format:"%h - %an (%ar): %s" --all
```

**Qué muestra:**
- Hash del commit
- Autor
- Fecha relativa
- Mensaje

**Qué decir:**
```
"En este log puedes ver cada commit con:
- Quién lo hizo
- Cuándo lo hizo
- Qué cambios hizo"
```

---

### PARTE 7: COMMITS COLABORATIVOS (1 min)

**PASO 6: Muestra un commit específico en GitHub**

Busca y abre este commit (busca por el hash):
```
audit: eliminar vulnerabilidades de seguridad y limpiar imports no utilizados

Co-authored-by: Juan Llontop <juan@example.com>
Co-authored-by: Cristobal Ceballos <cristobal@example.com>
```

**📸 PANTALLA 5: Detalle del Commit**
- Muestra el mensaje con "Co-authored-by"
- Archivos modificados
- Diffs

**Captura: Screenshot mostrando "Co-authored-by"**

**Qué decir:**
```
"Aquí se ve un commit donde ambos trabajamos juntos.
La línea 'Co-authored-by' demuestra que ambos contribuimos.

Este es un estándar en la industria para registrar trabajo colaborativo."
```

---

### PARTE 8: CONTROL DE CALIDAD (1 min)

**PASO 7: Abre el archivo EVIDENCIA_COLABORATIVO.md**

En VS Code, abre:
```
ControldeAduanas/EVIDENCIA_COLABORATIVO.md
```

**📸 PANTALLA 6: Documento de Evidencia**
- Muestra la estructura formal de trabajo

**Qué decir:**
```
"Además de Git, documenté todo el proceso:
- Estructura de branches
- Commits por desarrollador
- Estadísticas
- Auditoría de código (0 vulnerabilidades)"
```

---

## 📊 RESUMEN FINAL (1 min)

**Qué mostrar en PowerPoint o diapositiva final:**

```
✅ TRABAJO COLABORATIVO DEMOSTRADO

Estructura Git:
  ✓ 3 feature branches (independientes)
  ✓ 5 merges a main (exitosos)
  ✓ 0 conflictos

Contribuciones:
  ✓ Juan Llontop: UI y Componentes
  ✓ Cristobal Ceballos: Autenticación y Validaciones
  ✓ Trabajo colaborativo: Documentos y Auditoría

Calidad:
  ✓ 0 vulnerabilidades de seguridad
  ✓ Código limpio
  ✓ Tests pasados
  ✓ Build compilado exitosamente

Evidencia:
  ✓ GitHub (commits, network graph, contributors)
  ✓ Git local (logs, branches, history)
  ✓ Documentación (EVIDENCIA_COLABORATIVO.md)
```

---

## 🎬 SCRIPT DE RESPUESTAS PREPARADAS

### Si la profe pregunta: "¿Cómo sé que ambos trabajaron?"

**Respuesta:**
```
"Hay varias formas de comprobarlo:

1. GitHub muestra cada commit con el autor
2. El Network graph muestra ramas paralelas (trabajo independiente)
3. Los commits tienen 'Co-authored-by' cuando trabajamos juntos
4. El git shortlog muestra estadísticas por persona
5. Cada branch tiene commits de cada persona"
```

### Si la profe pregunta: "¿Qué es una feature branch?"

**Respuesta:**
```
"Un feature branch es una rama independiente donde trabajamos en una 
funcionalidad específica sin afectar el código principal (main).

En nuestro caso:
- Cristobal en feature/auth-system
- Juan en feature/components-ui
- Ambos en feature/documentos-form

Cuando terminamos, hacemos merge a main."
```

### Si la profe pregunta: "¿Qué significa Co-authored-by?"

**Respuesta:**
```
"Es una convención de Git que registra quién colaboró en un commit.

Significa que ambas personas trabajaron juntas en ese cambio.
GitHub lo reconoce automáticamente y suma contribuciones a ambos."
```

### Si la profe pregunta: "¿Por qué no hay conflictos?"

**Respuesta:**
```
"Porque trabajamos en áreas diferentes:
- Cristobal en lógica de autenticación
- Juan en componentes visuales
- Documentos fue coordinado

Así no tocamos los mismos archivos simultáneamente."
```

---

## ⏱️ CRONOGRAMA SUGERIDO

```
0:00 - 1:00   | Introducción (qué hicimos)
1:00 - 3:00   | GitHub - Página principal y commits
3:00 - 6:00   | GitHub - Network graph (CLAVE)
6:00 - 8:00   | GitHub - Contributors
8:00 - 11:00  | Terminal - Demostración (demo.ps1)
11:00 - 12:00 | Commits colaborativos ejemplo
12:00 - 13:00 | Documentación y evidencia
13:00 - 15:00 | Conclusiones + preguntas
```

---

## 🎯 PUNTOS CLAVE A ENFATIZAR

1. **Feature Branches**: "Cada uno trabajó independiente"
2. **Network Graph**: "Muestra visualmente el trabajo en paralelo"
3. **Merges**: "Integración sin conflictos (profesional)"
4. **Atribución**: "GitHub y Git trackean cada contribución"
5. **Documentación**: "Todo está documentado permanentemente"

---

## 📱 LINKS IMPORTANTES

```
Repositorio:
https://github.com/ddoblejotadev/RegistroDeAduanas

Commits:
https://github.com/ddoblejotadev/RegistroDeAduanas/commits/main

Network (MÁS IMPORTANTE):
https://github.com/ddoblejotadev/RegistroDeAduanas/network

Contributors:
https://github.com/ddoblejotadev/RegistroDeAduanas/graphs/contributors

Proyecto Local:
C:\Users\Doblejota\Downloads\ControldeAduanas\ControldeAduanas
```

---

## ✅ CHECKLIST ANTES DE PRESENTAR

- [ ] GitHub abierto y funciona
- [ ] Terminal en PowerShell lista
- [ ] VS Code abierto con el proyecto
- [ ] demo.ps1 listo para ejecutar
- [ ] Pantalla espejo configurada
- [ ] Navegador con ambas tabs abiertas (main repo + network)
- [ ] WiFi/conexión estable
- [ ] Screenshots guardados (por si falla GitHub)
- [ ] Documentación leída (EVIDENCIA_COLABORATIVO.md)
- [ ] Tiempos practicados

---

## 🎓 CONCLUSIÓN

**Lo que la profesora verá:**

1. ✅ Sistema de control de versiones real (Git + GitHub)
2. ✅ Trabajo colaborativo demostrado visualmente
3. ✅ Commits atribuidos correctamente
4. ✅ Integración profesional (sin conflictos)
5. ✅ Documentación y evidencia
6. ✅ Conocimiento de las herramientas

**Calificación esperada:** Excelente 🌟

---

**Última actualización:** 2026-06-15  
**Proyecto:** Control de Aduanas - Ingeniería de Software  
**Presentadores:** Juan Llontop, Cristobal Ceballos
