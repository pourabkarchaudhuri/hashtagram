const express = require('express');
const router = express.Router();
const hashtagsGenerated = require('./util/hashtagGenerator');
const defaults = require('./../config/defaults');
const objectDetectionHandler = require('./services/clarifai')
const hashtagPopularity = require('./util/tagPopularity');

/* GET Ststus Respone. */
router.get('/health', (req, res)=>{
    res.send({
        status: true
    })
})

router.post('/predict', async function(req, res, next) {
    const _limit = req.query.limit ? req.query.limit : defaults.INSTAGRAM_DEFAULT_FIRST;
    const _recent = req.query.recent ? req.query.recent === '1' : false;

    await objectDetectionHandler(req.body.image, (error, objectsDetected)=>{
       
        if(error){
            res.status(500).send({
                error: error
            })
        }
        else{
            console.log('Tag : ' + objectsDetected);
            console.log('Record Limit : ' + _limit);
            console.log('Recent records : ' + _recent);
            hashtagsGenerated(objectsDetected, _limit, _recent, (result)=>{
                let responsePayload = {
                    topObjectsInScene : objectsDetected,
                    generatedHashtags : result
                }
            res.status(200).send(responsePayload);
            })
        }

    })
       
});

router.post('/dummy', async function(req, res, next) {
    const _limit = req.query.limit ? req.query.limit : defaults.INSTAGRAM_DEFAULT_FIRST;
    const _recent = req.query.recent ? req.query.recent === '1' : false;

    let objectsDetected = [
        "woman",
        "fashion",
        "girl",
        "cute",
        "pretty"
    ]
    hashtagsGenerated(objectsDetected, _limit, _recent, (result)=>{
        let responsePayload = {
            topObjectsInScene : objectsDetected,
            generatedHashtags : result
        }
        res.status(200).send(responsePayload);
    })       
});

router.get('/popularity/:tag', async function(req, res, next) {
    const _limit = req.query.limit ? req.query.limit : defaults.INSTAGRAM_DEFAULT_FIRST;
    const _recent = req.query.recent ? req.query.recent === '1' : false;
    const _hashtag = req.params.tag;

    console.log('Tag ' + _hashtag);
    console.log('Record Limit ' + _limit);
    console.log('Recent records ' + _recent);

    res.send({
        hashtag: _hashtag,
        posts: await hashtagPopularity(_hashtag)
    });
});

module.exports = router;