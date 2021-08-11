const { Sequelize, DataTypes, Model } = require('sequelize');

// const sqlite3 = require('sqlite3').verbose();


// 方法 1: 传递一个连接 URI
// const sequelize = new Sequelize('sqlite::memory:') // Sqlite 示例
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Postgres 示例

// 方法 2: 分别传递参数 (sqlite)
const sequelize = new Sequelize({
  // username: 'root',
  // password: 'zxhq029',
  database: 'main',
  dialect: 'sqlite',
  storage: 'D:\\soft\\nginx\\www\\shark_weight_electron\\Data\\AWS.db'
});

const WeighingRecord = sequelize.define('WeighingRecord', {
  'AutoNo':{
    'type' : DataTypes.INTEGER,
    'defaultValue': '',
    'primaryKey':true
  }
}, {
    'tableName':'WeighingRecord',
    'timestamps': false
});

var ins = (async () => {
  await WeighingRecord.create({
    'AutoNo' : 3,
  });
})();
console.log(ins);
// async function main(){
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//     console.log(WeighingRecord);
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// main();