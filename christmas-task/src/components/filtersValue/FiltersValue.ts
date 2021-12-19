import './FiltersValue.scss';
import Toys from '../../pages/Main/Toys';
import Toy from '../Toy';

class FiltersValue {
  forms: string[];
  color: string[];
  dimensions: string[];
  favorites: string[];

  constructor() {
    this.forms = ['ball', 'bell', 'cone', 'snowflake', 'figurine'];
    this.color = ['white', 'yellow', 'red', 'blue', 'green'];
    this.dimensions = ['small', 'average', 'big'];
    this.favorites = ['favorite'];
  }

  getFiltersValue(arrToys: Toy[]): Toy[] {
    arrToys = this.filterForms(arrToys);
    arrToys = this.filterColors(arrToys);
    arrToys = this.filterDimensions(arrToys);
    arrToys = this.filterFavorites(arrToys);
    /*     arrToys = arrToys.filter((node) => {
      let flag = false;
      const keys = Object.keys(Toys.toysSettings.forms);
      const booleans: boolean[] = [];
      keys.forEach((key) => booleans.push(Toys.toysSettings.forms[key]));
      if (!booleans.some((el) => el === true)) return (flag = true);

      Object.keys(Toys.toysSettings.forms).forEach((form) => {
        if (Toys.toysSettings.forms[form]) {
          if (form === 'ball' && node.shape === 'шар') flag = true;
          if (form === 'bell' && node.shape === 'колокольчик') flag = true;
          if (form === 'cone' && node.shape === 'шишка') flag = true;
          if (form === 'snowflake' && node.shape === 'снежинка') flag = true;
          if (form === 'figurine' && node.shape === 'фигурка') flag = true;
        }
      });
      return flag;
    }); */

    /* arrToys = arrToys.filter((node) => {
      let flag = false;
      const keys = Object.keys(Toys.toysSettings.colors);
      const booleans: boolean[] = [];
      keys.forEach((key) => booleans.push(Toys.toysSettings.colors[key]));
      if (!booleans.some((el) => el === true)) return (flag = true);

      Object.keys(Toys.toysSettings.colors).forEach((color) => {
        if (Toys.toysSettings.colors[color]) {
          if (color === 'white' && node.color === 'белый') flag = true;
          if (color === 'yellow' && node.color === 'желтый') flag = true;
          if (color === 'red' && node.color === 'красный') flag = true;
          if (color === 'blue' && node.color === 'синий') flag = true;
          if (color === 'green' && node.color === 'зелёный') flag = true;
        }
      });
      return flag;
    }); */

    /* arrToys = arrToys.filter((node) => {
      let flag = false;
      const keys = Object.keys(Toys.toysSettings.dimensions);
      const booleans: boolean[] = [];
      keys.forEach((key) => booleans.push(Toys.toysSettings.dimensions[key]));
      if (!booleans.some((el) => el === true)) return (flag = true);

      Object.keys(Toys.toysSettings.dimensions).forEach((dimension) => {
        if (Toys.toysSettings.dimensions[dimension]) {
          if (dimension === 'small' && node.size === 'малый') flag = true;
          if (dimension === 'average' && node.size === 'средний') flag = true;
          if (dimension === 'big' && node.size === 'большой') flag = true;
        }
      });
      return flag;
    }); */

    /* arrToys = arrToys.filter((node) => {
      let flag = false;
      const keys = Object.keys(Toys.toysSettings.favorites);
      const booleans: boolean[] = [];
      keys.forEach((key) => booleans.push(Toys.toysSettings.favorites[key]));
      if (!booleans.some((el) => el === true)) return (flag = true);

      Object.keys(Toys.toysSettings.favorites).forEach((key) => {
        if (Toys.toysSettings.favorites[key]) {
          if (key === 'favorite' && node.favorite === true) flag = true;
        }
      });
      return flag;
    }); */

    return arrToys;
  }

