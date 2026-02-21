function List(props) {
  // const fruits = [
  //   { id: 1, name: "apple", calories: 95 },
  //   { id: 2, name: "orange", calories: 45 },
  //   { id: 3, name: "banana", calories: 105 },
  //   { id: 4, name: "grapes", calories: 93 },
  //   { id: 5, name: "pineapple", calories: 37 },
  // ];

  // fruits.sort((a, b) => b.name.localeCompare(a.name)); // Alphabetical
  // fruits.sort((a, b) => a.name.localeCompare(a.name)); // Reverse Alphabetical

  // fruits.sort((a, b) => a.calories - b.calories); // Numeric
  // fruits.sort((a, b) => a.calories - b.calories); // Reverse Numeric

  // const lowCalFruit = fruits(fruit => fruit.calories < 100);

  // const highCalFruit = fruits(fruit => fruit.calories >= 100);

  const itemList = props.items;

  const listItems = itemList.map((fruit) => (
    <li key={itemList.id}>
      {itemList.name}: &nbsp;
      <b>{itemList.calories}</b>
    </li>
  ));

  return(
    <>
    <h3>{category}</h3>
      <ol>{listItems}</ol>
    </>
  ) 
}
export default List;
