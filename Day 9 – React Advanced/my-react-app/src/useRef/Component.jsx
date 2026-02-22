import React,{useState, useEffect, useRef}from 'react'

function Component() {

  const inputRef = useRef(0);

  function handleClick(){
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "teal"
  }

  useEffect(() =>{

  })
  return (
    <>
    <button onClick={handleClick}>
      Click me
    </button>
    <input ref={inputRef}/>
    </>
  )
}

export default Component;
