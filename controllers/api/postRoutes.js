const router = require("express").Router();
const { Post, } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req,res) => {
    try { 
        const deletePost = await Post.destroy({
            where: {
                id:req.params.id,
                // user_id:req.session.user_id
            }
        });
        
        
        res.status(200).json(deletePost);

    } catch (err) {
        res.status(404).json(err);
    }
});


module.exports = router;