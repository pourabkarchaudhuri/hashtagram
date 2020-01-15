const clarifai = require('clarifai');
const url = require('url');

const app = new Clarifai.App({
  apiKey: '45e827888be347869046857afc81ca14'
});
// PUT this in env

var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

module.exports = async function(image, callback){
  var readyImage; 
  if(url.parse(image).protocol == null || url.parse(image).protocol == 'data:'){
    //Base64
    console.log("image string")
    console.log(base64regex.test(image))
    if(base64regex.test(image)){
      readyImage = {
        base64: image
      }
    }
    else{
      //Bad Base64
      console.log("invalid base64")
      callback('Invalid base64 format', null);
    } 
  }
  else{
    //URL path
    readyImage = image
  }

  
  app.models.predict(clarifai.GENERAL_MODEL, readyImage)
    .then(response => {
      var concepts = response['outputs'][0]['data']['concepts']
      // console.log(JSON.stringify(concepts))
      let keywords = [];
      for (var i=0; i<5; i++){
        keywords.push(concepts[i].name);
      }

      callback(null, keywords)
    })
    .catch(error => {
      callback(error.stack, null)
    });
}





  
