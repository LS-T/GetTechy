
const router = require('express').Router();
const { Comment, User, Post } = require('../../models')
const withAuth = require('../../utils/auth');

router.post("/:id", async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.params.id,
      });
      res.status(200).json(newComment);
  
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
});

router.get("/:id", withAuth, async (req, res) => {
    try {
  
      const commentData = await Comment.findAll({
        where: { post_id: req.params.id },
        include: [{ model: User }],
      });
  
  
      const comments = commentData.map((comment) => comment.get({ plain: true }));

      const tryPost = await Post.findByPk(req.params.id,{
        include: [{model: User }],
    });
  
    const Posts = tryPost.get({plain: true});


      res.render("singlepost", {
        Posts,
        comments,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });









module.exports = router;

