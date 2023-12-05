module.exports = {
  apps: [
    {
      name: 'datn-fe',
      script: '/home/ubuntu/.nvm/versions/node/v18.15.0/bin/serve',
      args: ['-s', 'dist', '-l', '5173'],
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};

