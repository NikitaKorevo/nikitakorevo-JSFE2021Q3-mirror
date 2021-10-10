const comparisonContainer = document.querySelector('.explore__comparison-container');
const comparisonTopline = document.querySelector('.explore__comparison-topline');
const circle = document.querySelector('.explore__comparison-circle');
const comparisonBotline = document.querySelector('.explore__comparison-botline');
const containerBefore = document.querySelector('.explore__comparison-container-before');

const moveCircle = (e) => {
  let widthComparisonTopline = comparisonTopline.offsetWidth;
  let widthCircle = circle.offsetWidth;
  let widthComparisonBotline = comparisonBotline.offsetWidth;

  let startComparisonContainer = comparisonContainer.getBoundingClientRect().left;
  let endComparisonContainer = comparisonContainer.getBoundingClientRect().right;
  let isPressedLeftMouseButton = e.which === 1;
  
  if (isPressedLeftMouseButton && startComparisonContainer<= e.clientX && endComparisonContainer>= e.clientX) {
    e.preventDefault();
    comparisonTopline.style.left = `${e.clientX - startComparisonContainer - widthComparisonTopline / 2}px`;
    circle.style.marginLeft = `${e.clientX - startComparisonContainer - widthCircle / 2}px`;
    comparisonBotline.style.left = `${e.clientX - startComparisonContainer - widthComparisonBotline / 2}px`;
    containerBefore.style.width = `${e.clientX - startComparisonContainer}px`;
  }
}

comparisonContainer.addEventListener('mousemove',(e) => moveCircle(e));