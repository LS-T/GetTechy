const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", (req, res) => {
  res.render('homepage');
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get('/dashboard', withAuth, async (req,res) => {
  try {
      const postData = await Post.findAll({
          include: [
              {
                  model:User,
                  attributes:['username']
              },
          ],
      });
      const findPosts = postData.map((post) => {
          post.get({ plain: true });
      })

      console.log(findPosts);

      res.render('dashboard',{
          findPosts,
          logged_in: req.session.logged_in
      });




  } catch (err) {
      res.status(500).json(err)
    };
  
})

module.exports = router;
