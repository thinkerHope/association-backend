/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('association', {
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
      unique: true,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
      unique: false,
		},
		academy: {
			type: DataTypes.STRING,
			allowNull: false,
      unique: false,
		},
		qq: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		logo: {
			type: DataTypes.STRING,
			allowNull: false,
      unique: false,
		},
		desc: {
			type: DataTypes.STRING,
			allowNull: false,
      unique: false,
		},
		activities: {
			type: DataTypes.STRING,
      unique: false,
		},
	}, {
		tableName: 'association',
		timestamps: true,
		underscored: true,
	});
};
  