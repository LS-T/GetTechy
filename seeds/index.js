const sequelize = require('../config/connection');
const createUserData = require('./userData');


const seedAll = async () => {
    await sequelize.sync({ force: true });

    await createUserData();

    process.exit(0);
}

seedAll();