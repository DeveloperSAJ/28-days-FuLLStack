// Arrays

/*const array = [1,2,3,4,5]
console.log(array);

console.log(array[0]); // 0 => first value or first index
array[0] = 23; // changed the first value
console.log(array);

[1 , 'string', true, { name: 'object'}, ['a','r','r','a','y']]
console.log(typeof [1,2]); // object

console.log(Array.isArray([1,2])); // true

console.log(array.length);

array.push(100); // adds a value at the end of an array
console.log(array);

array.splice(0,1) // removes value => first = index & second = values
console.log(array);*/

/*const array1 = [1,2,3];
const array2 = array1.slice();
array2.push(4);
console.log(array1);
console.log(array2);

const [firstValue, secondValue] = [1, 2, 3];

for(let i = 1; i <= 10; i++){
  if(i % 3 === 0){
    continue; // skip
  }
  console.log(i);
  if(i === 8){
    break; // stop
  }
}*/
//-----------------------------------------------------------------------

// Loops

/*let i = 1;
while (i <= 5) {
  console.log(i);
  i += 1;
}

for (let i = 1; i <= 5; i++){
  console.log(i);
}

let randomNumber = 0;

while(randomNumber < 0.5){
  randomNumber = Math.random();
}

console.log(randomNumber);

const List = [
  'One',
  'Two',
  'Three'
]

for(let i = 0; i < todoList.length; i++){
  const value = todoList[i];
  console.log(value);
}
*/

// Accumulator Pattern
/*const nums = [1,1,3];
let total = 0;

for(let i = 0; i < nums.length; i++){
  const num = nums[i];
  total += num;
}
console.log(total);

const numsDobbled = [];

for(let i =0; i < nums.length; i++){
  const num = nums[i];
  numsDobbled.push(num * 2);
}
console.log(numsDobbled);
*/

//-----------------------------------------------------------------------

const todoList = [
  {
    name: "One",
    dueDate: "2026-2-17",
  },
];

renderTodoList();

function renderTodoList() {
  let todoListHtml = "";

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `<div>${name}</div>
       <div>${dueDate}</div> 
       <button class="delete-todo" onclick="
        todoList.splice(${index},1);
        renderTodoList();
      ">Delete</button>`;
    todoListHtml += html;
  })

  // for (let i = 0; i < todoList.length; i++) {
  //   const todoObject = todoList[i];
  //   //const name = todoObject.name;
  //   //const dueDate = todoObject.dueDate;
  //   const { name, dueDate } = todoObject; // Destructuring
  //   const html = `<div>${name}</div>
  //      <div>${dueDate}</div> 
  //      <button class="delete-todo" onclick="
  //       todoList.splice(${i},1);
  //       renderTodoList();
  //     ">Delete</button>`;
  //   todoListHtml += html;
  // }

  document.querySelector(".todo-list").innerHTML = todoListHtml;
}

function addTodo() {
  const inputElement = document.querySelector(".todo-input");
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".date-input");
  const dueDate = dateInputElement.value;

  todoList.push({
    name: name,
    dueDate,
  });

  // todoList.push(name);

  inputElement.value = "";
  renderTodoList();
}
