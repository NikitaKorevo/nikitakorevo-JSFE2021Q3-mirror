const videoControls = document.querySelector('.video__controls');
const btnBuyNow = document.querySelector('.amount__buy');
const btnClose = document.querySelector('.booking__button-close');
const form = document.querySelector('.booking');
const background = document.querySelector('.booking__background');
const btnBook = document.querySelector('.booking__book');

const openForm = () => {
  background.style.display = 'block';
  form.style.left = 0;
  videoControls.classList.add('data-hotkeys-blocked');
}

btnBuyNow.addEventListener('click', () => {openForm()});

const closeForm = () => {
  form.style.animation = 'rightLeft 0.3s';
  form.style.left = '-110%';
  setTimeout(() => {
    background.style.display = 'none';
    form.style.animation = 'leftRight 0.3s';
    videoControls.classList.remove('data-hotkeys-blocked');
  }, 300);
}

btnClose.addEventListener('click', () => {closeForm()});
background.addEventListener('click', (e) => {
  if (e.target.classList.contains('booking__background')) closeForm();
});

const beautifulСlick = (e) => {
  let span = document.createElement("span");

  const t = e.target.getBoundingClientRect();
  const x = e.clientX;
  const y = e.clientY;
  const c = x - t.left;
  const v = y - t.top;

  span.classList.add("circle");

  span.style.top = v + "px";
  span.style.left = c + "px";

  btnBook.append(span);

  setTimeout(() => {
    span.remove();
  }, 400);
}

btnBook.addEventListener('click', (e) => beautifulСlick(e));