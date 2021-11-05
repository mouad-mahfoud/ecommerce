import React from 'react';

import './styles.scss'
import FormInput from "../../../../components/Forms/FormInput";
import Button from "../../../../components/Forms/Button";
import {auth, handleUserProfile} from "../../../../firebase/utils";


const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};

const Signup = (props) => {

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
        const {
            displayName,
            email,
            password,
            confirmPassword,
        } = state;
        if (password !== confirmPassword) {
            const err = ['Password don\'t match'];
            setState(prevState => ({
                ...prevState,
                errors: err
            }))
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, {displayName});
            setState(initialState)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="signUp">
            <h2>
                Sign Up
            </h2>

            {state.errors.length > 0 && (
                <ul>
                    {state.errors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleFormSubmit}>
                <FormInput type="text" name="displayName" value={state.displayName} placeholder="Full name" required
                           onChange={handleFormInputChange}/>
                <FormInput type="text" name="email" value={state.email} placeholder="Email" required
                           onChange={handleFormInputChange}/>
                <FormInput type="password" name="password" value={state.password} placeholder="Password" required
                           onChange={handleFormInputChange}/>
                <FormInput type="password" name="confirmPassword" value={state.confirmPassword} required
                           placeholder="Confirm password"
                           onChange={handleFormInputChange}/>
                <Button type="submit">Register</Button>
            </form>
        </div>
    );
}

export default Signup;