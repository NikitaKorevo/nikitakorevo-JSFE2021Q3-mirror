import './SortingToys.scss';

class SortingToys {
  getHowSortingToys: (a: string) => string;

  constructor(getHowSortingToys: (a: string) => string) {
    this.getHowSortingToys = getHowSortingToys;
  }

  getSortingToys(arrToys: any, HowSortingToys: string): ChildNode[] {
    console.log('Start getSortingToys');

    arrToys.sort((nodeA: ChildNode, nodeB: ChildNode) => {
      const titleA = nodeA.firstChild?.textContent as string;
      const titleB = nodeB.firstChild?.textContent as string;

      if (HowSortingToys === 'nameUp') return titleA > titleB ? 1 : -1;
      if (HowSortingToys === 'nameDown') return titleA < titleB ? 1 : -1;
    });

    return arrToys;
  }

  render() {
    const sortingToys = document.createElement('div');
    sortingToys.classList.add('sorting-toys');

    const title = document.createElement('h3');
    title.classList.add('sorting-toys__title');
    title.textContent = 'сортировка';

    const select = document.createElement('select');
    select.classList.add('sorting-toys__select');
    const options = [
      'По названию от "А" до "Я"',
      'По названию от "Я" до "А"',
      'По возрастанию количества',
      'По убыванию количества'
    ];
    const values = ['nameUp', 'nameDown', 'countUp', 'countDown'];
    options.forEach((option, i) => {
      select[i] = new Option(option, values[i]);
    });

    const buttonResetFilters = document.createElement('button');
    buttonResetFilters.classList.add('sorting-toys__button-reset-filters', 'button');
    buttonResetFilters.textContent = 'Сброс фильтров';

    select.addEventListener('change', () => {
      this.getHowSortingToys(select.value);
    });
    buttonResetFilters.addEventListener('click', () => {
      console.log('сбросить фильтры (dont work)');
    });

    sortingToys.append(title, select, buttonResetFilters);
    return sortingToys;
  }
}

export default SortingToys;
