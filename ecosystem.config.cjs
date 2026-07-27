module.exports = {
  apps: [
    {
      name: 'mother-app',
      script: 'npx',
      args: 'srvx --prod -s ../client dist/server/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: 'file:./dev.db',
      },
    },
  ],
}
