import sequelize from '../service/db';

// 引入表结构
const user = sequelize.import('./user.js'); 
const association = sequelize.import('./association.js');

// 表关系

// 导出model
export const models = {
  user,
  association,
}