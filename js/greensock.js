// Avoid the jump that happens with the navigation is loaded before the fonts are loaded.
// If browser not supporting this, just default to showing the navbar.

// A Good into: https://gomakethings.com/a-modern-font-loading-strategy-with-the-vanilla-js-fontfaceset.load-method/
// Also: https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/load

;(function () {
	if ('fonts' in document) {
  	document.fonts.load('1em swear-display-cilati').then(function () {
  	  console.log("Font loaded!");
  		document.documentElement.className += ' fonts-loaded';
  	});
	} else {
    document.documentElement.className += ' fonts-loaded';
	}
})();



// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
// without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded', () => {



	function initNavigation() {

	   // FROM: https://greensock.com/forums/topic/26236-toggle-animation/

	  // Timeline created and paused
		var tl = gsap.timeline({ paused: true });

		function openNav() {

		  animateOpenNav();

		  navBtn.onclick = function (e) {
		    
		    // Toggle reversed to it's opposite value
		    tl.reversed(!tl.reversed());
		    
		    if (navBtn.classList.contains("menu-open")) {
		      navBtn.classList.remove("menu-open");
		    } else {
		      navBtn.classList.add("menu-open");
		    }

		  };

		}

		function animateOpenNav() {
		  
		  var mobileNav = document.getElementById("my-navigation-mobile");
		  
		  tl.to(mobileNav, {
		    duration: 0.15,
		    ease: "power1.out",
		    y: 0
		  }).to(".nav__link", {
		    opacity: 1,
		    y: 0,
		    duration: 0.2,
		    stagger: {
		      // wrap advanced options in an object
		      each: 0.05,
		      ease: "power1.in"
		    }
		  })
		  .reverse(); // Finally reverse the timeline. reversed() is true
		}

		// init
		openNav();

	}
	
	
	
	
	
	function lazyLoadImages() {
	  
	    
	    console.log("Start lazy loading...");
	    
	    document.querySelectorAll(".lazy").forEach(element => {
        
        element.src = element.dataset.src;
	      
	    });
	  
	    
	}
	
	
	
	
	function carouselSwipe() {
	  
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
                  // 'Tap'
                  console.log("Tap");
            }
        
      }
    
    
    
      const gestureZone = document.getElementById('gestureZone');
      
      // Is this a page with the carousel?
      if (gestureZone) {
            
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
      
      }
      
	}
	
	
	
	
	
	function closeNavigation() {
    
    if (navBtn.classList.contains("menu-open")) {
          // Simulate nav button click to toggle (close) navigation
		  navBtn.click();
		}
    
	}





	function initGsap () {

		gsap.registerPlugin(ScrollTrigger);

		const slideInFromLeft = gsap.utils.toArray('.slide-in-from-left');

		slideInFromLeft.forEach(box => {
		  gsap.to(box, { 
		  	duration: 0.1,
		  	delay: 0,
		  	opacity: 1,
		    x: 0,
		    scrollTrigger: {
		      trigger: box
		    }
		  })
		});

		const slideInFromRight = gsap.utils.toArray('.slide-in-from-right');

		slideInFromRight.forEach(box => {
		  gsap.to(box, { 
		  	duration: 0.1,
		  	delay: 0,
		  	opacity: 1,
		    x: 0,
		    scrollTrigger: {
		      trigger: box
		    }
		  })
		});

		const fadeInImage = gsap.utils.toArray('img');

		fadeInImage.forEach(box => {
		  gsap.to(box, { 
		  	duration: 1.0,
		  	opacity: 1,
		    scrollTrigger: {
		      trigger: box
		    }
		  })
		});

		
		gsap.to('.carousel-container', { 
		  duration: 0.5,
		  opacity: 1
		});
		
		// Basic fade-in for main-wrapper. Mostly to avoid flashes of home page background when going from another
		// page to home page.
		gsap.to('#home.main-wrapper', { 
		  duration: 0.25,
		  opacity: 1
		});


	}





  function changePage(url, bool) {
	          
	    loadNewContent(url, bool);
	      
	    newLocation = url;
    
	}





	function updateMetaTags(doc) {

		// MAIN TAGS

		var metaTitleNew = doc.querySelector("title").innerText;
		document.querySelector("title").innerText = metaTitleNew;

		var metaDescriptionNew = doc.querySelector('meta[name="description"]').getAttribute("content");
		document.querySelector('meta[name="description"]').setAttribute("content",metaDescriptionNew);

		var metaCanonicalNew = doc.querySelector('link[rel="canonical"]').getAttribute("href");
		document.querySelector('link[rel="canonical"]').setAttribute("href",metaCanonicalNew);

		// FACEBOOK OG TAGS

		var metaOGTitleNew = doc.querySelector('meta[property="og:title"]').getAttribute("content");
		document.querySelector('meta[property="og:title"]').setAttribute("content",metaOGTitleNew);

		var metaOGImageNew = doc.querySelector('meta[property="og:image"]').getAttribute("content");
		document.querySelector('meta[property="og:image"]').setAttribute("content",metaOGImageNew);

		var metaOGDescriptionNew = doc.querySelector('meta[property="og:description"]').getAttribute("content");
		document.querySelector('meta[property="og:description"]').setAttribute("content",metaOGDescriptionNew);

		var metaOGUrlNew = doc.querySelector('meta[property="og:url"]').getAttribute("content");
		document.querySelector('meta[property="og:url"]').setAttribute("content",metaOGUrlNew);

	}

  
  
  

	function loadNewContent(url, bool) {

		const navBar = document.getElementById("my-navigation");

  		navBar.classList.add("zip-out");



		var loader = document.getElementById('loader');

		loader.classList.add("show-loader");
		
		console.log("URL: " + url);
		
		// Info on Fetch Here: https://gomakethings.com/getting-html-with-fetch-in-vanilla-js/
    
	  	fetch(url).then(function (response) {
	      
	      	// The API call was successful!
	        return response.text();
	    	
	  	}).then(function (html) {
      		

	    	// Convert the HTML string into a document object
		    var parser = new DOMParser();
		    var doc = parser.parseFromString(html, "text/html");

		    updateMetaTags(doc);

		    var docContainer = doc.querySelector("main");
		    var newContent = docContainer.innerHTML;
		          	
		    var domContainer = document.querySelector("main");
		    domContainer.innerHTML = newContent;

      	imagesLoaded( document.querySelector("main"), { background: true }, function( instance ) {
		          	
		          	// This is the HTML from our response as a text string
		          	console.log("Ajax page load. All images are loaded.");

		          	setTimeout(() => {
  	
						      loader.classList.remove("show-loader");

			            if(url!=window.location && bool){
			              //add the new page to the window.history
			              //if the new page was triggered by a 'popstate' event, don't add it
			              window.history.pushState({path: url},'',url);
			              // Scroll to the top of the page otherwise keeps scroll position of old page
			              // BUT only do if not a popstate call. Otherwise want to keep the scroll position where it was left in the new (revisited) page.
			            }
			            
			            let docBody = document.body;
			           
			            if (url === "/") {
			              	
			              	docBody.className = '';
			              	docBody.classList.add('home');

			              	window.scrollTo(0, 0);
			              	
			            } else if (url === "/about/") {
			              	
			              	docBody.className = '';
			              	docBody.classList.add('about');

			              	window.scrollTo(0, 0);

			            } else if (url === "/work/") {
			                
			                docBody.className = '';
			              	docBody.classList.add('work');

			              	window.scrollTo(0, 0);

			            } else if (url === "/contact/") {
			                
			                docBody.className = '';
			              	docBody.classList.add('contact');

			              	window.scrollTo(0, 0);

			            } else {

			              	// Will need to modify to cover other links...
			              	
			              	window.scrollTo(0, 0);

			            }
		            
		            	initGsap();

		            	navBar.classList.remove("zip-out");
		            	
		            	carouselSwipe();
		            	
		            	lazyLoadImages();

					    }, 400)

          });
          	
    	
	  	}).catch(function (err) {
	      
	        // There was an error
	        console.warn("Something went wrong.", err);
	    	
	  	});

	}





	console.log ("Doc Ready");
  
  let isAnimating = false,
    	newLocation = '',
    	firstLoad = false;

  const navBtn = document.getElementById("menu-icon");

  carouselSwipe();
   

  // Capture the click event for the navigation div (nav) and also any internal links
  // in the main content div (main). Turn off the default link behviour and do an Ajax
  // call for the new content.

  // Uses Event Delegation on a permanent parent item which is applied to any new ajax content within it.

  document.querySelectorAll("main,nav").forEach(item => {
  		
  		item.addEventListener("click", event => {
    	
    		  console.log("tagName: " + event.target.tagName);
    		  console.log("className: " + event.target.className);
    		  console.log("target attribute: " + event.target.getAttribute('target'));
    		  
          // Check if open in a new tab...
          if (event.target.getAttribute('target') !== "_blank") {
            
	          // Check if this is an internal link...
  	        if (event.target.tagName === "A" && event.target.getAttribute("href").toLowerCase().indexOf("https://") === -1 && event.target.getAttribute("href").toLowerCase().indexOf("http://") === -1 && event.target.getAttribute("href").toLowerCase().indexOf("mailto:") === -1) {
  	        
  	          event.preventDefault();
  	          
  	          closeNavigation();
  	          
  	          // Detect which page has been selected
  	          let newPage = event.target.getAttribute("href");
  	          
  	          changePage(newPage, true);
  	            
  	          firstLoad = true;
  	          
  	        }
  	        
          }

  		});

	});



  // Detect the 'popstate' event - e.g. user clicking the back button
  window.addEventListener("popstate", (event) => {
      
      	// console.log("Doc Location and Event State: " + document.location + ", state: " + JSON.stringify(event.state));
      	// console.log("Event State Path: " + event.state.path);
      	// console.log("Location Path name: " + location.pathname);
        if (event.state !== null) {
          
        	if (firstLoad) {
            
  	          /*
  	          Safari emits a popstate event on page load - check if firstLoad is true before animating
  	          if it's false - the page has just been loaded 
  	          */
  	          
  	          newPage = event.state.path; // location.pathname;
  	          
  	          console.log("Popsate Current Location:" + newLocation);
  	          console.log("Popsate New New Page To Go To:" + newPage);
  	          
  	          // UPDATE - 26/07/2022 - Changed the value of the second parameter to TRUE so that the page type gets appended to the 'body' tag when popstate (browser nav buttons) triggered.
  	          if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
              
        	}
        	
        }
        
      	firstLoad = true;

  });



  imagesLoaded( document.querySelector("main"), { background: true }, function( instance ) {

		    console.log("Initial page load. All images are loaded.");

		    setTimeout(() => {
		      
		    	var loader = document.getElementById('loader');
  				loader.classList.remove("show-loader");
  
  				initGsap();
  
  				initNavigation();
  				
  				lazyLoadImages();

			  }, 0)

  });


  // Close the menu if it happens to be open if window is resized,
  // otherwise it doesn't fully close when required next time.
  window.addEventListener("resize", (event) => {

  		resized = true;

    	closeNavigation();

    	setTimeout(() => {
  	
			 /* Make sure the menu completely goes back to hidden. Can get situation on mobile when
	    	   change orientation, OR on desktop when have say the JS console open then close it
	    	   when the menu is open, it can leave the menu partially closed permanently.

	    	   The set timeout is just to avoid a flickr when the translate happens before the
	    	   normal closing animation */

    		var mobileNav = document.getElementById("my-navigation-mobile");
      		mobileNav.style.transform = "translateY(-100%)";		

		  }, 500)

    });


});


// JS ASIDE NOTES: EVENT DELEGATION:
// Event delegation allows us to attach a single event listener, to a parent element,
// that will fire for all descendants matching a selector, whether those descendants
// exist now or are added in the future.