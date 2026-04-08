# Requirements Document

## Introduction

This document defines the requirements for restructuring the Hackspace Manchester membership system. The restructure covers five areas: replacing yarn with bun as the JavaScript package manager, removing the legacy jQuery/Bootstrap 3/Less frontend stack, migrating all UI to React + Inertia.js (eliminating the dual-stack), reorganising the `app/` directory to standard Laravel conventions, and hardening `.gitignore` to exclude generated artefacts. No database schema changes are required.

## Glossary

- **Bun**: A fast JavaScript runtime and package manager used as a drop-in replacement for yarn.
- **Inertia.js**: A protocol and library that connects Laravel controllers to React components without a separate API layer.
- **Inertia_Adapter**: The `inertiajs/inertia-laravel` server-side package that processes `Inertia::render()` calls.
- **React_App**: The single-page React application served via `resources/js/react-app.tsx`.
- **Vite**: The frontend build tool used to bundle JS/CSS assets.
- **Legacy_Stack**: The `resources/assets/` tree containing jQuery, Bootstrap 3, Less, and select2.
- **AppLayout**: The shared React layout component at `resources/js/Layouts/AppLayout.tsx`.
- **BB_Models**: The `BB\Models` PHP namespace, the target location for all Eloquent models.
- **BB_Services**: The `BB\Services` PHP namespace, the target location for all service/helper classes.
- **BB_Listeners**: The `BB\Listeners` PHP namespace, the target location for all event listener classes.
- **PHPUnit_Suite**: The existing test suite run via `php artisan test`.

---

## Requirements

### Requirement 1: Replace yarn with bun

**User Story:** As a developer, I want to use bun as the JavaScript package manager, so that dependency installation and builds are faster and the toolchain is consistent.

#### Acceptance Criteria

1. THE System SHALL remove `.yarnrc.yml` and `yarn.lock` from the repository.
2. THE System SHALL update the `packageManager` field in `package.json` to reference bun.
3. WHEN `bun install` is executed, THE System SHALL install all dependencies successfully and produce a `bun.lockb` lockfile.
4. WHEN `bun run build` is executed, THE System SHALL produce a successful Vite production build with no errors.
5. THE System SHALL remove the `less` devDependency from `package.json`.

---

### Requirement 2: Remove legacy frontend dependencies

**User Story:** As a developer, I want the legacy jQuery/Bootstrap 3/Less/select2 dependencies removed, so that the bundle size is reduced and the codebase has a single, modern frontend stack.

#### Acceptance Criteria

1. THE System SHALL remove `bootstrap`, `jquery`, `select2`, and `material-design-icons` from the `dependencies` section of `package.json`.
2. THE System SHALL update `vite.config.mts` so that its `input` array contains only `resources/js/react-app.tsx`.
3. WHEN `bun run build` is executed after dependency removal, THE Vite bundler SHALL complete successfully with no references to legacy asset paths.

---

### Requirement 3: Delete the legacy frontend source tree

**User Story:** As a developer, I want the `resources/assets/` directory and all legacy Blade views removed, so that there is no dead code in the repository.

#### Acceptance Criteria

1. THE System SHALL delete the `resources/assets/` directory and all its contents.
2. THE System SHALL delete `resources/views/layouts/main.blade.php`.
3. THE System SHALL delete all files under `resources/views/partials/` that serve the legacy layout (main-sidenav, js-data, flash-message).
4. FOR ALL `.blade.php` files remaining in `resources/views/`, THE System SHALL contain no `@extends('layouts.main')` directive.
5. WHEN a request is made to any migrated route, THE Inertia_Adapter SHALL serve the response via `resources/views/app.blade.php` exclusively.

---

### Requirement 4: Migrate all UI routes to React/Inertia pages

**User Story:** As a developer, I want every web route to return an `Inertia::render()` response backed by a React page, so that the UI is fully managed by React and the legacy Blade rendering path is eliminated.

#### Acceptance Criteria

1. FOR ALL controller methods that previously returned a `view()` call, THE System SHALL replace each call with a corresponding `Inertia::render()` call referencing a React page component.
2. FOR ALL `Inertia::render()` calls in the codebase, THE System SHALL have a corresponding `.tsx` file under `resources/js/Pages/` that resolves the component name.
3. THE System SHALL provide a shared `AppLayout` component at `resources/js/Layouts/AppLayout.tsx` that wraps navigation, sidebar, and flash messages for all pages.
4. WHEN a browser makes an initial (non-Inertia) GET request to any migrated route, THE Inertia_Adapter SHALL return a full HTML response rendered via `app.blade.php`.
5. WHEN a browser makes a subsequent request with the `X-Inertia: true` header, THE Inertia_Adapter SHALL return a JSON response containing `component`, `props`, `url`, and `version` fields only.

---

### Requirement 5: Reorganise the app/ directory to Laravel conventions

**User Story:** As a developer, I want the `app/` directory to follow standard Laravel naming conventions, so that the codebase is easier to navigate and onboard new contributors.

#### Acceptance Criteria

1. THE System SHALL move all files from `app/Entities/` to `app/Models/` and update their PHP namespace from `BB\Entities` to `BB\Models`.
2. THE System SHALL move all files from `app/Helpers/` to `app/Services/` and update their PHP namespace from `BB\Helpers` to `BB\Services`.
3. THE System SHALL move all files from `app/Handlers/` to `app/Listeners/` and update their PHP namespace from `BB\Handlers` to `BB\Listeners`.
4. THE System SHALL move `app/FlashNotification/` under `app/Services/FlashNotification/` and update its namespace accordingly.
5. FOR ALL PHP files in `app/`, `tests/`, `routes/`, and `config/`, THE System SHALL contain no references to the namespaces `BB\Entities`, `BB\Helpers`, or `BB\Handlers`.
6. WHEN `php artisan test` is executed after the rename, THE PHPUnit_Suite SHALL pass with no failures or errors.
7. WHEN `composer dump-autoload` is executed after the rename, THE System SHALL regenerate the autoload map without errors, as the `"BB\\": "app/"` PSR-4 mapping in `composer.json` requires no change.

---

### Requirement 6: Harden .gitignore for generated artefacts

**User Story:** As a developer, I want `.gitignore` to explicitly exclude all generated artefacts, so that build outputs and package manager caches are never accidentally committed.

#### Acceptance Criteria

1. THE System SHALL ensure `/node_modules` is present in `.gitignore`.
2. THE System SHALL ensure `/vendor` is present in `.gitignore`.
3. THE System SHALL ensure `/public/build` is present in `.gitignore`.
4. THE System SHALL ensure `/.bun` is present in `.gitignore`.
5. IF `bun.lockb` is intentionally excluded from version control, THEN THE System SHALL add `bun.lockb` to `.gitignore`; otherwise the file SHALL be committed as the canonical lockfile.
