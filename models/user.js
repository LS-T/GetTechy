const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// Create user model and include checkPassword instance method
class User extends Model {
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }
}

// Define columns in user table and assign datatypes
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
  },
  {
    // Set up beforeCreate and beforeUpdate hooks to hash user password
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

// Export user model
module.exports = User;
