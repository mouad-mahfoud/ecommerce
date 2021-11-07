import {useEffect} from "react";
import {useSelector} from "react-redux";

const useAuth = ({ history }) => {
    const {currentUser} = useSelector(({user}) => ({
        currentUser: user.currentUser
    }));
    useEffect(() => {
        if (!currentUser){
            history.push('/login');
        }
    }, [currentUser]);

    return currentUser;
}

export default useAuth;