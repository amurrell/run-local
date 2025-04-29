module.exports = {
  apps: [
    {
      name: "laravel-horizon",
      script: "artisan",
      interpreter: "php",
      args: "horizon",
      cwd: "/var/www/site",
      autorestart: true,
      watch: false,
      max_restarts: 10,
    },
  ],
};
