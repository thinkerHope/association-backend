/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    userclass: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: false,
    },
    sno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    academy: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    joinedAssociations: {
      type: DataTypes.STRING,
      unique: false,
    },
    // 0-男生 1-女生
    gender: {
      type: DataTypes.TINYINT(2),
      unique: false,
    },
    avatar: {
      type: DataTypes.STRING,
      unique: false,
    },
    joinedActivities: {
      type: DataTypes.STRING,
      unique: false,
    },
    birth: {
      type: DataTypes.STRING,
      unique: false,
    },
    profile: {
      type: DataTypes.STRING,
      unique: false,
    },
    // 信息是否完善, 0-完善，1-待完善
    // TINYINT(2)
    isInfoComplete: {
      type: DataTypes.TINYINT(2),
      unique: false,
    },
  }, {
    tableName: 'user',
    timestamps: true,
		underscored: true,
  });
};
