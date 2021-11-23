import './Button.scss';

class Button {
  constructor(text = '') {
    this.text = text;
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = this.text;
    return button;
  }
}

export default Button;
