module.exports = {
  apps: [
    {
      name: 'mother-app',
      script: 'npm',
      args: 'start',
      exec_mode: 'fork',
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
