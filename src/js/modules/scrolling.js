const scrolling = (upSelector) => {
  const upElem = document.querySelector(upSelector);

  //elem for an arrow we seen on the page
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 1650) {
      upElem.classList.add('animated', 'fadeIn');
      upElem.classList.remove('fadeOut');
    } else {
      upElem.classList.add('fadeOut');
      upElem.classList.remove('fadeIn');
    }
  });

  function alternative2() {
  //find all links from # (local links)
  let links = document.querySelectorAll('[href^="#"]'),
      //speed to scroll
      speed = 0.2;
  
  //forEach for querySelectorAll
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      //find out where we should scroll the document
      let widthTop = document.documentElement.scrollTop,
          //get hash (for instance #up)
          hash = this.hash,
          //where are we should scroll. getBoundingClientRect - to find out the coordinates the elem we should scroll
          toBlock = document.querySelector(hash).getBoundingClientRect().top,
          //start position
          start = null;
      //start requestAnimationFrame
      requestAnimationFrame(step);

      function step(time) {
        //Have the animation been launched yet?
        if (start === null) {
          start = time;
        }

        let progress = time - start,
            //widthTop - progress / speed : widthTop - how much the user scrolled, divide by speed
            //withTop + toBlock
            //else we make in another way
            r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

        //scrollTo. We scroll our page to the coordinats 
        document.documentElement.scrollTo(0, r);

        //when the animatin should stop
        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          //after it was stopped we set our hash. For example #up
          location.hash = hash;
        }

      }
    });
  });
  }
  

  
  
  function alternative () {
  //get all html structure
  const element = document.documentElement,
        //get body
        body = document.body;

  //how much to scroll through. How to do it
  const calcScroll = () => {
    //click to upElem. This is an arrow
    upElem.addEventListener('click', function(event) {
      //body.scrollTop is exists or element.srolltop
      //we use srollTop to find out how many we should scroll to top
      let scrollTop = Math.round(body.scrollTop || element.scrollTop);
      //hash is not empty
      if (this.hash !== '') {
        event.preventDefault();
        //we should get an element we should scroll to
        let hashElement = document.getElementById(this.hash.substring(1)),
            //how many we should scroll to parent the hash element
            hashElementTop = 0;

        
        //get parent of the element. Set the elem relative to which will position hashElement. Kinda his parent
        //while it exists
        while (hashElement.offsetParent) {
          hashElementTop += hashElement.offsetTop;
          hashElement = hashElement.offsetParent;
        }    
        
        //the result could be fractional so we use Math.round
        hashElementTop = Math.round(hashElementTop);
        
        //scrollTop - how many we should scroll
        //hashElementTop - we should know how many pixels to parent 
        //(it'll be 0 in this case). You could create div.height 50px and it will be 50px
        //this.hash - to find out where we are going
        //The smoothScroll function helps us to scroll with an animation
        smoothScroll(scrollTop, hashElementTop, this.hash);
      }
    });
  };
  //to create smooth scroll
  //from - where are we start
  //to - where are we going
  //hash - out hash (fo instance #up)
  const smoothScroll = (from, to, hash) => {
    //time
    let timeInterval = 1,
        prevScrollTop,
        //how fast
        speed;

    //where are we going? Up or down
    if (to > from) {
      speed = 30;
    } else {
      speed = -30;
    }

    //create an animation

    //setInterval
    let move = setInterval(function () {
      //body.scrollTop is exists or element.srolltop
      //we use srollTop to find out how many we should scroll to top
      let scrollTop = Math.round(body.scrollTop || element.scrollTop);

      //
      if (
        //we cannot go to anywhere. Those three can guarantee us that we have reached the target
        prevScrollTop === scrollTop ||
        (to > from && scrollTop >= to) ||
        (to > from && scrollTop <= to)
      ) {
        //in this case we should clear interval
        clearInterval(move);
        //work with adress bar. history.state & document title are necessary variables
        //location.href.replace use to change our adress bar to set the id we got. (it was e.preventDefault)
        history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
      } else {
        //create scrollTop
        body.scrollTop += speed;
        element.scrollTop += speed;
        //to find out change the value
        prevScrollTop = scrollTop;
      }
    }, timeInterval);    
  };
  //use calc scroll
  calcScroll();
 }

 alternative2();
};

export default scrolling;