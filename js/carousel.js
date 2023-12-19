
// Check to see when the background images have loaded for the carousel
// From: https://imagesloaded.desandro.com/
// Example here: https://codepen.io/desandro/pen/vNrBGz

imagesLoaded( '.carousel__items', { background: '.carousel__item' }, function( imgLoad ) {
    
  


  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  function handleGesture(touchstartX, touchstartY, touchendX, touchendY) {

        var radioButtons = document.getElementsByClassName('carousel-radio-button');
      
        var totalRadioButtons = radioButtons.length;
          
        var currentButtonIndex = 0;
          


        for(var i = 0; i < radioButtons.length; i++) {
              
            if(radioButtons[i].checked) {
                currentButtonIndex = i;
                // alert("Index: " + i + " Total Radio Buttons: " + totalRadioButtons);
            }
                
        }


        radioButtons[currentButtonIndex].checked = "false";

        const delx = touchendX - touchstartX;
        const dely = touchendY - touchstartY;

        if(Math.abs(delx) > Math.abs(dely)){

                if(delx > 0) { // Swiped Right
                    if (currentButtonIndex == 0) {
                      radioButtons[totalRadioButtons - 1].checked = "true"; // Was at first item, now go to last
                    } else {
                      radioButtons[currentButtonIndex - 1].checked = "true";
                    }
                } else {  // Swiped Left
                    if (currentButtonIndex == totalRadioButtons - 1) {
                      radioButtons[0].checked = "true"; // Was at last item, now go to first
                    } else {
                      radioButtons[currentButtonIndex + 1].checked = "true";
                    }
                }

        } else if(Math.abs(delx) < Math.abs(dely)){
                
                if(dely > 0) {
                   // Down swipe
                } else {
                   // Up swipe
                }

        } else {
              // This is just a 'tap'
        }
            
    
  }

  const gestureZone = document.getElementById('gestureZone');
      
  gestureZone.addEventListener('touchstart', function(event) {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
  }, false);

  gestureZone.addEventListener('touchend', function(event) {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      // alert(handleGesture(touchstartX, touchstartY, touchendX, touchendY))
      handleGesture(touchstartX, touchstartY, touchendX, touchendY)
  }, false); 

  
});