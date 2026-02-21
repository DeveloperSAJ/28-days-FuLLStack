import profilePic from './assets/developer.jpg'

function Card(){
  return(
    <div className="card">
      <img className='card-image' src={profilePic} alt="profile Picture" />
      <h2 className='card-title'>SAJ Developer</h2>
      <p className='card-text'>I am FullStack Developer</p>
    </div>
  );
}

export default Card;