import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {

    const title = () => (
        <div className="jumbotron">
                    <h2>Sign-in for Doctor</h2>
        </div>
    )

    const clickSignIn = event => {
    
    }
    
    const SignInButton = () => (
        <Link to={`/doctor/dashboard`}>
            <div className="col text-center" >
                <button onClick={clickSignIn} className="btn btn-primary ">Sign In</button>
            </div>
        </Link>
    )

    return(
        <div>
            {title()}
            {SignInButton()}
        </div>
    )
}

export default SignIn