// Objects => A collection of key-value pairs. Keys are strings, and values can be any data type including other objects or functions.

// Creating an object

// const person = {
//   name: 'John',
//   age: 30,
// };

// // Accessing object properties
// console.log(person); // { name: 'John', age: 30 }
// console.log(person.name); // John
// console.log(person.age); // 30

// // changing object properties
// person.name = 'Jane';
// console.log(person.name); // Jane

// // Adding new properties to an object
// person.gender = 'male';
// console.log(person); // { name: 'Jane', age: 30, gender: 'male' }

// // Deleting properties from an object
// delete person.age;
// console.log(person); // { name: 'Jane', gender: 'male' }

// const product2 = {
//   name: 'shirt',
//   ['delivery time']: '1 day', // keys with spaces need to be in brackets and quotes
//   rating: { // nested object
//     stars: 4.5,
//     count: 87
//   },
//   fun: function() { // function as a value => method
//     console.log('This is inside function.');
//   }
// };
// console.log(product2); // { name: 'shirt', 'delivery time': '1 day' }
// console.log(product2.name); // shirt
// console.log(product2['name']); // shirt
// console.log(product2['delivery time']); // 1 day

// console.log(product2.rating.count); // 87

// product2.fun(); // This is inside function.

// JSON => JavaScript Object Notation => universal data format used for storing and exchanging data.

// const jsonString = JSON.stringify(product2); // convert Javascript object to JSON string
// console.log(jsonString);
// console.log(JSON.parse(jsonString)); // convert JSON string to Javascript object

// let user = 'computer';
// console.log(user.length); // 8
// console.log(user.toUpperCase()); // COMPUTER
// console.log(user.toLowerCase()); // computer

// const object1 = {
//   message: 'Hello, World!'
// }
// const object2 = object1;
// console.log(object1 === object2); // true =>  object2 is a reference to the same object as object1
// object1.message = 'Hello, Universe!';
// console.log(object1.message); // Hello, Universe!
// console.log(object2.message); // Hello, Universe! => object2 also reflects the change because it references the same object in memory
// const object3 = {
//   message: 'Hello',
//   price: 100
// }
// //const message = object3.message;
// const { message , price} = object3; // destructuring assignment
// console.log(message); // Hello
// console.log(price); // 100
//--------------------------------------------------------------------------------------------------------------
// Adding Objects in Rock, Paper, Scissors Game

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

// if (!score) {
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0,
//   };
// }

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

    if (result === "You Win!") {
      score.wins += 1;
    } else if (result === "You Lose!") {
      score.losses += 1;
    } else if (result === "Tie") {
      score.ties += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    alert(
      `You picked ${playerMove}. Computer picked ${computerMove}. ${result}. Score: Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`,
    );
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Win!";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Scissors") {
      result = "You Lose!";
    }

    if (result === "You Win!") {
      score.wins += 1;
    } else if (result === "You Lose!") {
      score.losses += 1;
    } else if (result === "Tie") {
      score.ties += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    alert(
      `You picked ${playerMove}. Computer picked ${computerMove}. ${result}. Score: Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`,
    );
  } else if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Lose!";
    } else if (computerMove === "Paper") {
      result = "You Win!";
    } else if (computerMove === "Scissors") {
      result = "Tie";
    }

    if (result === "You Win!") {
      score.wins += 1;
    } else if (result === "You Lose!") {
      score.losses += 1;
    } else if (result === "Tie") {
      score.ties += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    alert(
      `You picked ${playerMove}. Computer picked ${computerMove}. ${result}. Score: Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`,
    );
  }
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  alert("Score reset. Wins: 0, Losses: 0, Ties: 0");
}
