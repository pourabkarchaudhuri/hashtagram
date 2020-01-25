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
    if(req.body.image === undefined ||req.body.image==undefined){
        res.status(500).json({
            "message":"No image string recieved"
        })
    }
    else{
        // console.log(JSON.stringify(req.body.image))
        
        await objectDetectionHandler(req.body.image, (error, objectsDetected)=>{
       
            if(error){
                console.log(err)
                res.status(500).send({
                    error: error
                })
            }
            else{
                if(req.body.locality != undefined || req.body.locality !== undefined){
                    objectsDetected.push(req.body.locality)
                }
                
                console.log('Tag : ' + objectsDetected);
                
                console.log('Record Limit : ' + _limit);
                console.log('Recent records : ' + _recent);
                hashtagsGenerated(objectsDetected, _limit, _recent, (result)=>{
                    let responsePayload = {
                        topObjectsInScene : objectsDetected,
                        generatedHashtags : result
                    }
                res.status(200).json(responsePayload);
                })
            }
    
        })
    }
    
    
    
       
});

router.post('/dummy', async function(req, res, next) {
    const _limit = req.query.limit ? req.query.limit : defaults.INSTAGRAM_DEFAULT_FIRST;
    const _recent = req.query.recent ? req.query.recent === '1' : false;
    // console.log(JSON.stringify(req.body));

    let objectsDetected = [
        "beauty",
        "travel",
        "man",
        "car",
        "pretty",
        "mountain",
        "river",
        "food"
    ]
    // objectsDetected.push(req.body.locality);
    if(req.body.locality != undefined || req.body.locality !== undefined){
        objectsDetected.push(req.body.locality)
    }
    hashtagsGenerated(objectsDetected, _limit, _recent, (result)=>{
        let responsePayload = {
            topObjectsInScene : objectsDetected,
            generatedHashtags : result
        }
        res.status(200).json(responsePayload);
    })       
});

router.get('/popularity/:tag', async function(req, res, next) {
    const _limit = req.query.limit ? req.query.limit : defaults.INSTAGRAM_DEFAULT_FIRST;
    const _recent = req.query.recent ? req.query.recent === '1' : false;
    const _hashtag = req.params.tag;

    console.log('Tag ' + _hashtag);
    console.log('Record Limit ' + _limit);
    console.log('Recent records ' + _recent);

    res.json({
        hashtag: _hashtag,
        posts: await hashtagPopularity(_hashtag)
    });
});

module.exports = router;