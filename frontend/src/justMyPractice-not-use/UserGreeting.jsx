
import PropTypes from 'prop-types';
UserGreeting.proptype = {
    userName : PropTypes.string,
    isloggedIn : PropTypes.bool
}
UserGreeting.defaultProps ={
    isloggedIn:false,
    userName: "guest",
}

function UserGreeting(prop){


    const login = <h2 className="login-message">Please login to continue</h2>;
    const welcome = <h2 className="welcome-message">Welcome {prop.userName}</h2>;
    return (prop.isloggedIn ? welcome: login )
}


export default UserGreeting;

    // if(prop.isloggedIn){
    //     return(<><h2>Welcome {prop.userName}</h2> </>)
    // }
    // else{
    //     return <>Please login to continue</>
    // }