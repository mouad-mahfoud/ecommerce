import React from 'react';

import './styles.scss'
import FormInput from "../../../../components/Forms/FormInput";
import Button from "../../../../components/Forms/Button";
import {auth, handleUserProfile} from "../../../../firebase/utils";
import AuthWraper from "../../../../components/AuthWraper";


const Signup = (props) => {

    const [displayName, setDisplayName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errors, setErrors] = React.useState([]);


    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            const err = ['Password don\'t match'];
            setErrors(err);
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, {displayName});
            resetForm();
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <AuthWraper title="Sign Up">
            {errors.length > 0 && (
                <ul>
                    {errors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleFormSubmit}>
                <FormInput type="text" name="displayName" value={displayName} placeholder="Full name" required
                           onChange={e => setDisplayName(e.target.value)}/>
                <FormInput type="text" name="email" value={email} placeholder="Email" required
                           onChange={e => setEmail(e.target.value)}/>
                <FormInput type="password" name="password" value={password} placeholder="Password" required
                           onChange={e => setPassword(e.target.value)}/>
                <FormInput type="password" name="confirmPassword" value={confirmPassword} required
                           placeholder="Confirm password"
                           onChange={e => setConfirmPassword(e.target.value)}/>
                <Button type="submit">Register</Button>
            </form>
        </AuthWraper>
    );
}

export default Signup;