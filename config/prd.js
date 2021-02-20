export default{
  mysql: {
    database: 'association',
    username: 'root',
    password: 'zrr_215888',
    params: {
      host: '127.0.0.1',
      port:'3306',
      dialect: 'mysql',
      define: {
        'underscored': true,
        'timestamps':false,
      },
      timezone:'+08:00',
      logging: console.log,//日志
      operatorsAliases: false,
      sync:{force:false},//强制同步表格
      pool: {//连接池
        max: 1000,
        min: 0,
        idle: 30000
      }
    },
  },
}