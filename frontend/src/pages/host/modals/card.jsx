

import { useNavigate } from 'react-router-dom';
import { apiConst } from './../../../constants/api.constants';



const Card = ({ title, id, }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("hi")
        navigate(apiConst.card.replace(':id', id));
    };
    return (
        <li className="relative w-72 p-2 mb-5 bg-white rounded-lg shadow-md flex-shrink-0">
            {/* Image */}
            <img
                src="https://media.istockphoto.com/id/1408146514/photo/minimalistic-modern-private-house-exterior-in-pink-with-flamingos.jpg?s=612x612&w=0&k=20&c=eBUQw8rdxo5bvxnl6EUcQWkJ0WwqTv6UNTcqrOI74Dg="

                alt={title}
                className="w-full h-56 object-cover rounded-lg"
                onClick={handleClick}
            />
            <p className='xl font-normal'>{title} </p>


        </li>
    );
};

export default Card;