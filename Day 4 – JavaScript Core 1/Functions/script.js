// Functions => A block of code designed to perform a particular task. It is executed when "something" invokes it (calls it).

// Function Declaration
// function greet() {
//     console.log("Hello, World!");
// }

// greet(); // Output: Hello, World!

// Rock, Paper, Scissors Game

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
  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You Lose!";
    } else if (computerMove === "Scissors") {
      result = "You Win!";
    }

    alert(
      `You picked ${playerMove}. Computer picked ${computerMove}. ${result}`,
    );
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Win!";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Scissors") {
      result = "You Lose!";
    }

    alert(
      `You picked ${playerMove}. Computer picked ${computerMove}. ${result}`,
    );
  } else if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Lose!";
    } else if (computerMove === "Paper") {
      result = "You Win!";
    } else if (computerMove === "Scissors") {
      result = "Tie";
    }

    alert(
      `You picked ${playerMove}. Computer picked ${computerMove}. ${result}`,
    );
  }
}

function calculateTax(parameter1, parameter2) {
  console.log(parameter1 * parameter2);
}

calculateTax(2000, 0.1); // Output: 200
