module.exports = {
  apps: [
    {
      name: "nodejs-sandclock",
      script: "./app/index.js",
      instance: 2,
      exec_mode: "cluster",
      env_development: {
        NODE_ENV: "development",
        watch: true
      },
      env_production: {
        NODE_ENV: "production",
        watch: false
      },
      env_test: {
        NODE_ENV: "test",
        watch: false
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "~/pm2_logs/err.log", // 错误日志
      out_file: "~/pm2_logs/info.log", // 流水日志,包括console.log日志
      max_restarts: 10 // 出错并停止时,连续重启次数
    }
  ]
}
