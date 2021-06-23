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

 alternative2();
};
