
import PropTypes from 'prop-types';
function UserGreeting(props){
  // if(props.isLoggedIn){
  //   return (
  //     <h2>Welcome {props.username}</h2>
  //   )
  // } else{
  //   return (
  //     <h2>Please log in to continue</h2>
  //   )
  // }
  return(props.isloggedIn ? <h2>Welcome {props.username}</h2> : <h2>Please log in to continue</h2>)
}

UserGreeting.PropTypes = {
  isloggedIn: PropTypes.bool,
  username: PropTypes.string,
}

UserGreeting.defaultProps = {
  isloggedIn: false,
  username: "Guest"
}
export default UserGreeting;