

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


export const UpdateUser = async (data, token) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        }

        const response = await fetch(`http://localhost:1234/users`, {
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Error:", errorData);
            return;
        }

        const responseData = await response.json();
        console.log("User Updated:", responseData);
        return responseData;

    } catch (err) {
        console.log("Error:", err);
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


//SERVICE

export const CreateService = async (dataa, token) => {
    try {
        const response = await fetch("http://localhost:1234/service", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`, // Authorization header
            },
            body: dataa, // FormData instance
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error creating service:", errorData);
            return null; // Indicate failure
        }

        const data = await response.json();
        console.log("Service created successfully:", data);
        return data; // Indicate success
    } catch (err) {
        console.error("Error:", err);
        return null;
    }
};


export const UpdateService = async (id, data, token) => {


    try {


        const response = await fetch(`http://localhost:1234/service/${id}`, {
            method: "PATCH",
            headers: {

                "authorization": `Bearer ${token}`
            },
            body: data


        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
        }

        const dataa = await response.json(); // Handle the success response from your API
        console.log("Service Updated:", dataa);

        return dataa;


    } catch (err) {
        console.log(err);
    }
};

export const DeleteService = async (id, token) => {


    try {


        const response = await fetch(`http://localhost:1234/service/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },


        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
        }

        const dataa = await response.json(); // Handle the success response from your API
        console.log("Service Deleted:", dataa);

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


//SEARCH

export const SearchServiceByName = async (dataa) => {

    try {
        const response = await fetch("http://localhost:1234/service/searchByName", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(
                dataa
            ),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return; // Indicate failure
        }

        const data = await response.json();
        console.log("service searched successfully:", data);
        return data; // Indicate success
    } catch (err) {
        console.log(err);

    }
};





//BOOKING
export const RequestBooking = async (dataa, token) => {
    try {
        const response = await fetch("http://localhost:1234/booking", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`, // Authorization header
                "Content-Type": "application/json",
            },

            body: JSON.stringify(
                dataa
            )
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error requesting booking:", errorData);
            return null; // Indicate failure
        }

        const data = await response.json();
        console.log("booking created successfully:", data);
        return data; // Indicate success
    } catch (err) {
        console.error("Error:", err);
        return null;
    }
};


export const CheckBooking = async (id, token) => {


    try {


        const response = await fetch(`http://localhost:1234/booking/checkBooking/${id}`, {
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

        const dataa = await response.json(); // Handle the success response from your API


        return dataa;


    } catch (err) {
        console.log(err);
    }
};
