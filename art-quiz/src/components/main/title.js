class Title {
  constructor() {
    this.title = 'Art Quiz';
  }

  render() {
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = this.title;
    return title;
  }
}

export default Title;
