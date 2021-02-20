/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('association', {
		association_id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
      unique: false,
		},
		type: {
			type: DataTypes.STRING(20),
			allowNull: false,
      unique: false,
		},
		academy: {
			type: DataTypes.STRING(20),
			allowNull: false,
      unique: false,
		},
		qqList: {
			type: DataTypes.STRING(20),
			allowNull: false,
      unique: false,
		},
		members: {
			type: DataTypes.STRING(20),
			allowNull: false,
      unique: false,
		},
		logo: {
			type: DataTypes.STRING(20),
			allowNull: false,
      unique: false,
		},
		desc: {
			type: DataTypes.STRING(20),
			allowNull: false,
      unique: false,
		},
		create_time: {
			type: DataTypes.BIGINT,
			allowNull: false,
      unique: false,
		},
		update_time: {
			type: DataTypes.BIGINT,
			allowNull: false,
      unique: false,
		}
	}, {
		tableName: 'association'
	});
};
  