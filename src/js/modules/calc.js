const calc = (size, material, options, promocode, result) => {
  //get the blocks
  const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);
        console.log(sizeBlock);
  //count the sum we have
  let sum = 0;
  console.log(promocodeBlock);
  const calcFunc = () => {
    sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

    if (sizeBlock.value == '' || materialBlock.value == '') {
      resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
    } else if (promocodeBlock.value === 'IWANTPOPART') {
      resultBlock.textContent = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
    }    
  };
  
    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;