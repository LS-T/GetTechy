const Post = require('../models/post');

const postData = [{
    title:'Test1',
    content:"If a particular field of a model is set to not allow null (with allowNull: false) and that value has been set to null, all validators will be skipped and a ValidationError will be thrown.",
    user_id:1
},
{
    title: 'Test2',
    content:"Testing number 2",
    user_id:2

}

];

const createDummyPosts = () => Post.bulkCreate(postData);

module.exports = createDummyPosts;