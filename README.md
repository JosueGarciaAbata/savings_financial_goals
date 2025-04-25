# Simulador de Ahorro y Metas Financieras

## 1. Información General
**Nombre del Proyecto:** Simulador de Ahorro y Metas Financieras  
**Tipo de Aplicación:** Web  
**Arquitectura:** Separación frontend-backend con comunicación vía API REST  
**Tecnologías:**
- **Frontend:** NodeJS v22.11.0+, ReactJS, Material UI
- **Backend:** PHP 8.2+, Laravel 12 (API REST)
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

- Todos los reportes utilizan autenticación JWT y solo muestran datos del usuario autenticado.
- Los reportes se generan con **DomPDF** y se sirven en formato `application/pdf`.
- El estilo es coherente en todos los documentos, lo que garantiza profesionalismo y claridad.

### 1. **Reporte General de Metas**
**Ruta:** `/api/reports/generalReport`  
**Descripción:**  
Este reporte muestra un resumen completo de todas las metas de ahorro asociadas al usuario autenticado. Cada meta es presentada en una tabla con sus principales atributos.

**Datos mostrados:**
- Nombre de la meta
- Estado (`Activo`, `Completado`, `Vencido`)
- Monto objetivo
- Total aportado
- Fecha límite
- Porcentaje de progreso

**Características:**
- Ordenadas de forma simple (sin agrupaciones)
- Estilo limpio y profesional, ideal para una vista rápida del estado general del usuario

---

### 2. **Reporte de Metas por Categoría**
**Ruta:** `/api/reports/categoryReport`  
**Descripción:**  
Este reporte organiza las metas de ahorro del usuario por categorías. Cada categoría contiene una tabla que muestra las metas que le pertenecen, permitiendo visualizar agrupadamente los objetivos financieros por tipo.

**Datos mostrados por categoría:**
- Nombre de la meta
- Estado
- Monto objetivo
- Total aportado
- Fecha límite
- Progreso obtenido

**Características:**
- Agrupación visual por categorías
- Estilo uniforme con el reporte general
- Útil para analizar el progreso según tipos de metas

---

### 3. **Reporte de Metas por Estado**
**Ruta:** `/api/reports/statusReport`  
**Descripción:**  
Este reporte segmenta las metas del usuario según su estado: **Completadas**, **Vencidas**, y **En Ejecución**. Cada grupo se presenta en su propia tabla, lo que permite evaluar el desempeño del usuario frente a sus objetivos.

**Secciones del reporte:**
- Metas Completadas
- Metas Vencidas
- Metas en Ejecución

**Datos por cada meta:**
- Nombre
- Estado
- Monto objetivo
- Total aportado
- Fecha límite
- Progreso obtenido

**Características:**
- Agrupación por estado de avance
- Facilita el análisis de cumplimiento
- Enfocado en el rendimiento del usuario frente a los plazos

## 5. Seguridad
- Protección de endpoints con middleware `auth:api`.
- Emisión y validación de tokens JWT.
- Solo usuarios autenticados pueden crear metas, ver sugerencias o registrar aportes.

## 6. Base de Datos (Modelos principales)
- **User:** id, nombre, email, password
- **Goal:** id, user_id, nombre, categoría, monto objetivo, fecha límite, estado
- **Contribution:** id, goal_id, fecha, monto
- **Suggestion:** id, goal_id, valor, frecuencia (weekly/monthly), nivel de riesgo, fecha de cálculo

## 7. Guia de instalacion

## **/backend**

### 1. Clona el repositorio
```bash
git clone https://github.com/usuario/proyecto-backend.git
cd proyecto-backend
```

### 2. Instala las dependencias
```bash
composer install
```

### 3. Copia el archivo de entorno y configúralo
```bash
cp .env.example .env
```

### 4. Genera la clave de la aplicación
```bash
php artisan key:generate
```

### 5. Crea el enlace simbólico al almacenamiento (para archivos públicos)
```bash
php artisan storage:link
```

### 6. Configura la conexión a la base de datos en el archivo `.env`
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_de_tu_bd
DB_USERNAME=usuario
DB_PASSWORD=contraseña
```

### 7. Ejecuta las migraciones y seeders
```bash
php artisan migrate:refresh --seed
```

### 8. Genera la clave secreta para JWT Auth
```bash
php artisan jwt:secret
```

### Publica el archivo de configuración (si no se genera automáticamente):
```bash
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider
```

### Asegúrate de tener en tu `.env`:
```env
JWT_SECRET=la_clave_generada
JWT_TTL=60  # Opcional: tiempo de expiración en minutos
```

### 10. Configura el sistema de correos

Para habilitar el envío de notificaciones (como reportes o recordatorios por email), configura las siguientes variables en tu archivo `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_correo@gmail.com
MAIL_PASSWORD=contraseña_de_aplicacion
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=tu_correo@gmail.com
MAIL_FROM_NAME="Finance App"
```

### Levanta el servidor local
```bash
php artisan serve
```
Si puede observar la pagina del servidor sin ningun mensaje de error la instalacion es completamente satisfactoria.

## **/frontend**

Para la correcta instalacion necesita usar los siguientes comandos:

- Entrar a la carpeta

```bash
cd frontend
```

- Instalacion de los paquetes usando npm

```bash
npm install
```

Si desea conocer las variables de entorno con las que se conecta a la api creada con laravel puede revisarlas en el archivo /frontend/.env