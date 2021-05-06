const router = require("express").Router();
const { Post, } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
    try{
        const newPost = await Post.create({
            title:req.body.title,
            content:req.body.content,
            
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.json(500).json(err);
    }
});


module.exports = router;