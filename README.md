# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Prisma

### Setup

1. **Pull the Schema**: To pull the schema from your database, run:
    ```bash
    npx prisma db pull
    ```

2. **Generate Prisma Client**: After pulling the schema, you need to generate the Prisma Client to interact with your database:
    ```bash
    npx prisma generate
    ```

3. **Open Prisma Studio**: To visualize and interact with your database, you can use Prisma Studio:
    ```bash
    npx prisma studio
    ```