  filterForms(arrToys: Toy[]): Toy[] {
    arrToys = arrToys.filter((node) => {
      let flag = false;
      const keys = Object.keys(Toys.toysSettings.forms);
      const booleans: boolean[] = [];
      keys.forEach((key) => booleans.push(Toys.toysSettings.forms[key]));
      if (!booleans.some((el) => el === true)) return (flag = true);

      Object.keys(Toys.toysSettings.forms).forEach((form) => {
        if (Toys.toysSettings.forms[form]) {
          if (form === 'ball' && node.shape === 'шар') flag = true;
          if (form === 'bell' && node.shape === 'колокольчик') flag = true;
          if (form === 'cone' && node.shape === 'шишка') flag = true;
          if (form === 'snowflake' && node.shape === 'снежинка') flag = true;
          if (form === 'figurine' && node.shape === 'фигурка') flag = true;
        }
      });
      return flag;
    });
    return arrToys;
  }

  filterColors(arrToys: Toy[]): Toy[] {
    arrToys = arrToys.filter((node) => {
      let flag = false;
      const keys = Object.keys(Toys.toysSettings.colors);
      const booleans: boolean[] = [];
      keys.forEach((key) => booleans.push(Toys.toysSettings.colors[key]));
      if (!booleans.some((el) => el === true)) return (flag = true);

      Object.keys(Toys.toysSettings.colors).forEach((color) => {
        if (Toys.toysSettings.colors[color]) {
          if (color === 'white' && node.color === 'белый') flag = true;
          if (color === 'yellow' && node.color === 'желтый') flag = true;
          if (color === 'red' && node.color === 'красный') flag = true;
          if (color === 'blue' && node.color === 'синий') flag = true;
          if (color === 'green' && node.color === 'зелёный') flag = true;
        }
      });
      return flag;
    });
    return arrToys;
  }

  filterDimensions(arrToys: Toy[]): Toy[] {
    arrToys = arrToys.filter((node) => {
      let flag = false;
      const keys = Object.keys(Toys.toysSettings.dimensions);
      const booleans: boolean[] = [];
      keys.forEach((key) => booleans.push(Toys.toysSettings.dimensions[key]));
      if (!booleans.some((el) => el === true)) return (flag = true);

      Object.keys(Toys.toysSettings.dimensions).forEach((dimension) => {
        if (Toys.toysSettings.dimensions[dimension]) {
          if (dimension === 'small' && node.size === 'малый') flag = true;
          if (dimension === 'average' && node.size === 'средний') flag = true;
          if (dimension === 'big' && node.size === 'большой') flag = true;
        }
      });
      return flag;
    });
    return arrToys;
  }

  filterFavorites(arrToys: Toy[]): Toy[] {
    arrToys = arrToys.filter((node) => {
      let flag = false;
      const keys = Object.keys(Toys.toysSettings.favorites);
      const booleans: boolean[] = [];
      keys.forEach((key) => booleans.push(Toys.toysSettings.favorites[key]));
      if (!booleans.some((el) => el === true)) return (flag = true);

      Object.keys(Toys.toysSettings.favorites).forEach((key) => {
        if (Toys.toysSettings.favorites[key]) {
          if (key === 'favorite' && node.favorite === true) flag = true;
        }
      });
      return flag;
    });
    return arrToys;
  }

