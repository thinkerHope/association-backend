/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    class: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    sno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    academy: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    joinedAssociations: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    identity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    avatar: {
      type: DataTypes.STRING,
      unique: false,
    },
    joinedActivities: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'user'
  });
};
