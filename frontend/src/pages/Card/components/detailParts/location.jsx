



const Location = ({ service }) => {





    return (
        <>

            <div className='px-4 md:px-8 lg:px-16' id='location'>
                <h1 className='text-xl md:text-2xl font-medium text-left mb-4'>Location</h1>
                <p className='text-sm md:text-base text-left mb-5'>{service.city}, {service.country}</p>
                <p className='text-sm md:text-base text-left mb-5'>Address: {service.address}</p>
                <div className=''>
                    {/* <Map Service={service} /> */}
                </div>
            </div>

        </>
    );

}

export default Location;
