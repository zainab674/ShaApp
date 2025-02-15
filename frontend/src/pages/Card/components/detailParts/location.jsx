import React from 'react'




const Location = ({ service }) => {





    return (
        <>
            <div className="px-4 md:px-8 lg:px-16" id="location">
                <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-left mb-3 md:mb-4">Location</h1>
                <p className="text-sm md:text-base text-left mb-2 md:mb-3">{service.city}, {service.country}</p>
                <p className="text-sm md:text-base text-left mb-2 md:mb-3">Address: {service.address}</p>
                <div className="w-full h-48 md:h-64 lg:h-80">
                    {/* <Map Service={service} /> */}
                </div>
            </div>
        </>

    );

}

export default Location;
