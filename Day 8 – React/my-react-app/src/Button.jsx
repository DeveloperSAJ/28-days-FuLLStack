
function Button(){

  const styles ={
  backgroundColor: "cornflowerblue",
  color:"white",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer"
  }
  return(
    <button className={styles}>Click Me</button>
  )
}
export default Button;