module.exports = {
  apps : [{
    name: 'Hashtagram API',
    script: 'index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
  
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
