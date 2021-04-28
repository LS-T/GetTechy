const router = require("express").Router();
const { Post } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map((post) => {
      post.get({plain: true })
    })
    console.log(posts);
    res.render('homepage', posts);
  } catch (err) {
    res.status(500).json(err);
  }
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

module.exports = router;
