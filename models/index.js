import sequelize from '../service/db';

// 引入表结构
const user = sequelize.import('./user.js'); 
const association = sequelize.import('./association.js');
const joinning = sequelize.import('./joining.js');

// 导出model
export const models = {
  user,
  association,
  joinning,
}