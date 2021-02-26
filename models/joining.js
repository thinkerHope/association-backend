/* jshint indent: 2 */
/** 
 * User和Association的关系表
*/
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('joinning', {
		// identity: 0-创建者（默认社长，权限最高）1-普通干事
		identity: {
			type: DataTypes.TINYINT(2),
			allowNull: false,
			unique: false
		},
	}, {
		tableName: 'joinning',
		timestamps: true,
		underscored: true,
	})
};
  