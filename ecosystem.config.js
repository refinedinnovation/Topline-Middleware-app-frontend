module.exports = {
  apps: [
    {
      name: "topline-nextjs",
      script: "npm",
      args: "start",
      cwd: "/var/www/topline-shopify-middleware/nextjsnewlivechangesmemchanbgesagain",
      watch: true,
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
