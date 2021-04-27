const User = require('../models/user');
const userData = [
    {
        username: 'Johnson',
        password: '12345'
    },
    {
        username: 'Kim',
        password: '54321'
    },
    {
        username: 'Harrison',
        password: '4444'
    }
];

const createUserData = () => User.bulkCreate(userData);
module.exports = createUserData;