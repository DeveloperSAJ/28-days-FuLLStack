
function Button(){

  const styles ={
  backgroundColor: "cornflowerblue",
  color:"white",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer"
  }
  // const handleClick = (name) =>{
  //   let count = 0;
  //   if(count < 3){
  //     count++;
  //     console.log(`${name} you clicked me ${count} times`);
  //   } else{
  //     console.log(`${name} stop clicking me!`);
  //   }
  // };
  const handleClick = (e) => e.target.textContent = "OUCH!";
  return(
    // <button onClick={() => handleClick("Bro")} className={styles}>Click Me</button>
    <button onDoubleClick={(e) => handleClick(e)} className={styles}>Click Me</button>
  )
}
export default Button;