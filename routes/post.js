const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


router.get('/', (req, res)=>{
    res.send('my post now');
});


router.get('/spesific', (req, res)=>{
    res.send('my spesific post now');
});


router.post('/', (req, res)=>{
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc
    })
    post.save().then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json({message: err})
    })
})

module.exports = router;