const { Model, Datatypes, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Create user model and include checkPassword instance method

class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW,this.password);
    }
};

// Define columns in user table and assign datatypes
User.init(
    {
        id: {
            type:Datatypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        username: {
            type:Datatypes.STRING,
            allowNull:false,
            unique:true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                // Password must be at least 7 characters long 
                len: [7]
            }
        }
    },
    {
        // Set up beforeCreate and beforeUpdate hooks to hash user password 
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password,10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    },
    
);

// Export user model
module.exports = User;