// DOM (Document Object Model)

/*console.log(document.title);
document.title = 'Changed';

console.log(document.body);
console.log(typeof document.body);

console.log(document.body.innerHTML);
//document.body.innerHTML = 'HTML Changed!';
document.body.innerHTML = '<button>Good Job!</button>'; */

// console.log(document.querySelector('button').innerHTML);
// document.querySelector('button').innerHTML = 'Changed';

// const buttonElement = document.querySelector('.js-button');
// console.log(buttonElement);

function subscribe() {
  const buttonElement = document.querySelector(".js-subscribe-btn");

  if (buttonElement.innerText === "Subscribe") {
    buttonElement.innerHTML = "Subscribed";
  } else {
    buttonElement.innerHTML = "Subscribe";
  }
}

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }

  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === computerMove) {
    result = "Tie";
  } else if (
    (playerMove === "Rock" && computerMove === "Scissors") ||
    (playerMove === "Paper" && computerMove === "Rock") ||
    (playerMove === "Scissors" && computerMove === "Paper")
  ) {
    result = "You Win!";
  } else {
    result = "You Lose!";
  }

  // Update score
  if (result === "You Win!") {
    score.wins++;
  } else if (result === "You Lose!") {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML =
    `You picked ${playerMove} - Computer picked ${computerMove}`;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

function calculateTotal() {
  const inputElement = document.querySelector(".js-cost-input");
  let cost = Number(inputElement.value);

  if (cost < 40) {
    cost = cost + 10;
  }

  document.querySelector(".js-total-cost").innerHTML = `$${cost}`;
}

function handleCostKey(event) {
  if (event.key === "Enter") {
    calculateTotal();
  }
}
