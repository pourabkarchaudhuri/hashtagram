var text = "يجنن_يجــــــنن😍😍😍😍😍😍😍😍_يجـــــــــــــــنن🌷🌷�";
          text = text.replace(/[^A-Za-z0-9_]/g,"")
          if(text.length == 0){
              console.log("Skip")
          }
          else{
              console.log("Continue")
          }