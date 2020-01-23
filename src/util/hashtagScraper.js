
const instagram = require('./relatedHashtags');
const hashtagCollector = require('./hashtag-parser')
module.exports = async function(keyword) {

    // console.log('Processing key ' + keyword);
    let result = await instagram(keyword)
    
    // let hashtagsGenerated = [];
    // console.log("Keyword : " + keyword + "" + JSON.stringify(result))
    let hashtags = await hashtagCollector(result)
    
    // console.log("Filter : " + keyword + "" + JSON.stringify(hashtags))
    // console.log(keyword, hashtags)

    return hashtags;
  
  
}