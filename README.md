# sample-api-node-ts-sqlite3

A simple REST API server for item management, built with **TypeScript**, **Express**, and **SQLite3**.

---

## 📦 Features

- RESTful API endpoints for item CRUD operations
- JWT-based authentication (`/login`)
- SQLite3 embedded database (no external DB setup required)
- Periodic item insertion using background service
- Fully written in TypeScript with strict type checking

---

## 🛠️ Development Setup

### Requirements

- Node.js v18 or higher
- npm
- SQLite3 (embedded)

### Project Structure

```
sample-api-node-ts-sqlite3/
├── src/
│   ├── app.ts                 # Entry point
│   ├── config/                # DB setup
│   ├── controllers/           # Route handlers
│   ├── middlewares/           # JWT middleware
│   ├── models/                # DB access logic
│   ├── routes/                # Express routers
│   └── services/              # Background tasks
├── mydatabase.db              # SQLite database file
├── tsconfig.json              # TypeScript config
├── package.json               # Project metadata & scripts
└── ...
```

### Installation

```bash
# Install dependencies
npm install
```

### Run in Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Run in Production Mode

```bash
npm start
```

### Server Start Output Example

```
Server is listening on port 3000  
Successfully connected to SQLite DB.  
Items table is ready.
```

> Default port is `3000`. You can configure environment variables such as `PORT` and `JWT_SECRET`.

---

## 📄 License

This project is licensed under the ISC License.  
See the [LICENSE](./LICENSE) file for details.