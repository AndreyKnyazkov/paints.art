const sliders = (slides, dir, prev, next) => {
  //the slider will start since:
  let slideIndex = 1,
  //the variable which knows should we turn off toggle the slider or no
  paused = false;
  //items for slider
  const items = document.querySelectorAll(slides);

  function showSlides(n) {
    //If the quantity more than the quantity of all slides is then set 1
    if ( n > items.length ) {
      slideIndex = 1;
    }
    //if the quantity less than 1, than set 1
    if ( n < 1 ) {
      slideIndex = items.length;
    }

    items.forEach(item => {
      //for animate
      item.classList.add("animated");
      //hide all slides
      item.style.display = "none";
    });
    //show current slide. As JavaScript counts from zero, we should subtract one
    items[slideIndex - 1].style.display = 'block';
  }
  //initialization  
  showSlides(slideIndex);

  //to move slides 
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  //if there's no arrows to move slides
  try {
    const prevBtn = document.querySelector(prev),
          nextBtn = document.querySelector(next);

    prevBtn.addEventListener('click', () => {
      plusSlides(-1);
      items[slideIndex - 1].classList.remove('slideInLeft');
      items[slideIndex - 1].classList.add('slideInRight');
    });

    nextBtn.addEventListener('click', () => {
      plusSlides(1);
      items[slideIndex - 1].classList.remove('slideInRight');
      items[slideIndex - 1].classList.add('slideInLeft');
    });
  } catch (error) {
    console.log();
  }

  //function for turn off tiggle slides if mouseenter
  function activateAnimation() {
    if (dir === 'vertical') {
    paused = setInterval(function() {
      plusSlides(1);
      items[slideIndex - 1].classList.add('slideInDown');
    }, 3000);
   } else {
    paused = setInterval(function() {
      items[slideIndex - 1].classList.remove('slideInTop');
      items[slideIndex - 1].classList.add('slideInDown');
    }, 3000);
   }
  }

  items[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused);
  });
  items[0].parentNode.addEventListener('mouseleave', () => {
      activateAnimation();
  });
  
  activateAnimation();
};

export default sliders;