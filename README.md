# SH27 Restaurant & Bar – Client Project

5-page responsive restaurant website with a Node/Express + MySQL backend.

```
client-project/
├── frontend/   Vite multi-page site (Home, Menus, Our Story, Reservations, Contact)
├── backend/    Express API (controllers, models, routes, middleware)
├── database/   database-schema.sql (tables + seed menu)
├── .env.example
└── README.md
```

## Setup

### 1. Database (MySQL 8+ or MariaDB 10.5+)
```bash
mysql -u root -p < database/database-schema.sql
```

### 2. Backend
```bash
cd backend
cp ../.env.example .env     # then edit DB_*, ADMIN_*, JWT_SECRET
npm install
npm run dev                 # http://localhost:5000/api/health
```

### 3. Frontend
```bash
cd frontend
echo "VITE_API_URL=http://localhost:5000/api" > .env
npm install
npm run dev                 # http://localhost:5173
```
Without `VITE_API_URL` the forms run in demo mode (simulated success, static menu).

## API
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/health` | public | Health check |
| GET | `/api/menu` | public | Menu grouped by category |
| POST | `/api/reservations` | public | Book a table (`guests,date,time,name,email,phone?,notes?`) |
| POST | `/api/contact` | public | Contact form (`name,email,subject?,message`) |
| POST | `/api/newsletter` | public | Subscribe (`email`) |
| POST | `/api/auth/login` | public | Admin login, returns JWT |
| GET | `/api/reservations?status=&date=` | admin | List reservations |
| PATCH | `/api/reservations/:id/status` | admin | `pending/confirmed/cancelled/completed` |
| GET | `/api/contact`, `/api/newsletter` | admin | View messages / subscribers |
| POST/PUT/DELETE | `/api/menu/items[/:id]` | admin | Manage menu items |

Admin routes need the header `Authorization: Bearer <token>`.

## Notes
- Public forms are rate limited and validated on the server.
- Each date+time slot accepts up to `MAX_SEATS_PER_SLOT` guests, then returns "fully booked".
- Production: set a strong `JWT_SECRET`/`ADMIN_PASSWORD`, set `CORS_ORIGIN` to your site URL, serve over HTTPS.