  render() {
    const filterValueContainer = document.createElement('div');
    filterValueContainer.classList.add('filters-value');

    const title = document.createElement('h3');
    title.classList.add('filters-value__title');
    title.textContent = 'фильтры по значению';

    const forms = document.createElement('div');
    forms.classList.add('filters-value__forms');

    const formsSubtitle = document.createElement('h4');
    formsSubtitle.classList.add('filters-value__subtitle');
    formsSubtitle.textContent = 'Форма:';
    forms.append(formsSubtitle);

    this.forms.forEach((subTitle) => {
      const input = document.createElement('input');
      input.classList.add('filters-value__checkbox');
      input.type = 'checkbox';
      input.id = subTitle;

      const label = document.createElement('label');
      label.classList.add('filters-value__label', `filters-value__${subTitle}`);
      label.setAttribute('for', subTitle);
      label.style.backgroundImage = `url('../../assets/svg/${subTitle}.svg')`;
      label.style.backgroundRepeat = 'no-repeat';
      label.style.backgroundSize = 'contain';
      label.style.width = '40px';
      label.style.height = '40px';
      label.style.backgroundPosition = 'center center';

      forms.append(input, label);

      input.addEventListener('change', () => {
        Toys.toysSettings.forms[subTitle] = input.checked;
        Toys.settingsChange();
      });
    });

    const colors = document.createElement('div');
    colors.classList.add('filters-value__colors');

    const colorsSubtitle = document.createElement('h4');
    colorsSubtitle.classList.add('filters-value__subtitle');
    colorsSubtitle.textContent = 'Цвет:';
    colors.append(colorsSubtitle);

    this.color.forEach((subTitle) => {
      const input = document.createElement('input');
      input.classList.add('filters-value__checkbox');
      input.type = 'checkbox';
      input.id = subTitle;

      const label = document.createElement('label');
      label.classList.add('filters-value__label', `filters-value__${subTitle}`);
      label.setAttribute('for', subTitle);
      label.style.backgroundColor = `${subTitle}`;
      label.style.width = '35px';
      label.style.height = '35px';
      label.style.borderRadius = '10px';

      colors.append(input, label);

      input.addEventListener('change', () => {
        Toys.toysSettings.colors[subTitle] = input.checked;
        Toys.settingsChange();
      });
    });

    const dimensions = document.createElement('div');
    dimensions.classList.add('filters-value__dimensions');

    const dimensionsSubtitle = document.createElement('h4');
    dimensionsSubtitle.classList.add('filters-value__subtitle');
    dimensionsSubtitle.textContent = 'Размер:';
    dimensions.append(dimensionsSubtitle);

    this.dimensions.forEach((subTitle, index) => {
      const input = document.createElement('input');
      input.classList.add('filters-value__checkbox');
      input.type = 'checkbox';
      input.id = subTitle;

      const label = document.createElement('label');
      label.classList.add('filters-value__label', `filters-value__${subTitle}`);
      label.setAttribute('for', subTitle);
      label.style.backgroundImage = 'url("../../assets/svg/ball.svg")';
      label.style.backgroundRepeat = 'no-repeat';
      label.style.backgroundSize = 'contain';
      label.style.width = `${30 + index * 5}px`;
      label.style.height = `${30 + index * 5}px`;
      label.style.backgroundPosition = 'center center';

      dimensions.append(input, label);

      input.addEventListener('change', () => {
        Toys.toysSettings.dimensions[subTitle] = input.checked;
        Toys.settingsChange();
      });
    });

    const favorites = document.createElement('div');
    favorites.classList.add('filters-value__favorites');

    const favoritesSubtitle = document.createElement('h4');
    favoritesSubtitle.classList.add('filters-value__subtitle');
    favoritesSubtitle.textContent = 'Только любимые:';
    favorites.append(favoritesSubtitle);

    this.favorites.forEach((subTitle) => {
      const input = document.createElement('input');
      input.classList.add('filters-value__checkbox');
      input.type = 'checkbox';
      input.id = subTitle;

      const label = document.createElement('label');
      label.classList.add('filters-value__label', `filters-value__${subTitle}`);
      label.setAttribute('for', subTitle);
      label.style.width = '35px';
      label.style.height = '35px';
      label.style.border = '1px solid #278d9f';
      label.style.borderRadius = '10px';

      favorites.append(input, label);

      input.addEventListener('change', () => {
        Toys.toysSettings.favorites[subTitle] = input.checked;
        Toys.settingsChange();
      });
    });

    filterValueContainer.append(title, forms, colors, dimensions, favorites);
    return filterValueContainer;
  }
}

export default FiltersValue;
