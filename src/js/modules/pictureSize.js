const pictureSize = (imgSelector) => {
  const blocks = document.querySelectorAll(imgSelector);

  function showImg(block) {
    const img = block.querySelector('img');
    //using slice we cut our string off. 0 - cut off since 0 elem, -4 - cut off the last four symbols
    img.src = img.src.slice(0, -4) + '-1.png';
    block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
      p.style.display = 'none';
    });
  }

  function hideImg(block) {
    const img = block.querySelector('img');
    //using slice we cut our string off. 0 - cut off since 0 elem, -4 - cut off the last four symbols
    img.src = img.src.slice(0, -6) + '.png';
    block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
      p.style.display = 'block';
    });
  }

  blocks.forEach(block => {
    block.addEventListener('mouseover', () => {
      showImg(block);
    });
    block.addEventListener('mouseout', () => {
      hideImg(block);
    });
  });
};

export default pictureSize;