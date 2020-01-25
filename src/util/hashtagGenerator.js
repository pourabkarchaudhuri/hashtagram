const hashtagHandler = require('./hashtagScraper')
const asynchrnonous = require('async')

module.exports = async function(_hashtags, _limit, _recent, callback){
        // var allHashtags = [];
        // var result = [];
        var hashtagsGenerated = [];

        asynchrnonous.each(_hashtags, async function(keyword, callback) {
          
          try{
            console.log("Current passing keyword", keyword.split(' '))
            if(keyword.split(' ').length == 1){
              let hashtags = await hashtagHandler(keyword)
              hashtagsGenerated.push("#"+keyword)
              if(hashtags == null ||hashtags === null){
                  console.log("0 hashtags for " + keyword)
                  
              }
              else{
                // Push
                      console.log(hashtags.length + " hashtags for " + keyword)
                      // hashtagsGenerated.push()
                      // if(hashtags.length == 1){
                      //   //Followup
                      //   console.log("Followup : ",keyword)
                      //   // let followup = await hashtagHandler(keyword)

                      // }

                      hashtagsGenerated.push(hashtags)
              }
                
                return null

            }
          }
          catch(err){
            console.log("Error : ", err)
          }
          
            
            
        }, function(err) {
            // if any of the file processing produced an error, err would equal that error
            if( err ) {
              // One of the iterations produced an error.
              // All processing will now stop.
              console.log('A key failed to process', err);

            } else {
            //   console.log("All : " + JSON.stringify(hashtagsGenerated))
              hashtagsGenerated = [].concat.apply([], hashtagsGenerated);
              // console.log('All hashtags have been processed successfully', hashtagsGenerated);
              console.log('All hashtags length', hashtagsGenerated.length);
            //   (async () =>{
            //       console.log("Starting NLP")
            //   var filteredNames = [];
            //   for(var i=0; i<hashtagsGenerated.length; i++){
            //       for(var j=0; j<i; j++){
            //           if(hashtagsGenerated[i]==hashtagsGenerated[j] || hasNumber(hashtagsGenerated[i])){
            //               continue;
            //           }
            //           else{
            //           //Not same elements
                      
            //               var jaroWrinklerScore = natural.JaroWinklerDistance(hashtagsGenerated[i], hashtagsGenerated[j]);
            //               if(jaroWrinklerScore <= 0.80){
            //                   //This means that scores are lower, so elements are different in nature. Exactly what we need, so we skip
            //                   continue;
            //               }
            //               else{
            //                   //Different elements
            //                   // console.log(`Checking ${payload[i]} with ${payload[j]}`)
            //                   // console.log(`${payload[i]} with ${payload[j]} is : ${jaroWrinklerScore}`)
            //                   if(countryDetector.detect(hashtagsGenerated[i]).length == 0 && hashtagsGenerated[i].length >= 3) {
            //                       filteredNames.push(hashtagsGenerated[i])
            //                   }
            //                   else{
            //                       continue;
            //                   }
                              
            //               }   
            //           }   
            //       }
            //   }   

            //   uniqueHashtags = filteredNames.filter(function(elem, pos) {
            //       return filteredNames.indexOf(elem) == pos;
            //   })
            //   //Remove duplicates if any
      
            //   // console.log("Unique Hashtags : " + JSON.stringify(uniqueHashtags))
            //   console.log("Unique Hashtags Length : ", uniqueHashtags.length)
            //   callback(uniqueHashtags)
            //   })();
            uniqueHashtags = hashtagsGenerated.filter(function(elem, pos) {
                      return hashtagsGenerated.indexOf(elem) == pos;
                  })
            //Remove duplicates if any

            //Randomize
            uniqueHashtags.sort(function(a, b){return 0.5 - Math.random()});
            // out
                 
            callback(uniqueHashtags)
            }
      });
        
    }