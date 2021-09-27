const btnBuyNow = document.querySelector('.amount__buy');
const btnClose = document.querySelector('.booking__button-close');
const form = document.querySelector('.booking');
const background = document.querySelector('.booking__background');
console.log(btnBuyNow);
console.log(form);
console.log(background);
console.log(btnClose);

const openForm = () => {
  background.style.display = 'block';
  form.style.left = 0;
}

btnBuyNow.addEventListener('click', () => {openForm()});

const closeForm = () => {
  form.style.animation = 'rightLeft 0.3s';
  form.style.left = '-110%';
  setTimeout(() => {
    background.style.display = 'none';
    form.style.animation = 'leftRight 0.3s';
  }, 300);
  
}

btnClose.addEventListener('click', () => {closeForm()});
background.addEventListener('click', (e) => {
  if (e.target.classList.contains('booking__background')) closeForm();
});
