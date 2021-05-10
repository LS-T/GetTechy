const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  res.render("homepage");
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

router.get("/profile", withAuth, async (req, res) => {
  try {
    const myProfile = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = myProfile.get({ plain: true });

    console.log(user);

    res.render("myprofile", { ...user, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    console.log(postData);
    const findPosts = postData.map((post) => {
      return post.get({ plain: true });
    });

    console.log(findPosts);
    res.render("dashboard", { findPosts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
