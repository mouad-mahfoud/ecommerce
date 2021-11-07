import React from 'react';

import { withRouter } from 'react-router-dom'
import AuthWraper from "../../components/AuthWraper";
import FormInput from "../../components/Forms/FormInput";
import Button from "../../components/Forms/Button";
import {auth} from "../../firebase/utils";


const ResetPassword = ({ history }) => {

    const [email, setEmail] = React.useState('');
    const [errors, setErrors] = React.useState([]);


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await auth.sendPasswordResetEmail(email, {
                url: 'http://localhost:3001/login'
            });
            history.push('/login');
        } catch (err) {
            setErrors( [err.message]);
        }
    }

    return(
        <AuthWraper title="Reset Password">
            {errors.length > 0 && (
                <ul>
                    {errors.map((el, index) => <li key={index}>
                        {el}
                    </li>)}
                </ul>
            )}
            <form onSubmit={handleFormSubmit}>
                <FormInput type="email" name="email" value={email} placeholder="email" required
                           onChange={e => setEmail(e.target.value)}/>
                <Button type="submit">Send</Button>
            </form>
        </AuthWraper>
    )
}

export default withRouter(ResetPassword);