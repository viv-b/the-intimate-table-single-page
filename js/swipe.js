// This is the original inspiration for the sweipe on the gallery
// taken from here: https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

function handleGesture(touchstartX, touchstartY, touchendX, touchendY) {
    const delx = touchendX - touchstartX;
    const dely = touchendY - touchstartY;
    if(Math.abs(delx) > Math.abs(dely)){
        if(delx > 0) return "right"
        else return "left"
    }
    else if(Math.abs(delx) < Math.abs(dely)){
        if(dely > 0) return "down"
        else return "up"
    }
    else return "tap"
}

const gestureZone = document.getElementById('gestureZone');
    
gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    alert(handleGesture(touchstartX, touchstartY, touchendX, touchendY))
}, false); 
