# Gamispace 🚀

Plataforma web orientada a la integración de videojuegos educativos (*Serious Games*) y asignaturas académicas. Este proyecto constituye el Trabajo de Fin de Grado (TFG) en Ingeniería Informática por la Universidad de Valladolid (UVa).

Gamispace permite a los docentes crear asignaturas, gestionar grupos de alumnos e integrar juegos desarrollados en motores como Unity, capturando en tiempo real el progreso, las puntuaciones y los tiempos de los estudiantes para generar ránkings dinámicos y fomentar la gamificación en el aula.

## 🛠️ Tecnologías Utilizadas

La arquitectura del proyecto está dividida en un entorno Cliente-Servidor desplegado de forma aislada mediante contenedores:

### Frontend

* **React + Vite:** Construcción rápida y optimizada de interfaces.
* **TypeScript:** Tipado estático para mayor seguridad y escalabilidad.
* **Arquitectura Limpia (Clean Architecture):** Separación estricta por capas (`Domain`, `DTOs`, `Mappers`, `Repositories` y `Hooks`).
* **Nginx:** Servidor web para la distribución de los archivos estáticos compilados.

### Backend

* **Node.js + Express:** Creación de la API RESTful.
* **JWT (JSON Web Tokens):** Autenticación y control de sesiones seguras.
* **MySQL 8:** Base de datos relacional para el almacenamiento de usuarios, asignaturas, juegos y métricas.
* **Integración WebBridge:** Script inyectable (`IntegrationApi.js`) para establecer un canal de comunicación bidireccional (vía `postMessage`) entre la plataforma web y los binarios WebGL de los juegos.

### Infraestructura

* **Docker y Docker Compose:** Contenerización de los servicios (Frontend, Backend y Base de datos) para un despliegue homogéneo y predecible.

## ✨ Características Principales

* **Roles de Usuario:** Control de acceso basado en permisos para Administradores, Profesores y Alumnos.
* **Gestión de Asignaturas y Grupos:** Los profesores pueden asignar juegos a materias específicas y visualizar el rendimiento agrupado.
* **Motor de Despliegue de Juegos:** Descompresión automática de archivos `.zip` (WebGL), autocorrección de directorios e inyección dinámica del script de comunicación en el `index.html` del juego.
* **Ránkings en Tiempo Real:** Clasificaciones individuales y por grupos calculadas mediante consultas SQL optimizadas (CTEs).
* **Gestión Eficiente del Ciclo de Vida:** Control automatizado de la duración de las sesiones (`Login`/`Logout`) utilizando las APIs nativas del navegador (`visibilitychange`, `pagehide`, `keepalive` y `sendBeacon`).
* **Importación Masiva:** Carga de usuarios y asignaciones de grupos mediante archivos CSV.

## 📂 Estructura del Proyecto

```text
gamification/
├── client/                 # Código fuente del Frontend (React/TS)
│   ├── src/
│   │   ├── api/            # Capas de Dominio, DTO, Mapper y Repositorio
│   │   ├── components/     # Componentes UI organizados por contexto (Play, Ranking, etc.)
│   │   ├── constants/      # Variables de entorno y rutas DRY
│   │   └── hooks/          # Custom hooks para gestión de estado y peticiones
│   └── Dockerfile
├── server/                 # Código fuente del Backend (Node/Express)
│   ├── config/             # Configuración de BD y constantes
│   ├── controllers/        # Lógica de negocio (games, users, subjects, rankings)
│   ├── public/             # Almacenamiento local de imágenes y juegos extraídos
│   └── Dockerfile
├── db/                     # Scripts de inicialización de la base de datos
│   └── gamispace.sql
└── docker-compose.yml      # Orquestación de contenedores

```

## 🚀 Instalación y Despliegue

### Requisitos Previos

* Git
* Docker y Docker Compose
* Node.js (solo para desarrollo local)

### Ejecución en Producción

El proyecto está configurado para desplegarse ágilmente mediante Docker.

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd gamification

```


2. **Configurar las variables de entorno:**
Crea un archivo `.env` en la raíz (y/o en las carpetas de cliente/servidor) basándote en un archivo `.env.example`, configurando el puerto del servidor, la URL de la API y las credenciales de MySQL.
3. **Construir y levantar los contenedores:**
```bash
docker compose up -d --build
```
Si obtienes "Error: Failed to fetch theme" espera unos segundos y recarga la página


*El flag `--build` forzará a reconstruir las imágenes si hay cambios en el código local.*
4. **Detener la plataforma:**
```bash
docker compose down

```



## 🎮 Integración de Juegos (WebBridge)

Para que un juego de Unity se comunique correctamente con la plataforma, debe estar compilado para WebGL. Al subir el `.zip` desde el panel de administración, el backend de Gamispace inyectará automáticamente un script que habilita la escucha de los siguientes eventos:

* `GAMISPACE_REQUEST_PROGRESS`: Solicita el estado previo del jugador.
* `GAMISPACE_SAVE_PLAY`: Envía los datos de una partida terminada (`level`, `score`, `time`, `completed`).

## 👨‍💻 Autor

**Javier Cueli** Estudiante de Ingeniería Informática - Universidad de Valladolid (UVa)
