import React,{useState} from 'react'

function MyComponent3() {

  const [car, setCar] = useState({year: 2024, make: "Food", model: "Mustang"});

  function handleYearChange(e){
    setCar(c => ({...c,year: e.target.value}));
  }

  function handleMakeChange(e){
    setCar(c => ({...c, make: e.target.value}));
  }

  function handleModelChange(e){
    setCar(c => ({...c, model: e.target.value}));

  }
  return (
    <div>
      <p>Your Favorite car is: {car.make} {car.model} {car.year}</p>
      <input type="number" value={car.year} onChange={handleYearChange} />
      <input type="text" value={car.make} onChange={handleMakeChange}/>
      <input type="text" value={car.model} onChange={handleModelChange} />
    </div>
  )
}

export default MyComponent3;
