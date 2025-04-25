# Documentación del Proyecto: Simulador de Ahorro y Metas Financieras

## 1. Información General
**Nombre del Proyecto:** Simulador de Ahorro y Metas Financieras  
**Tipo de Aplicación:** Web  
**Arquitectura:** Separación frontend-backend con comunicación vía API REST  
**Tecnologías:**
- **Frontend:** React + Material UI
- **Backend:** Laravel 11 (API REST)
- **Seguridad:** Autenticación con JWT (via Tymon/JWTAuth)

## 2. Objetivo del Proyecto
Desarrollar una herramienta que permita a los usuarios planificar sus metas de ahorro, registrar aportes, recibir sugerencias y visualizar el progreso de sus objetivos financieros mediante cálculos simples y visualizaciones intuitivas.

## 3. Funcionalidades Principales
### Backend (Laravel)
- CRUD de usuarios, metas y aportes.
- Autenticación segura con JWT.
- Cálculo de progreso por meta.
- Sugerencias automáticas semanales y mensuales.
- Detección de inactividad.
- Detección de metas en riesgo.
- Exportación de reportes en PDF.
- Validación de fechas (las metas no pueden tener fecha pasada).

### Frontend (React)
- Registro/login (JWT)
- Creación de metas (nombre, categoría, monto, fecha límite).
- Registro de aportes (fecha y cantidad).
- Panel visual con barra de progreso y sugerencias.

## 4. Reportes Generados
Los reportes son visualizados desde el frontend y también pueden ser exportados como PDF desde el backend.

### a. Reporte de Progreso de Meta
```bash
=== Progreso de Meta ===
Meta: Viaje
Objetivo: $1000
Total Aportado: $450
Progreso: 45%
-------------------------
[####---------] 45%
Mensaje: ¡Buen trabajo! Estás en el camino correcto.
```

### b. Reporte de Sugerencia de Ahorro
```bash
=== Sugerencia de Ahorro Semanal ===
Meta: Fondo de emergencia
Monto Objetivo: $1000
Total Aportado: $300
Monto Restante: $700
Semanas Restantes: 8
Ahorro Semanal Recomendado: $87.5
```

### c. Reporte de Meta en Riesgo
```bash
=== Meta en Riesgo ===
Meta: Viaje
Monto Objetivo: $500
Ahorro Semanal Necesario: $100
Total Aportado: $100
Semanas Restantes: 4
Mensaje: ¡Estás en riesgo! Necesitas ahorrar $100 por semana.
```

### d. Reporte de Inactividad
```bash
=== Alerta de Inactividad ===
Usuario: Juan Pérez
Último Aporte: 2025-04-17
Estado: Inactivo
Mensaje: "No has hecho aportes esta semana. Considera actualizar tu plan."
```

### e. Reporte de Validación de Fechas
```bash
=== Validación de Fechas ===
Meta: Fondo para vacaciones
Fecha Límite: 2025-04-20
Estado: Vencida
Mensaje: "La meta ha vencido. No alcanzaste el objetivo a tiempo."
```

### f. Reporte de Registro de Aportes por Meta
```bash
=== Reporte de Aporte por Meta ===
Meta: Fondo de emergencia
Categoría: Salud
Fecha Límite: 2025-06-30

| Fecha       | Monto | Total Acumulado | Progreso |
|-------------|--------|------------------|-----------|
| 2025-04-10  | $50    | $50              | 10%       |
| 2025-04-15  | $100   | $150             | 30%       |
| 2025-04-20  | $50    | $200             | 40%       |

Estado de la Meta: En ejecución
```

### g. Reporte por Categoría
```bash
=== Reporte por Categoría: Salud ===
Metas:
- Fondo de emergencia: $500 objetivo, $300 ahorrado (60%)
- Fondo médico: $1000 objetivo, $1000 ahorrado (Cumplida)
```

### h. Resumen General de Ahorros
```bash
=== Resumen de Ahorros ===
Total de Metas: 4
Metas Cumplidas: 1
Metas en Ejecución: 2
Metas Vencidas: 1

Total Ahorrado: $3100
Total Restante: $1400
Progreso Promedio: 77.5%
```

## 5. Seguridad
- Protección de endpoints con middleware `auth:api`.
- Emisión y validación de tokens JWT.
- Solo usuarios autenticados pueden crear metas, ver sugerencias o registrar aportes.

## 6. Base de Datos (Modelos principales)
- **User:** id, nombre, email, password
- **Goal:** id, user_id, nombre, categoría, monto objetivo, fecha límite, estado
- **Contribution:** id, goal_id, fecha, monto
- **Suggestion:** id, goal_id, valor, frecuencia (weekly/monthly), nivel de riesgo, fecha de cálculo

## 7. Estructura de Carpetas
```plaintext
/backend
  |- app
     |- Models
     |- Http/Controllers
     |- Services
     |- Repositories (opcional)
  |- routes/api.php

/frontend
  |- src
     |- components
     |- pages
     |- services
     |- utils
```

## 8. Recomendaciones
- Mantener la documentación del código con PHPDoc.
- Usar migraciones y seeders para consistencia en el esquema.
- Probar servicios clave con tests unitarios (Laravel Pest o PHPUnit).
- Implementar paginación y filtros en endpoints para escalabilidad.

## 9. Conclusión
La aplicación permite a los usuarios tomar control de su ahorro mediante metas planificadas, recomendaciones automáticas y un sistema claro de seguimiento y reportes.

Cumple con los criterios de seguridad, mantenibilidad y experiencia de usuario moderna.


