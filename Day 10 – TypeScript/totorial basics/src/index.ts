// let sales: number = 123_456_89;
// let course: string = 'Typescript';
// let is_published: boolean = true;
// let level: any;

// function render(document: any){
//   console.log(document);
// }

// Arrays
// let numbers: number[] = [1, 2, 3];
// numbers?.[0];

//Tuple

// let user: [number, string] = [1, "Developer"];
// user.push(1);

//Enums

// const small = 1;
// const medium = 2;
// const large = 3;

// const enum Size {Small = 1, Medium, Large};
// let mySize: Size = Size.Medium;

//Functions

// function calculateTax(income: number, taxYear = 2022): number{
//   if(taxYear < 2022)
//     return income * 1.2;
//   return income * 1.3;
// }

// calculateTax(10_000, 2022);

// Objects

// type Emplyee = {
//   readonly id: number,
//   name: string,
//   retire: (data: Date) => void
// }

// let employee: Emplyee = {
//   id: 1,
//   name: "Developer",
//   retire: (date: Date) =>{
//     console.log(date);
//   }
// };

//Union Types

// function kgToLbs(weight:number | string): number {
//   // Narrowing
//   if(typeof weight === 'number'){
//     return weight *2.2;
//   }
//   else{
//      return parseInt(weight) * 2.2;
//   }
// }

// kgToLbs(10);
// kgToLbs('10kg')


//Intersction Type

// type Draggable = {
//   drag: () => void
// }

// type Resizable = {
//   resize: () => void
// }

// type UIWdget = Draggable & Resizable;

// let textBox: UIWdget = {
//   drag: () => {},
//   resize: () => {}
// }

//literal types
// type Quantity = 50 | 100;

// let quantity: Quantity = 100;

// type Metric = 'cm' | 'inch';

// Nullable Types

// function greet(name: string | null | undefined){
//   if(name){
//     console.log(name.toUpperCase());
//   }
//   else{
//     console.log("Hola");
//   }
// }

// greet(undefined);

type Customer = {
  birthday?: Date
}

function getCustomer(id:number): Customer | null |undefined {
  return id === 0 ? null : { birthday: new Date()};
}

let customer = getCustomer(1);

console.log(customer?.birthday?.getFullYear());


let log: any = null;
log?.('a');