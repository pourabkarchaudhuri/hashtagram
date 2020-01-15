const instagram = require('./instagram');
const hashtagCollector = require('./hashtag-parser')
const natural = require('natural')
const countryDetector = require("country-in-text-detector");

function hasNumber(str) {
    return /\d/.test(str);
}

module.exports = async function(_hashtags, _limit, _recent, callback){
        var allHashtags = [];
        var result = [];
        var hashtagsGenerated = [];
        
        (async () => {
            for (const item of _hashtags) {
                    let result = await instagram(item, _limit, _recent)
                    let hashtags = await hashtagCollector(result)
                    console.log(item);
                    hashtagsGenerated.push(hashtags)
            }
            console.log('Done');
            hashtagsGenerated = [].concat.apply([], hashtagsGenerated)
            // console.log("All Hashtags generated : " + JSON.stringify(hashtagsGenerated))
            console.log("All Hashtags Length : ", hashtagsGenerated.length);

            var filteredNames = [];
            for(var i=0; i<hashtagsGenerated.length; i++){
            for(var j=0; j<i; j++){
                if(hashtagsGenerated[i]==hashtagsGenerated[j] || hasNumber(hashtagsGenerated[i])){
                continue;
                }
                else{
                //Not same elements
                
                var jaroWrinklerScore = natural.JaroWinklerDistance(hashtagsGenerated[i], hashtagsGenerated[j]);
                if(jaroWrinklerScore <= 0.80){
                    //This means that scores are lower, so elements are different in nature. Exactly what we need, so we skip
                    continue;
                }
                else{
                    //Different elements
                    // console.log(`Checking ${payload[i]} with ${payload[j]}`)
                    // console.log(`${payload[i]} with ${payload[j]} is : ${jaroWrinklerScore}`)
                    if(countryDetector.detect(hashtagsGenerated[i]).length == 0 && hashtagsGenerated[i].length >= 3) {
                    filteredNames.push(hashtagsGenerated[i])
                    }
                    else{
                    continue;
                    }
                    
                }
                }
            }
            }

            uniqueHashtags = filteredNames.filter(function(elem, pos) {
            return filteredNames.indexOf(elem) == pos;
            })
            //Remove duplicates if any
    
            // console.log("Unique Hashtags : " + JSON.stringify(uniqueHashtags))
            console.log("Unique Hashtags Length : ", uniqueHashtags.length)
            //WRITE CLEANUP HERE
            callback(uniqueHashtags)
          })();  
    }