const videoProgress = document.querySelector('.video__progress');
const volumeLevel = document.querySelector('.video__volume-level');

videoProgress.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `-webkit-gradient(linear, left top, right top, from(#24809E), color-stop(${value}%, #24809E), color-stop(${value}%, #fff), to(#fff))`;
  this.style.background = `linear-gradient(left, #24809E 0%, #24809E ${value}%, #fff ${value}%, #fff 100%)`;
})

volumeLevel.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `-webkit-gradient(linear, left top, right top, from(#24809E), color-stop(${value}%, #24809E), color-stop(${value}%, #fff), to(#fff))`;
  this.style.background = `linear-gradient(left, #24809E 0%, #24809E ${value}%, #fff ${value}%, #fff 100%)`;
})