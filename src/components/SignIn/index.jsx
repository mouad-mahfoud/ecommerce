import React from 'react';

import './styles.scss'
import Button from "../Forms/Button";
import {signInWithGoogle} from "../../firebase/utils";

const SignIn = (props) => {
        return (
            <div className="signIn">
                <h2>
                    Login
                </h2>
                <Button onClick={signInWithGoogle}>
                    Sign In with Google
                </Button>
            </div>
        )
    }

export default SignIn;