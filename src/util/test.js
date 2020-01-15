const instagram = require('./instagram');
const hashtagCollector = require('./hashtag-parser')
const natural = require('natural')
const countryDetector = require("country-in-text-detector");
const asynchrnonous = require('async')

function hasNumber(str) {
    return /\d/.test(str);
}

        var _hashtags = ['dog', 'cat', 'fashion', 'bride'];
        var _limit = 3
        var _recent = null;
        var hashtagsGenerated = [];
    
         asynchrnonous.each(_hashtags, async function(keyword, callback) {
          
              // Perform operation on file here.
              console.log('Processing key ' + keyword);
              let result = await instagram(keyword, _limit, _recent)
              let hashtags = await hashtagCollector(result)

                // Do work to process file here
                console.log(`key : ${keyword}`);
                // console.log(`processed : `, hashtags);
                hashtagsGenerated.push(hashtags)
                
                return null
              
          }, function(err) {
              // if any of the file processing produced an error, err would equal that error
              if( err ) {
                // One of the iterations produced an error.
                // All processing will now stop.
                console.log('A key failed to process', err);
              } else {
                
                hashtagsGenerated = [].concat.apply([], hashtagsGenerated);
                // console.log('All hashtags have been processed successfully', hashtagsGenerated);
                console.log('All hashtags length', hashtagsGenerated.length);
                (async () =>{
                    console.log("Starting NLP")
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
                callback(uniqueHashtags)
                })();
              }
        });




















        // (async () => {
        //     for (const item of _hashtags) {
        //             let result = await instagram(item, _limit, _recent)
        //             let hashtags = await hashtagCollector(result)
        //             console.log(item);
        //             hashtagsGenerated.push(hashtags)
        //     }
        //     console.log('Done');
        //     hashtagsGenerated = [].concat.apply([], hashtagsGenerated)
        //     // console.log("All Hashtags generated : " + JSON.stringify(hashtagsGenerated))
        //     console.log("All Hashtags Length : ", hashtagsGenerated.length);

        //     var filteredNames = [];
        //     for(var i=0; i<hashtagsGenerated.length; i++){
        //     for(var j=0; j<i; j++){
        //         if(hashtagsGenerated[i]==hashtagsGenerated[j] || hasNumber(hashtagsGenerated[i])){
        //         continue;
        //         }
        //         else{
        //         //Not same elements
                
        //         var jaroWrinklerScore = natural.JaroWinklerDistance(hashtagsGenerated[i], hashtagsGenerated[j]);
        //         if(jaroWrinklerScore <= 0.80){
        //             //This means that scores are lower, so elements are different in nature. Exactly what we need, so we skip
        //             continue;
        //         }
        //         else{
        //             //Different elements
        //             // console.log(`Checking ${payload[i]} with ${payload[j]}`)
        //             // console.log(`${payload[i]} with ${payload[j]} is : ${jaroWrinklerScore}`)
        //             if(countryDetector.detect(hashtagsGenerated[i]).length == 0 && hashtagsGenerated[i].length >= 3) {
        //             filteredNames.push(hashtagsGenerated[i])
        //             }
        //             else{
        //             continue;
        //             }
                    
        //         }
        //         }
        //     }
        //     }

        //     uniqueHashtags = filteredNames.filter(function(elem, pos) {
        //     return filteredNames.indexOf(elem) == pos;
        //     })
        //     //Remove duplicates if any
    
        //     // console.log("Unique Hashtags : " + JSON.stringify(uniqueHashtags))
        //     console.log("Unique Hashtags Length : ", uniqueHashtags.length)
        //     //WRITE CLEANUP HERE
        //     console.log(uniqueHashtags)
        //   })(); 