const sequelize = require('../config/connection');
const seedPost = require('./postSeeds');
const seedComments = require('./commentSeeds');
const createUserData = require('./userData');


// Async function - Don't run till all awaits have been satisfied
const seedAll = async () => {
    await sequelize.sync({ force: true });

    await createUserData();

    await seedPost();

    await seedComments ();

    process.exit(0);
}

seedAll();