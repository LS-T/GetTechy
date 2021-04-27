const router =  require('express').Router();


router.get('/', (req,res) => {
    res.render('random',{
        layout: 'main',
        data: {
            name: 'William',
            date: '4/27/2021'
        }
    })

});

module.exports = router;