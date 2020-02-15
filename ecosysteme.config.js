module.exports = {
  apps: [
    {
      name: "<your application name>",
      script: "src/",
      watch: true,
      env: {
        PORT: 3000, // you can choose
        NODE_ENV: "development"
      },
      env_production: {
        PORT: 3000, // you can choose
        NODE_ENV: "production",
      }
    }
  ]
};
