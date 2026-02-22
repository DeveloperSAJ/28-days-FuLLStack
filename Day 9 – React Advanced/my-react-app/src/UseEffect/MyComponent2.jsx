import React,{useState, useEffect} from 'react'

function MyComponent2() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return() => {
      window.removeEventListener("resize", handleResize);
    }
  },[]);
  useEffect(() => {
    document.title = `Size: ${width} x ${height}`
  },[width, height]);

  function handleResize(){
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  return (
    <div>
      <p>Window Width: {width}</p>
      <p>Window Height: {height}</p>
    </div>
  )
}

export default MyComponent2