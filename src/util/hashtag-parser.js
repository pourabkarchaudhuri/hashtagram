
module.exports = async function(payload) {

        // var hashtagCollector = [];
        // payload.forEach((element)=>{
        //   if(element.hashtags != null){
        //     //Hashtags detected
        //     // console.log(element.hashtags)
        //     element.hashtags.forEach((underElement)=>{
        //       hashtagCollector.push(underElement)
        //     });
        //   };
        // });
        // // console.log("Results -> : " + JSON.stringify(hashtagCollector));
        // return hashtagCollector;

        var hashtagCollector = [];
        if(payload.length == 0){
          //No related hashtags suggested
          return null
        }
        else{
          //Related hashtags present
          payload.forEach((element)=>{
            hashtagCollector.push("#"+element.node.name)
          })
        }

        // console.log("Results -> : " + JSON.stringify(hashtagCollector));
        return hashtagCollector;
      
      
}