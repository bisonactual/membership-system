# Hackspace Manchester Membership System

Member management system for [Hackspace Manchester](https://hacman.org.uk). Handles signups, subscriptions, equipment inductions, access control, and more.

Built with Laravel 12, PHP 8.3, React 19, Inertia.js, MUI, and MySQL 8.

## Quick Start

Prerequisites: [Docker](https://www.docker.com/) and [Bun](https://bun.sh/) installed.

```bash
# 1. Clone the repo
git clone https://github.com/bisonactual/membership-system.git
cd membership-system

# 2. Copy environment file
cp .env.example .env

# 3. Start Docker containers
docker compose up -d

# 4. Install PHP dependencies
docker compose exec laravel composer install

# 5. Generate app key
docker compose exec laravel php artisan key:generate

# 6. Wait ~30 seconds for MySQL to initialise, then run migrations
docker compose exec laravel php artisan migrate

# 7. Install JS dependencies and build frontend
bun install
bun run build

# 8. Visit http://localhost:8080
```

## Creating a Test User

```bash
docker compose exec laravel php artisan tinker --execute="
\$user = BB\Models\User::create([
    'given_name' => 'Test', 'family_name' => 'Admin',
    'display_name' => 'testadmin', 'email' => 'admin@test.com',
    'password' => 'testpassword1', 'status' => 'active',
    'active' => true, 'trusted' => true, 'induction_completed' => true,
    'payment_method' => 'cash', 'monthly_subscription' => 25,
    'hash' => md5('admin@test.com'),
]);
\$role = BB\Models\Role::where('name', 'admin')->first();
if (\$role) { \$role->users()->attach(\$user->id); }
echo 'Created admin user: admin@test.com / testpassword1';
"
```

## Running Tests

```bash
docker compose exec laravel php artisan test
```

## Development

For frontend development with hot reload:

```bash
bun run dev
```

Then visit `http://localhost:8080`. Vite handles hot module replacement.

## Common Commands

```bash
# Clear all caches
docker compose exec laravel php artisan optimize:clear

# Run a specific artisan command
docker compose exec laravel php artisan [command]

# Open a shell in the container
docker compose exec laravel bash

# View logs
docker compose logs laravel
docker compose logs mysql

# Stop everything
docker compose down

# Stop and wipe database
docker compose down -v
```

## Tech Stack

- **Backend**: Laravel 12, PHP 8.3
- **Frontend**: React 19, Inertia.js v2, MUI v6, TypeScript
- **Database**: MySQL 8.0
- **Build**: Vite 5, Bun
- **Payments**: GoCardless
- **Auth**: Session-based with CSRF, rate-limited login
- **SSO**: Discourse integration

## Project Structure

```
app/
├── Console/Commands/    # Artisan commands (billing, membership checks)
├── Data/                # DTOs and value objects
├── Events/              # Domain events
├── Exceptions/          # Custom exceptions
├── Http/Controllers/    # Route controllers (all return Inertia responses)
├── Listeners/           # Event listeners (payment, subscription handlers)
├── Models/              # Eloquent models
├── Services/            # Business logic (GoCardless, Telegram, etc.)
├── Repo/                # Repository pattern classes
├── Process/             # Background process classes
└── Providers/           # Service providers

resources/js/
├── Components/          # Shared React components
├── Layouts/             # MainLayout (nav, sidebar, flash messages)
├── Pages/               # Inertia page components (one per route)
├── types/               # TypeScript type definitions
└── react-app.tsx        # Inertia app entry point
```

## Third-Party Services

All optional for local development:

- **GoCardless**: Direct debit payments (sandbox mode in dev)
- **Discourse**: SSO integration for forum
- **Telegram**: System notifications
- **Sentry**: Error monitoring
- **Mailhog**: Email testing (included in Docker, visit `http://localhost:8025`)
