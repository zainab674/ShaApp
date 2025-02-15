
import React from 'react'

import { useNavigate } from 'react-router-dom';
import { apiConst } from './../../../constants/api.constants';



const Card = ({ location }) => {
    const navigate = useNavigate();
    {
        console.log("hahahhahsbxhs", location)
    }
    const handleClick = () => {
        console.log("hi")
        navigate(apiConst.card.replace(':id', location.id));
    };
    return (
        <li className="relative w-72 p-2 mb-5 bg-white rounded-lg shadow-md flex-shrink-0">
            <img
                src={`http://localhost:1234/uploads/${location.image[0]}`}

                alt={location.title}
                className="w-full h-56 object-cover rounded-lg"
                onClick={handleClick}
            />
            <p className='xl font-normal'>{location.title} </p>


        </li>
    );
};

export default Card;