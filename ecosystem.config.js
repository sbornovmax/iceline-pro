module.exports = {
  apps: [
    {
      name: 'iceline-pro',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      cwd: '/var/www/iceline-pro',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      error_file: '/var/log/pm2/iceline-error.log',
      out_file: '/var/log/pm2/iceline-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
