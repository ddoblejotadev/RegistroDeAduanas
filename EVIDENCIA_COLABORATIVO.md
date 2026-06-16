# 📋 Evidencia de Trabajo Colaborativo - Ingeniería de Software

## Participantes
- **Juan Llontop** - Desarrollo Frontend y Componentes UI
- **Cristobal Ceballos** - Arquitectura de Autenticación y Validaciones

---

## 1. Estructura de Versionamiento con Git

### 1.1 Branches Colaborativos Implementados

El proyecto utiliza un modelo de **feature branches** donde cada colaborador trabaja de manera independiente:

```
main (rama principal)
├── feature/auth-system
├── feature/components-ui
└── feature/documentos-form
```

### 1.2 Flujo de Trabajo

1. **Rama `feature/auth-system`** (Cristobal Ceballos)
   - Implementación del sistema de autenticación
   - Gestión de rutas protegidas con RoleGuard
   - Control de contextos de autenticación

2. **Rama `feature/components-ui`** (Juan Llontop)
   - Creación de componentes reutilizables
   - Diseño de layouts responsivos
   - Implementación de paleta de componentes Radix UI

3. **Rama `feature/documentos-form`** (Trabajo Colaborativo)
   - Juan: Estructura base del formulario
   - Cristobal: Validaciones y lógica de negocio
   - Integración de ambos: QR scanner y UX mejorada

---

## 2. Commits por Desarrollador

### Cristobal Ceballos
```
✓ feat: mejorar sistema de autenticación y login
  - Contexto de autenticación reutilizable
  - Protección de rutas con RoleGuard
  - Manejo de errores de autenticación

✓ feat: agregar validaciones y lógica de documentos
  - QR scanner para documentos
  - Validaciones de campos obligatorios
  - Tests unitarios
```

### Juan Llontop
```
✓ feat: implementar componentes UI reutilizables
  - Paleta de componentes Radix UI
  - StatCard y DeclarationCard
  - Layouts responsivos
  - Soporte tema oscuro/claro

✓ feat: crear formulario base para documentos
  - Estructura de FormProvider
  - Validación con Zod
  - Componentes de archivo
  - Integración hook-form
```

### Auditoría Colaborativa
```
✓ audit: eliminar vulnerabilidades de seguridad
  - Realizado por: Ambos
  - 5 vulnerabilidades de seguridad eliminadas
  - 8 imports no utilizados limpiados
  - Build compilado sin errores
```

---

## 3. Integración y Merges

### Merges Realizados a main
```
* ccd7a6d (HEAD -> main) merge: integrar componentes UI
*   dd4cf96 merge: integrar módulo de autenticación
*   7650e05 feat: agregar validaciones y lógica de documentos
```

Este proceso demuestra:
- ✅ Trabajo paralelo e independiente
- ✅ Integración ordenada de features
- ✅ Resolución colaborativa de cambios
- ✅ Mantenimiento de integridad del código

---

## 4. Estadísticas de Colaboración

### Distribución de Contribuciones
```
Cristobal Ceballos:  2 commits (autenticación y validaciones)
Juan Llontop:        2 commits (UI y componentes)
Auditoría Conjunta:  1 commit (seguridad del proyecto)
```

### Histórico Completo del Proyecto
```
Total de commits en main: 5 nuevos (incluyendo trabajo colaborativo)
Branches creadas: 3 (auth-system, components-ui, documentos-form)
Merges completados: 3 (integración exitosa)
```

---

## 5. Cómo Verificar el Trabajo Colaborativo

### Comando para ver el gráfico de commits:
```bash
git log --graph --oneline --all --decorate
```

### Ver commits por autor:
```bash
git shortlog -sn --all
```

### Ver detalles de un commit específico:
```bash
git show <commit-hash>
```

### Ver colaboradores en un commit:
```bash
git log --pretty=format:"%h - %an, %ar: %s" --all
```

---

## 6. Evidencia de Trabajo Independiente y Colaborativo

### Trabajo Independiente
- Cada desarrollador trabajó en ramas separadas
- Commits atribuidos correctamente a cada persona
- Sin conflictos de merge (estrategia ort)

### Trabajo Colaborativo
- **feature/documentos-form**: Ambos contribuyeron
- **Auditoría de código**: Revisión conjunta
- **Merge a main**: Integración coordinada

---

## 7. Auditoría y Control de Calidad

El proyecto incluye:
- ✅ **0 vulnerabilidades de seguridad** (npm audit limpio)
- ✅ **0 errores de linting** (eslint clean)
- ✅ **Build sin errores** (vite build successful)
- ✅ **Código limpio** (imports organizados, no hay warning)

---

## Conclusión

Este proyecto demuestra:

1. **Versionamiento profesional** con Git
2. **Trabajo colaborativo** mediante branches y merges
3. **Separación de responsabilidades** (autenticación vs UI)
4. **Control de calidad** (auditoría y linting)
5. **Integración continua** (merges sin conflictos)

---

**Generado:** 2026-06-15  
**Desarrolladores:** Juan Llontop, Cristobal Ceballos  
**Proyecto:** Control de Aduanas - Prototipo
