const screens = document.querySelectorAll(".screen");
const startButton = document.getElementById("start-btn");
const chooseSweetBtns = document.querySelectorAll(".choose-sweet-btn");
const gameNode = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");

let seconds = 0;
let score = 0;
let selectedSweet = {};

startButton.addEventListener("click", () => {
  screens[0].classList.remove("visible");
  screens[1].classList.add("visible");
});

chooseSweetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");

    selectedSweet = { src };

    screens[1].classList.remove("visible");
    screens[2].classList.add("visible");

    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);

  createSweet();
}

function increaseTime(params) {
  timeEl.innerHTML = `Час: ${seconds}`;
  seconds++;
}

function playBiteSound(params) {
  const audio = document.getElementById("bite");
  audio.play();
}

function createSweet(params) {
  const { x, y } = getRandomLocation();
  console.log(x, y);

  const sweet = document.createElement("img");

  sweet.src = selectedSweet.src;

  sweet.classList.add("sweet");
  sweet.style.display = "block";
  sweet.style.top = `${y}px`;
  sweet.style.left = `${x}px`;
  sweet.style.transform = `rotate${Math.random() * 360}`;

  sweet.addEventListener("click", catchSweet);

  gameNode.appendChild(sweet);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = Math.random() * (width - 100);
  const y = Math.random() * (height - 100);

  return { x, y };
}

function increaseScore() {
  scoreEl.innerHTML = `Рахунок: ${score}`;
  score++;
}

function catchSweet() {
  playBiteSound();
  increaseScore();

  this.remove();

  addSweet();
}

function addSweet() {
  setTimeout(createSweet, 1000);
}
