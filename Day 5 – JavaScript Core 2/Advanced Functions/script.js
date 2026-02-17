// Advanced Functions

/*function greeting(){
  console.log('hello');
}

greeting();

const num = 2;
const function1 = function greeting() {
  console.log('hello2');
}

console.log(function1);
console.log(typeof function1); // function
function1();

const object1 = {
  num: 2,
  fun: function(){
    console.log('hello3');
  }
}
object1.fun();

function display(param){
  console.log(param);
}
display(2);

function run(param){
  param();
}

run(function(){
  console.log('hello4');
})

setTimeout(function(){
  console.log('timeout');
  console.log('timeout2');
}, 3000);

console.log('next line');

setInterval(function(){
  console.log('interval');
}, 3000);

console.log('next line 2'); */

// [
//   'One',
//   'Two',
//   'Three'
// ].forEach(function(value, index){

//   if(value === 'Two'){
//     return;
//   }
//   console.log(value);
//   console.log(index);
// })

//------------------------------------------------------

// Arrow Functions

/*const arrowFunction = (param,param2) => {
  console.log('hello');
  return 5;
}
arrowFunction();

const oneParam = param => {
  console.log(param + 1);
}
oneParam(2);

const oneLine = () => 2 + 3;

const object2 = {
  method: () => {

  },
  method(){

  }
}
*/
//------------------------------------------------------
//AdEventListener

/*const btnElement = document.querySelector(".btn");
const EL1 = btnElement.addEventListener("click", () => {
  console.log("clicked");
});

btnElement.removeEventListener("click", EL1);

document.body.addEventListener("keydown", (event) => {
  //console.log(event.key);
  if (event.key === "Enter") {
    btnElement.addEventListener("click", () => {
      console.log("Enter Key is clicked");
    });
  } else {
    console.log("press Enter");
  }
});
*/

//---------------------------------------------------
// .filter 

// [1,-3, 5].filter((value, index) => {
//   // if(value >= 0){
//   //   return true;
//   // } else {
//   //   return false;
//   // }
//   return value >= 0;
// })

// // .map

// [1,1,3].map((value, index) => {
//   return value * 2;
// })

// [1,1,3].map((value, index) => value * 2);

// closures



//-----------------------------------------------------
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
  document.querySelector(".js-moves").innerHTML = `You
        <img src="images/${playerMove}-emoji.png" class="move-icon" alt="Paper">
        <img src="images/${computerMove}-emoji.png" class="move-icon" alt="Scissors">
        Computer`;
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

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  const autoBtn = document.querySelector('.auto-btn');
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
      autoBtn.innerHTML = "Stop";
    }, 1000);
    isAutoPlaying = true;
  } else {
    autoBtn.innerHTML = "Auto Play"
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
