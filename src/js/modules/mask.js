const mask = (selector) => {

  let setCursorPosition = (pos, elem) => {
    //focus on the elem
    elem.focus();
    if (elem.setSelectionRange) {
      //start and end position
      elem.setSelectionRange(pos, pos);
    //if it not works write a polyfill
    } else if (elem.createTextRange) {
      //create a range
      let range = elem.createTextRange();
      //it unify the first and the second position
      range.collapse(true);
      //selection endpoint
      range.moveEnd('character', pos);
      //selection startpoint
      range.moveStart('character', pos);
      //select this!
      range.select();
    }
  };

  //function to create a mask
  function createMask(event) {
    //mask for the phone
    let matrix = '+7 (___) ___ __ __',
        //iterator
        i = 0,
        //regular value with only numbers. Work using the matrix variable. The variable get all NOT numbers and relplace it to ''
        def = matrix.replace(/\D/g, ''),
        //the same as in the def vatiable
        val = this.value.replace(/\D/g, '');

        //when user writes something into the matrix if he begin to delete +7 we won't let him do it.
        //bacause if he delete 7 val.length less then def.length and we set the default def value
        if (def.length >= val.length) {
          val = def;
        }
        
        //this.value the text the user entered right now. /./ Every element in the string. After writes callback fucn
        //we have the variable "a". It's every symbol in the matrix
        this.value = matrix.replace(/./g, function (a) {
          //[_\d].test(a) - check every symbol in the matrix. and i < val.length. If it's true, set i++ it'll next symbol
          //the following condition using ? after that we return ''. If it's true set a
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        //if the user has stopped typing something
        if (event.type === 'blur') {
          //if the number of characters is two
          if (this.value.length == 2) {
            //clear this
            this.value = '';
          }
        } else {
          //else setcursorposition. 1 arg - the number of characters. 2. Link to the elem which's working
          setCursorPosition(this.value.length, this);
        }
  }

  //get the elements we want to set the mask
  let inputs = document.querySelectorAll(selector);

  //
  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });

};

export default mask;