const masonryList = document.querySelector('.gallery__masonry-list');
let arrIndexImg = [];
let col = [[], [], []];
let HowCol = 3;
let HowImg = 15;

const listImgForRandom = () => {
  for (let i = 1; i <= HowImg; i++) {
    arrIndexImg.push(i);
  }
};

listImgForRandom();

const getRandomNumberImgInTheColumn = () => {
  for (let index = 1; arrIndexImg.length !== 0; index++) {
    let num = Math.ceil(Math.random() * (arrIndexImg.length - 1) + 1);
  
    col[index - 1].push(arrIndexImg[num - 1]);
    arrIndexImg.splice(num - 1, 1);

    /* if (index === 1) {
      col[0].push(arrIndexImg[num - 1]);
      arrIndexImg.splice(num - 1, 1);
    } else if (index === 2) {
      col[1].push(arrIndexImg[num - 1]);
      arrIndexImg.splice(num - 1, 1);
    } else if (index === 3) {
      col[2].push(arrIndexImg[num - 1]);
      arrIndexImg.splice(num - 1, 1);
    } */
    if (index === HowCol) index = 0;
  }
};

getRandomNumberImgInTheColumn();

const addColumnWithImgToDOM = () => {
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

addColumnWithImgToDOM();