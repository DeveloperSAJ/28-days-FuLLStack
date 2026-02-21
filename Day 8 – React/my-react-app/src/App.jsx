//import PropTypes from 'prop-types';
import "./App.css";
import List from "./List";

function App() {
  const fruits = [
    { id: 1, name: "apple", calories: 95 },
    { id: 2, name: "orange", calories: 45 },
    { id: 3, name: "banana", calories: 105 },
    { id: 4, name: "grapes", calories: 93 },
    { id: 5, name: "pineapple", calories: 37 },
  ];
  const vegetables = [
    { id: 6, name: "potatoes", calories: 110 },
    { id: 7, name: "celery", calories: 15 },
    { id: 8, name: "carrots", calories: 25 },
    { id: 9, name: "corn", calories: 63 },
    { id: 10, name: "broccoli", calories: 50 },
  ];
  return (
    <>
      {/* <Student name="alex" age={30} isStudent="true"/>
      <Student name="John" age={42} isStudent="false"/>
      <Student name="Sara" age={28} isStudent="true"/> */}

      {/* <UserGreeting isLoggedIn = {ture} username= "DeveloperSAj"/> */}
      {fruits.length > 0 && <List items={fruits} category="Fruits"/>}
      
      {vegetables.length > 0 && <List items={vegetables} category="Vegetables"/>} 
    </>
  );
}
// Student.propTypes = {
//   name: PropTypes.string,
//   age: PropTypes.number,
//   isStudent: PropTypes.bool
// }

// Student.defaultProps ={
//   name: "guest",
//   age: 0,
//   isStudent: false
// }
export default App;
