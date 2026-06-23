module.exports = {
  apps: [
    {
      name: 'openmaic',
      script: 'server.js',
      // If running PM2 from the project root, cwd should point to the standalone directory.
      // If running PM2 from inside the standalone directory, change cwd to './'.
      cwd: './.next/standalone',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 7701,
        HOSTNAME: '0.0.0.0'
      }
    }
  ]
};
