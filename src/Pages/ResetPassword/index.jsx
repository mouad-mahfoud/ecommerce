import React from 'react';

import { withRouter } from 'react-router-dom'
import AuthWraper from "../../components/AuthWraper";
import FormInput from "../../components/Forms/FormInput";
import Button from "../../components/Forms/Button";
import {auth} from "../../firebase/utils";


const initialState = {
    email: '',
    errors: []
};
const ResetPassword = ({ history }) => {

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
        const { email } = state;

        try {
            await auth.sendPasswordResetEmail(email, {
                url: 'http://localhost:3001/login'
            });
            history.push('/login')
        } catch (err) {
            setState({
                errors: [err.message]
            })
        }
    }

    return(
        <AuthWraper title="Reset Password">
            {state.errors.length > 0 && (
                <ul>
                    {state.errors.map((el, index) => <li key={index}>
                        {el}
                    </li>)}
                </ul>
            )}
            <form onSubmit={handleFormSubmit}>
                <FormInput type="email" name="email" value={state.email} placeholder="email" required
                           onChange={handleFormInputChange}/>
                <Button type="submit">Send</Button>
            </form>
        </AuthWraper>
    )
}

export default withRouter(ResetPassword);