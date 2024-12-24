
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../../../../objects/cards';
import { apiConst } from '../../../../constants/api.constants';


const MobileFooter = (service) => {









    const payment = (id) => {
        console.log("iddd", id)
        navigate(apiConst.payment.replace(':id', id));
    };



    return (

        <>
            <div className="fixed bottom-0 pb-4 z-50 w-full bg-white shadow-lg md:hidden">

                <div className='flex justify-center items-center p-1'>
                    <div>
                        <h2 className="font-semibold text-gray-800 text-right">${service.price} <span className='text-sm font-normal'></span></h2>
                        {/* <p className="text-sm text-gray-600 text-right">Closes {card.closingDate}</p> */}
                    </div>
                    <div>
                        <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-md w-full ml-5" onClick={() => payment(service._id)}>
                            Book
                        </button>
                    </div>
                </div>

            </div>
        </>



    );

}

export default MobileFooter;

