# TanStack Start - Basic Auth Example

A TanStack Start example demonstrating authentication patterns and protected routes.

- [TanStack Router Docs](https://tanstack.com/router)
- [TanStack Start Docs](https://tanstack.com/start)

## Quick Start

```bash
# Clone the repo
git clone https://github.com/TanStack/router.git
cd examples/react/start-basic-auth

# Or use gitpick to create a new project from this example
npx gitpick TanStack/router/tree/main/examples/react/start-basic-auth my-auth-app
cd my-auth-app
```

## Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 9 (recommended) or npm/yarn

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Generate the Prisma Client
pnpm prisma-generate

# 3. Create the SQLite database (optional — auto-created on first run)
# pnpm prisma migrate dev --name init

# 4. Start the dev server
pnpm dev
```

The app will be available at **http://localhost:3000**.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Run production build (requires `pnpm build` first) |
| `pnpm prisma-generate` | Regenerate Prisma Client after schema changes |
| `pnpm prisma migrate dev` | Create/apply migrations |
| `pnpm prisma studio` | Open Prisma Studio GUI |

## Project Structure

```
src/
├── routes/
│   ├── _authed.tsx       # Protected route layout (requires login)
│   ├── login.tsx         # Login page
│   ├── signup.tsx        # Signup page
│   └── index.tsx         # Home page (redirects to /app)
├── utils/
│   ├── prisma.ts         # Prisma client (lazy singleton for SSR)
│   └── session.ts        # Session management
├── components/
│   ├── Auth.tsx          # Shared auth form
│   └── Login.tsx         # Login component
├── router.tsx            # Router configuration
└── routeTree.gen.ts      # Auto-generated route tree
```

## Database

This example uses **SQLite** via [`@libsql/client`](https://github.com/libsql/libsql) with the Prisma [driver adapter](https://www.prisma.io/docs/orm/overview/databases/sqlite#driver-adapters).

- **Dev database**: `file:./dev.db` (created automatically)
- **Schema**: `prisma/schema.prisma`
- **Generated client**: `src/prisma-generated/`

To switch to Turso (remote SQLite), set `DATABASE_URL` and `TURSO_AUTH_TOKEN` in `.env` and update the adapter in `src/utils/prisma.ts`.

## Authentication Flow

1. **Signup** (`/signup`) — creates user + session, redirects to `/`
2. **Login** (`/login`) — verifies credentials + session, redirects to `/`
3. **Protected routes** — wrapped in `/_authed` layout; redirects to `/login` if unauthenticated
4. **Session** — cookie-based via `@tanstack/react-start` session API

Passwords are hashed with PBKDF2 (SHA-256, 100k iterations).

## Common Issues

### Prisma "Cannot read properties of undefined (reading 'graph')" error

If you see this error at startup:

```
TypeError: Cannot read properties of undefined (reading 'graph')
    at new ni (node_modules/@prisma/param-graph/src/serialization.ts:305:46)
```

**Cause**: `PrismaClient` was initialized at module-import time, before the SSR environment was ready.

**Fix**: This repo uses a **lazy singleton** in `src/utils/prisma.ts` — `PrismaClient` is created on first use, not at import. If you modify `prisma.ts`, keep this pattern:

```ts
let _prismaClient: PrismaClient | null = null

export function getPrismaClient(): PrismaClient {
  if (!_prismaClient) {
    const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL || 'file:./dev.db' })
    _prismaClient = new PrismaClient({ adapter })
  }
  return _prismaClient
}
```

### Port already in use

Change the port in `vite.config.ts`:

```ts
server: { port: 3001 },
```

### Database locked / migration issues

Delete the dev database and regenerate:

```bash
rm -f dev.db prisma/dev.db
pnpm prisma migrate dev --name init
pnpm prisma-generate
```

## Deployment

### Build for production

```bash
pnpm build
```

### Run production server

```bash
pnpm start
```

For Docker, Cloudflare, Vercel, etc., see the [TanStack Start deployment docs](https://tanstack.com/start/latest/docs/framework/react/deployment).

## License

MIT