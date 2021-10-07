const mediaQuery = window.matchMedia('(max-width: 768px');
const masonryList = document.querySelector('.gallery__masonry-list');
let arrIndexImg = [];
let col = [[], [], []];
let HowCol = 3;
let HowImg = 15;

const listImgForRandom = () => {
  for (let i = 1; i <= HowImg; i++) {
    arrIndexImg.push(i);
  }
  getRandomNumberImgInTheColumn();
};

const getRandomNumberImgInTheColumn = () => {
  for (let index = 1; arrIndexImg.length !== 0; index++) {
    let num = Math.ceil(Math.random() * (arrIndexImg.length - 1) + 1);
  
    col[index - 1].push(arrIndexImg[num - 1]);
    arrIndexImg.splice(num - 1, 1);

    if (index === HowCol) index = 0;
  }
  addColumnWithImgToDOM();
};



const addColumnWithImgToDOM = () => {
  while (masonryList.firstChild) {
    masonryList.removeChild(masonryList.firstChild);
  }

  for (let i = 0; i < HowCol; i++) {
    let listCol = document.createElement('div');
    listCol.classList.add('masonry-list-col');
  
    for (let j = 0; j < col[i].length; j++) {
      let img = document.createElement('img');
      img.classList.add('masonry-list__item');
      img.src = `./assets/img/content/gallery/gallery${col[i][j]}.jpg`;
      img.alt = 'art picture';
      listCol.append(img);
    }
    masonryList.append(listCol);
  }
};

if (mediaQuery.matches) {
  HowCol = 2;
  HowImg = 10;
  listImgForRandom();
} else {
  listImgForRandom();
}

mediaQuery.addEventListener('change', (e) => {
  if (e.matches) {
    HowCol = 2;
    HowImg = 10;
  } else {
    HowCol = 3;
    HowImg = 15;
  }
  listImgForRandom();
});