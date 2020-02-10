const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', (req, res) => {
    db.News.find().then(news => {
        res.json(news);
    });
});

router.get('/findByTitle', (req, res) => {
    db.News.find({
        headline: req.body.headline
    }).then(result => {
        res.json(result);
    });
});

router.get('/scrape', (req, res) => {
    axios.get('https://www.cnet.com/topics/tech-industry/').then(respose => {
        let $ = cheerio.load(respose.data);
        let obj = [];
        $('div.assetBody').each((index, element) => {
            const headline = $(element)
                .find('h2').text().trim().split();
            const summary = $(element)
                .find('p').text().split();
            const url = $(element)
                .find('a').attr('href').split();

            db.News.find({
                headline: headline
            }).then(result => {
                if (result.length > 0) {
                } else {
                    let newObj = {}
                    newObj.headline = headline.toString();
                    newObj.summary = summary.toString();
                    fullUrl = "https://www.cnet.com/" + url.toString();
                    newObj.url = fullUrl;
                    console.log(newObj);

                    db.News.create(newObj).then(result => {
                    }).catch((err) => res.json(err));
                }
            });
        });
        res.send("success");
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