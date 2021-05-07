const router = require("express").Router();
const { Post, User, } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
    try{
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        
        res.status(200).json(newPost);
        console.log(newPost)
    } catch (err) {
        res.json(500).json(err);
    }
});

router.delete('/:id', async (req,res) => {
    try { 
        const deletePost = await Post.destroy({
            where: {
                id:req.params.id,
                 
            }
        });
        
        
        res.status(200).json(deletePost);

    } catch (err) {
        res.status(404).json(err);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const tryPost = await Post.findByPk(req.params.id,{
            include: [{model: User }],
        });
        
        
        
        
        
        if(tryPost === null) {
            console.log("notfound");
        } else {
            console.log(tryPost);
        }
        const Posts = tryPost.get({plain: true});
        
        if(Posts === null) {
            console.log('nope')
        } else {
            console.log(Posts)
        }
        

        res.render('singlePost' , {Posts, logged_in: req.session.logged_in})

    } catch (err) {
        console.log(err);
    }
})


module.exports = router;