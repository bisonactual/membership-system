# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Setup

This project runs in Docker. All commands should be run inside the container unless noted otherwise.

```bash
# Initial setup
docker-compose run laravel composer install
docker-compose run laravel npm install
docker-compose run laravel npm run production
docker-compose up -d
docker-compose run laravel php artisan migrate

# Shell access
docker-compose exec laravel bash
```

## Common Commands

```bash
# PHP tests
vendor/bin/phpunit                                      # all tests
vendor/bin/phpunit tests/AccountTest.php                # single file
vendor/bin/phpunit tests/AccountTest.php --filter name  # single test

# Frontend tests
npm test                        # all Jest tests
npm test -- --testPathPattern=ComponentName

# Linting
npm run lint                    # ESLint
npm run lint:fix
vendor/bin/phpstan analyse      # PHP static analysis

# Frontend build
npm run watch                   # dev with watch
npm run production              # production build
```

PHP tests use an in-memory SQLite database (configured in `phpunit.xml`). Frontend tests use Jest.

## Architecture

**Stack**: Laravel 7 (PHP) backend + React 19/TypeScript frontend connected via **Inertia.js v2**. MySQL 8.0 database. Docker for local development.

### Request Flow

```
Routes (routes/web.php)
  → Controllers (app/Http/Controllers/)
    → Services (app/Services/) / Process classes (app/Process/)
      → Eloquent Models (app/Entities/)
        → MySQL database
```

Inertia.js bridges Laravel controllers and React components — controllers return `Inertia::render('PageName', $props)` and React pages live in `resources/js/Pages/`. No separate API for frontend data; Inertia handles the handoff.

### Key Domain Areas

- **Membership lifecycle**: Members have statuses (`setting-up`, `active`, `payment-warning`, `suspended`, `leaving`, `left`, `honorary`). Status transitions are handled by `app/Process/` classes, triggered by Artisan commands (`bb:check-memberships`).

- **Payments**: GoCardless integration for Direct Debit. Payment logic lives in `app/Services/Payment/` and `app/Services/MemberSubscriptionCharges.php`. Members also have a credit balance for equipment usage.

- **Training/Inductions**: Two systems — the older general inductions and a newer course-based system. Models: `Induction`, `Course`, `CourseCompletion`. Trainer assignments handled via `InductionArea`.

- **Equipment & Access**: RFID key fob management (`KeyFob`), door entry logs, equipment areas with maintainer groups. Equipment usage auto-bills member credit.

- **Notifications**: Laravel notifications + Telegram integration for admin alerts. Discourse SSO for forum integration.

### Frontend Structure

`resources/js/` contains:
- `Pages/` — Inertia page components (one per route)
- `Components/` — Shared React components
- `Layouts/` — Page layout wrappers
- `utils/` and `types/` — Shared utilities and TypeScript types

UI uses **MUI v6** (Material UI). Legacy views in `resources/views/` use Blade + Bootstrap 3 + jQuery (`resources/assets/js/`).

### Notable Patterns

- `app/Entities/` holds all Eloquent models (not `app/Models/`)
- All model changes are audit-logged automatically
- Background jobs in `app/Jobs/` (Discourse sync, balance recalculation)
- Event/Listener system in `app/Events/` + `app/Listeners/`

## Third-Party Integrations

| Service | Purpose | Config key |
|---------|---------|------------|
| GoCardless | Direct Debit payments | `GOCARDLESS_ACCESS_TOKEN` |
| Discourse | SSO + forum | `DISCOURSE_URL`, `SSO_KEY` |
| Telegram | Admin notifications | `TELEGRAM_BOT_KEY` |
| Sentry | Error monitoring | `SENTRY_LARAVEL_DSN` |
| Mailhog | Local email testing | `MAIL_HOST=mailhog` |
