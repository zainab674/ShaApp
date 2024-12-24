import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosHeart } from 'react-icons/io';
import dayjs from 'dayjs';

import ShareModal from '../../../common/modals/shareModal';
import Image from '../../modals/Image';
import { IoIosArrowBack } from "react-icons/io";
import Cards from '../../../../objects/cards';

const DesktopCard = (Dservice) => {


    const service = Dservice.Dservice.service;


    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const openModal = (location) => {
        setSelectedLocation(location);
        setModalOpen(true);
    };
    const closeModal = () => {
        setSelectedLocation(null);
        setModalOpen(false);
    };

    const [toggledHearts, setToggledHearts] = useState({});


    const toggleHeart = (id) => {
        setToggledHearts((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle the heart state for this location
        }));
    };



    const images = [
        "https://media.istockphoto.com/id/1408146514/photo/minimalistic-modern-private-house-exterior-in-pink-with-flamingos.jpg?s=612x612&w=0&k=20&c=eBUQw8rdxo5bvxnl6EUcQWkJ0WwqTv6UNTcqrOI74Dg=",
        "https://cdn.openart.ai/published/9ohAD2ktCjGkZWAOLxle/le4zwnzr_BIsd_1024.webp",
        " https://images.squarespace-cdn.com/content/v1/603879fa0773aa458e567927/1706711476458-AIWCVV1X6VUZX9KJX26Z/Cover+Image.JPG",
        " https://assets.teenvogue.com/photos/58e3b07d9093dd2fbd6babca/16:9/w_2560%2Cc_limit/47a2da2a-0193-4e88-b99d-1bca2d7c6235.jpg",
        " https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/at%2Fhouse%20tours%2F2022-07%2FAdora%2F09_Apartment_Therapy_House_of_Adora",


    ]

    return (
        <div className='hidden md:block '>


            <div className="p-4 px-16">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-medium mb-5 text-left">{service.title}</h1>
                    <div className='flex justify-center'>
                        <p className='inline-flex mx-2' onClick={() => openModal(service)}>
                            <MdOutlineFileUpload className='text-2xl mr-1' />
                            <span className='underline'>Share</span>
                        </p>
                        <p className='inline-flex mx-2' onClick={() => toggleHeart(service._id)}>
                            {toggledHearts[service._id] ?
                                <IoIosHeart className='text-lg mt-1 text-red-500 mr-1' /> :
                                <FaRegHeart className='text-lg mt-1 mr-1' />}
                            <span className='underline'>Save</span>
                        </p>
                    </div>
                </div>

                {selectedLocation && (
                    <ShareModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        selectedLocation={selectedLocation}
                    />
                )}
                <div className="grid grid-cols-3 gap-4 h-auto w-full" id='photos'>
                    {/* Large Image */}
                    <div className="col-span-2">
                        <img
                            src={images[0]}
                            alt="Large Image"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Smaller Images */}
                    <div className="grid grid-rows-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src={images[1]}
                                alt="Small Image 1"
                                className="w-full h-full object-cover"
                            />
                            <img
                                src={images[2]}
                                alt="Small Image 2"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src={images[3]}
                                alt="Small Image 3"
                                className="w-full h-full object-cover"
                            />
                            <img
                                src={images[4]}
                                alt="Small Image 4"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );

}


// function MobileCard() {

//     const { id } = useParams();
//     const foundCard = Cards.find(c => c.id == id);
//     const navigate = useNavigate();
//     const [card, setCard] = useState(foundCard);


//     const handleClick = () => {
//         navigate(-1);
//     };




//     const [toggledHearts, setToggledHearts] = useState({});


//     const toggleHeart = (id) => {
//         setToggledHearts((prevState) => ({
//             ...prevState,
//             [id]: !prevState[id], // Toggle the heart state for this location
//         }));
//     };

//     useEffect(() => {
//         // Fetch card details based on the ID
//         const foundCard = Cards.find(c => c.id == id);
//         setCard(foundCard);
//     }, [id]);

//     if (!card) return <div>Loading...</div>;
//     return (
//         <div className="max-w-md mx-auto bg-white  overflow-hidden block md:hidden">
//             {/* Image Section */}
//             <div className="relative">
//                 <Image
//                     images={card.images}
//                     title={card.title}


//                 />
//                 {/* <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
//                     1 / 5
//                 </div> */}
//             </div>
//             {/* Live Badge */}

//             <div className="absolute top-6 left-6 bg-white text-black rounded-full p-1 text-xl">
//                 <IoIosArrowBack
//                     onClick={handleClick}
//                 />
//             </div>



//             {/* Share Icon */}

//             <div className="absolute top-6 right-20 bg-white text-black rounded-full p-1 text-xl" >
//                 <MdOutlineFileUpload />
//             </div>


//             <div
//                 className={`absolute top-6 right-6 bg-white text-black rounded-full p-1 text-xl cursor-pointer ${toggledHearts[card.id] ? 'text-red-500' : 'text-black'}`}
//                 onClick={() => toggleHeart(card.id)}
//             >
//                 {toggledHearts[card.id] ? <IoIosHeart /> : <FaRegHeart />}
//             </div>

//             {/* Text Section */}
//             <div className="p-4">
//                 <h3 className="text-xl font-semibold mb-2">
//                     {card.title}
//                 </h3>

//             </div>
//         </div>


//     );
// };










const Images = (service) => {
    return (
        <>
            <DesktopCard Dservice={service} />
            {/* <MobileCard service={Service} /> */}
        </>
    )
}

export default Images;
