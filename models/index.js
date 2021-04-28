const Comment = require('./comment');
const User = require('./user');
const Post = require('./post');


// Setup associations between tables
Post.belongsTo(User, {
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey:'userId',
    onDelete:'CASCADE'
});

Comment.belongsTo(Post,{
    foreignKey: 'post_id',
    onDelete:'CASCADE'
});

User.hasMany(Post, {
    foreignKey:'user_id'
});

User.hasMany(Comment,{
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey:'post_id',
    onDelete:'CASCADE'
});

module.exports = { User, Post, Comment };



