module.exports = {
  apps: [{
    name: 'nodejs_cronjob',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false
  }]
};
