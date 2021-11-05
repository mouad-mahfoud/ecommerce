import React from 'react';

import './styles.scss'
import Button from "../../../../components/Forms/Button";
import {auth, signInWithGoogle} from "../../../../firebase/utils";
import FormInput from "../../../../components/Forms/FormInput";
import { signInWithEmailAndPassword  } from "firebase/auth";

const initialState = {
    email: '',
    password: ''
};

const SignIn = (props) => {

    const [state, setState] = React.useState(initialState);

    const handleFormInputChange = (event) => {
        const {name, value} = event.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = state;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setState(initialState);
        }
        catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="signIn">
            <h2>
                Login
            </h2>
            <form onSubmit={handleFormSubmit}>
                <FormInput type="email" name="email" value={state.email} placeholder="email" required
                           onChange={handleFormInputChange}/>
                <FormInput type="password" name="password" value={state.password} placeholder="Password" required
                           onChange={handleFormInputChange}/>
                <Button type="submit">LogIn</Button>
            </form>
            <Button onClick={signInWithGoogle}>
                Sign In with Google
            </Button>
        </div>
    )
}

export default SignIn;