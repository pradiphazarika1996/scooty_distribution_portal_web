module.exports = {
  apps: [
    {
      name: 'mac-scholarship-web',
      cwd: '/var/www/web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
