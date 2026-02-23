// Arrays 

let numbers1: number[] = [1,2,3,4,5];

//numbers.push('hello'); // Error

let numbers2: readonly number[] = [1,2,3,4,5];//readonly will make it const values 

// numbers2.push(8); // Error



let names: string[] = ["Alex", "John", "Peter"];

let flags: boolean[] = [true, false];


// Another Way

// let numbers: Array<number> = [1,2,3,4,5];
// let names = Array<string> = ["Alex", "John", "Peter"];

// Union Arrays

// let data: (number | string)[] = [1, 'hello',2,'world'];

// let users: { name: string; age: number; }[] = [
//   {name: "Developer", age: 22},
//   {name: "Alex", age: 25}
// ]

// Using Interface

interface User {
  name: string;
  age: number;
}

let users: User[] = [
  {name: "Developer", age: 22},
  {name: "Alex", age: 25}
];


let numbers3: number[] = [1,2,3];

// let doubled = numbers1.map((num) =>{
//   return num * 2;
// });

let doubled: number[] = numbers3.map((num: number): number =>{
  return num * 2;
})


let allNames = users.map((user) => user.name);


let data: (number | string)[] = [1, "hello", 2, "world"];

let numbersOnly = data.filter((item): item is number => typeof item === "number");


interface Product{
   id: number;
   price: number
}

let products = [
  { id: 1, price: 100 },
  { id: 2, price: 200 }
];

let totalPrices =
products.reduce<number>((acc, product) => {
  return acc + product.price;
}, 0);