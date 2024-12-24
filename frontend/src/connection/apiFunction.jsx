






import { apiConst } from '../constants/api.constants';
// import { AllUsers, UserProjects } from './allApis';
import { AllServices, Login, Signup } from './apis';

export const Onlogin = async (email, password, setError, setToken, navigate) => {
    try {
        const token = await Login(email, password, setError);
        console.log("hi", token);

        if (token) {
            setToken(token);
            navigate(apiConst.home)
        }
    } catch (error) {
        console.error("Login Error:", error);
        setError(error.message || "An error occurred during login");
    }
};


export const LogOut = (setToken, navigate) => {
    localStorage.removeItem('accessToken');
    setToken('');
    navigate(apiConst.home);
};


export const OnSignUp = async (name, email, password, role, setError, navigate) => {
    try {
        const response = await Signup(name, email, password, role, setError);

        // Only navigate if the signup was successful\\
        if (response) {
            console.log("response", response)
            navigate(apiConst.login);
        }
    } catch (error) {
        console.error("Error in OnSignUp:", error);
        setError(error.message || "An error occurred during registration.");
    }
};



