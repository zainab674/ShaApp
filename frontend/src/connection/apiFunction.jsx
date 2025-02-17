






import { apiConst } from '../constants/api.constants';
// import { AllUsers, UserProjects } from './allApis';
import { AllServices, Login, Signup } from './apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this CSS for styling

export const Onlogin = async (email, password, setError, setToken, navigate) => {
    try {
        const token = await Login(email, password, setError);
        console.log("hi", token);

        if (token) {
            setToken(token);
            toast.success("user logged in successfully!");

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


export const OnSignUp = async (name, email, password, role, setError) => {
    try {
        const response = await Signup(name, email, password, role, setError);

        if (response) {
            console.log("response", response)
            toast.success("User registered successfully!");
        }
        return response
    } catch (error) {
        console.error("Error in OnSignUp:", error);
        setError(error.message || "An error occurred during registration.");
    }
};



