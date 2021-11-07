import React from 'react';

import './styles.scss'
import Button from "../../../../components/Forms/Button";
import {auth, signInWithGoogle} from "../../../../firebase/utils";
import FormInput from "../../../../components/Forms/FormInput";
import {signInWithEmailAndPassword} from "firebase/auth";
import AuthWraper from "../../../../components/AuthWraper";
import {Link} from "react-router-dom";

const SignIn = (props) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            resetForm();
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <AuthWraper title="Sign In">
            <form onSubmit={handleFormSubmit}>
                <FormInput type="email" name="email" value={email} placeholder="email" required
                           onChange={e => setEmail(e.target.value)}/>
                <FormInput type="password" name="password" value={password} placeholder="Password" required
                           onChange={e => setPassword(e.target.value)}/>
                <Button type="submit">LogIn</Button>
            </form>
            <Button onClick={signInWithGoogle}>
                Sign In with Google
            </Button>
            <div className="links">
                <Link to="/reset-password">
                    Reset Password
                </Link>
            </div>
        </AuthWraper>
    )
}

export default SignIn;