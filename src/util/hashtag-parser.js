
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
          
          // payload.forEach((element)=>{
          //   if(element.node.name.replace(/[^A-Za-z0-9_]/g,"").length != 0){
          //     hashtagCollector.push("#"+element.node.name)
          //   }
            
          // })
          for(var i=0; i<5; i++){
            if(payload[i].node.name.replace(/[^A-Za-z0-9_]/g,"").length != 0){
              hashtagCollector.push("#" + payload[i].node.name)
            }
          }
        }

        // console.log("Results -> : " + JSON.stringify(hashtagCollector));
        return hashtagCollector;
      
      
}