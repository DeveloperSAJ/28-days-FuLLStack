
function ProfilePicture () {
  const imageURl = './assets/developer.jpg';
  const handleClick = (e) => e.target.style.display = "none";
  return (
    <img onClick={(e) => handleClick(e)} src={imageURl} alt="profilePicture" />
  )
  
}
export default ProfilePicture;