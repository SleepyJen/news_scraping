const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.News.find().then(news => {
        res.json(news);
    });
});

router.post('/newNews', (req, res) => {
    db.News.create({
        headline: req.body.headline,
        summary: req.body.summary,
        url: req.body.url
    }).then(result => {
        res.json(result);
    });
});

router.post('/comment/:id', (req, res) => {
    db.News.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $push: {
                comments: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    comment: req.body.comment
                }
            }
        }).then(result => {
            res.json(result);
        }).catch((err) => {
            res.send(err);
        });
});

module.exports = router;