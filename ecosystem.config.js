module.exports =  {
  apps: [
    {
      name: 'jj-book',
      port: '8080',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.js'
    }
  ]
}