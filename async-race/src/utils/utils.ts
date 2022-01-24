export function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export function getRandomHexColor(): string {
  const r = getRandomNumber(0, 255);
  const g = getRandomNumber(0, 255);
  const b = getRandomNumber(0, 255);

  return [r, g, b].reduce((previous, current) => {
    const hex = current.toString(16);
    if (hex.length === 1) return `${previous}0${hex}`;
    return previous + hex;
  }, '#');
}
