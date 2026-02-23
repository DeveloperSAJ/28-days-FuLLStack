// Functions

function add(a: number, b: number): number {
  return a + b;
}
// add(2,"3"); // Error
add(1,2);

const multiply = (a: number, b: number): number => {
  return a * b;
};

multiply(2,3);

function logMessage(message: string): void {
  console.log(message);
}
// void => return nothing
logMessage("Hello World");


function greet(name: string, age?: number): string {
  if (age) {
    return `Hello ${name}, age ${age}`;
  }
  return `Hello ${name}`;
}

interface User {
  name: string;
  age: number;
}

function printUser(user: User): string {
  return `${user.name} is ${user.age}`;
}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}