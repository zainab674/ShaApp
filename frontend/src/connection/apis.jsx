const getErrorMessage = (errorCode) => {
    console.log("Error Code:", errorCode);
    switch (errorCode) {
        case "auth/invalid-email":
            return "Invalid email address format.";
        case "auth/email-already-in-use":
            return "This email is already in use. Please log in.";
        case "auth/weak-password":
            return "The password is too weak. Use at least 6 characters.";
        case "auth/missing-password":
            return "Please enter a password.";
        case "auth/user-not-found":
            return "User not found. Please sign up first.";
        case "auth/wrong-password":
            return "Incorrect password. Please try again.";
        case "auth/invalid-credential":
            return "Incorrect credentials.";
        default:
            return "An error occurred. Please try again.";
    }
};

export const Signup = async (name, email, password, role, setError) => {
    if (!name || !email || !password || !role) {
        setError("Please enter all required fields.");
        return;
    }

    try {
        const response = await fetch("http://localhost:1234/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: role,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || "An error occurred during registration.");
            console.log(errorData.message)
            return; // Indicate failure
        }

        const data = await response.json();
        console.log("User registered successfully:", data);
        return data; // Indicate success
    } catch (err) {
        console.error("Error during registration:", err);
        setError("Network error. Please try again.");

    }
};


export const Login = async (email, password, setError) => {
    if (!email || !password) {
        setError("Please enter all required fields.");
        return;
    }

    try {
        const response = await fetch("http://localhost:1234/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || "An error occurred during login.");
            return;
        }

        const data = await response.json();
        console.log("User logged in successfully:", data);

        // Store token in local storage
        localStorage.setItem("accessToken", data.accessToken);
        return data.accessToken;
    } catch (err) {
        console.error("Error during login:", err);
        setError("Network error. Please try again.");
    }
};


export const Profile = async (token) => {


    try {


        const response = await fetch("http://localhost:1234/auth/me", {
            method: "GET",
            headers: {

                "authorization": `Bearer ${token}`
            },

        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
        }

        const dataa = await response.json();
        console.log("My Profile", dataa);
        return dataa;


    } catch (err) {
        console.log(err);
    }
};



export const AllServices = async () => {


    try {


        const response = await fetch("http://localhost:1234/service", {
            method: "GET",


        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
        }

        const dataa = await response.json();
        console.log("All Services:", dataa);
        return dataa.data;


    } catch (err) {
        console.log(err);
    }
};




export const UserService = async (id) => {


    try {


        const response = await fetch(`http://localhost:1234/service/users/${id}`, {
            method: "GET",


        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
        }

        const dataa = await response.json();
        console.log("Users Service:", dataa);
        return dataa;


    } catch (err) {
        console.log(err);
    }
};

export const SpecificService = async (id) => {


    try {


        const response = await fetch(`http://localhost:1234/service/specific/${id}`, {
            method: "GET",


        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
        }

        const dataa = await response.json();
        console.log("Specific Service:", dataa);
        return dataa;


    } catch (err) {
        console.log(err);
    }
};



export const ServiceReviews = async (id) => {


    try {


        const response = await fetch(`http://localhost:1234/rating/getServiceRatings/${id}`, {
            method: "GET",


        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
        }

        const dataa = await response.json();
        console.log("Service Rating:", dataa);
        return dataa;


    } catch (err) {
        console.log(err);
    }
};
export const SpecificUser = async (id) => {


    try {


        const response = await fetch(`http://localhost:1234/users/oneUser/${id}`, {
            method: "GET",


        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
        }

        const dataa = await response.json();
        console.log("Specific User:", dataa);
        return dataa;


    } catch (err) {
        console.log(err);
    }
};


