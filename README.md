```markdown
# Gamispace 🚀

Web platform aimed at the integration of educational video games (*Serious Games*) and academic subjects. This project constitutes the Bachelor's Thesis (TFG - *Trabajo de Fin de Grado*) in Computer Engineering at the University of Valladolid (UVa).

Gamispace allows teachers to create subjects, manage student groups, and integrate games developed in engines like Unity. It captures students' progress, scores, and times in real-time to generate dynamic leaderboards and foster gamification in the classroom.

## 🛠️ Technologies Used

The project's architecture is divided into a Client-Server environment deployed in isolated containers:

### Frontend

* **React + Vite:** Fast and optimized interface building.
* **TypeScript:** Static typing for enhanced safety and scalability.
* **Clean Architecture:** Strict separation by layers (`Domain`, `DTOs`, `Mappers`, `Repositories`, and `Hooks`).
* **Nginx:** Web server for distributing the compiled static files.

### Backend

* **Node.js + Express:** RESTful API creation.
* **JWT (JSON Web Tokens):** Secure authentication and session control.
* **MySQL 8:** Relational database for storing users, subjects, games, and metrics.
* **WebBridge Integration:** Injectable script (`IntegrationApi.js`) implementing an Inversion of Control pattern to establish an event-based reactive channel (via `postMessage`) between React and the WebGL binaries.

### Infrastructure

* **Docker and Docker Compose:** Containerization of services (Frontend, Backend, and Database) for a consistent and predictable deployment.

## ✨ Main Features

* **User Roles:** Permission-based access control for Administrators, Teachers, and Students.
* **Subject and Group Management:** Teachers can assign games to specific subjects and view grouped performance.
* **Game Deployment Engine:** Automatic decompression of `.zip` files (WebGL), automated directory correction, and dynamic injection of the communication script into the game's `index.html`.
* **Real-Time Leaderboards:** Individual and group rankings calculated using optimized SQL queries (CTEs).
* **Efficient Lifecycle Management:** Automated session duration control (`Login`/`Logout`) utilizing native browser APIs (`visibilitychange`, `pagehide`, `keepalive`, and `sendBeacon`).
* **Deterministic Synchronization:** Elimination of race conditions and network latency through an asynchronous, reactive bridge between the game engines and the web environment.
* **Bulk Import:** Loading of users and group assignments via CSV files.

## 📂 Project Structure

```text
gamification/
├── client/                 # Frontend source code (React/TS)
│   ├── src/
│   │   ├── api/            # Domain, DTO, Mapper, and Repository layers
│   │   ├── components/     # UI Components organized by context (Play, Ranking, etc.)
│   │   ├── constants/      # Environment variables and DRY routes
│   │   └── hooks/          # Custom hooks for state and request management
│   └── Dockerfile
├── server/                 # Backend source code (Node/Express)
│   ├── config/             # DB configuration and constants
│   ├── controllers/        # Business logic (games, users, subjects, rankings)
│   ├── public/             # Local storage for images and extracted games
│   └── Dockerfile
├── db/                     # Database initialization scripts
│   └── gamispace.sql
└── docker-compose.yml      # Container orchestration




## 🚀 Installation and Deployment

### Prerequisites

* Git
* Docker and Docker Compose
* Node.js (only for local development)

### Running in Production

The project is configured for agile deployment using Docker.

1. **Clone the repository:**

```bash
git clone <repository-url>
cd gamification


```

2. **Configure environment variables:**
Create a `.env` file in the root directory (and/or in the client/server folders) based on a `.env.example` file, configuring the server port, API URL, and MySQL credentials.
3. **Build and spin up the containers:**

```bash
docker compose up -d --build


```

*If you get an "Error: Failed to fetch theme", wait a few seconds and refresh the page. The `--build` flag will force rebuilding the images if there are changes in the local code.*

4. **Stop the platform:**

```bash
docker compose down


```

## 🎮 Communication Architecture (Game - Platform)

For a Unity game to communicate correctly with the platform, it must be compiled for WebGL. Upon uploading the `.zip` from the admin panel, the backend will automatically inject a reactive bridge utilizing an Inversion of Control model to ensure secure communication and prevent latency-induced race conditions (Cold Starts).

The bidirectional flow enables listening to the following events:

* **`GAMISPACE_PLATFORM_READY`:** Signal emitted by React when the iframe finishes loading. It raises a safety flag to wake up the game engine only when the web environment is secure to transmit.
* **`GAMISPACE_REQUEST_PROGRESS`:** Deterministic request from the game engine to retrieve the player's previous state.
* **`GAMISPACE_SAVE_PLAY`:** Asynchronous submission of completed game data (`level`, `score`, `time`, `completed`). The web app persists the session and returns an acknowledgment to the game to update the UI in real-time.

## 👨‍💻 Author

**Javier Cueli** Computer Engineering Student - University of Valladolid (UVa)

```

```

```