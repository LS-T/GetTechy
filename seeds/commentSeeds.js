const  Comment = require('../models/comment');

const dummyCommentData = [
    {
        comment_text:"Great job!",
        user_id:1,
        post_id:1
    },
    {
        comment_text:"Well done!",
        user_id:2,
        post_id:2
    }
];

const seedDummyComments = () => Comment.bulkCreate(dummyCommentData);

module.exports = seedDummyComments;