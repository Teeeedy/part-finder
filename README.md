# Part Finder

This is a full stack project with a React frontend, Laravel backend, and MySQL database.

## Tech Stack

- **Frontend:** React
- **Backend:** Laravel 12
- **Database:** MySQL
- **Admin Tool:** PhpMyAdmin
- **Containerization:** Docker

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/Teeeedy/part-finder.git
cd part-finder
```

### Step 2: Start Docker Containers

Running this command will automatically start all four services React, Laravel, MySQL and PhpMyAdmin at these ports. Please make sure these ports are available for use.

```bash
docker compose up -d --build
```

| Service    | Port |
| ---------- | ---- |
| Laravel    | 8000 |
| React      | 5173 |
| MySQL      | 3306 |
| PhpMyAdmin | 8080 |

### Step 3: Seed The Datbase

There is already a `seed_data.sql` in the backend folder. Run this command to seed the database. It will take some time about 2-3 minutes.

```bash
docker exec -i mysql mysql -u root -proot part_finder < ./backend/seed_data.sql
```

### Step 4: Create a Dummy User And Generate API Token For Auth

To mimic authentication using Laraval Sanctum. We create a dummy user in the database. Generate a token for that user. And finally we copy that token to the environment variable `VITE_API_TOKEN` on the frontend.

```bash
docker exec -it laravel php artisan tinker
```

```bash
$user = \App\Models\User::firstOrCreate(
    ['email' => 'dummy@example.com'],
    ['name' => 'Dummy', 'password' => bcrypt('password')]
);
$token = $user->createToken('react-frontend')->plainTextToken;
$token;
```

## Access Links For The App

```bash
Frontend: http://localhost:5173
Backend: http://localhost:8000
PhpMyAdmin: http://localhost:8080
```

## API Routes – Laravel Backend

All API routes are prefixed with `/api` and are protected by Laravel Sanctum authentication. You must include the API token as a Bearer token in the `Authorization` header.

### Base URL

The base URL is set via environment variable in the frontend:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

### Endpoints

| Route                                          | Method | Description                                 |
| ---------------------------------------------- | ------ | ------------------------------------------- |
| `/api/makes`                                   | GET    | Get all available vehicle makes             |
| `/api/makes/{make_id}/models`                  | GET    | Get all models for a specific make          |
| `/api/makes/{make_id}/models/{model_id}/types` | GET    | Get all types for a specific make and model |
| `/api/parts?make_id=X&model_id=Y&type_id=Z`    | GET    | Get all matching parts for selected filters |

## License

This project is only for demonstration.
