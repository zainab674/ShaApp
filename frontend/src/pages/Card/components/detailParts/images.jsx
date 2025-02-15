import React from 'react'


const Images = ({ service }) => {
    if (!service || !service.image || service.image.length === 0) {
        return <div>No images available</div>;
    }

    const largeImage = service.image[0]; // The first image
    const smallerImages = service.image.slice(1); // Remaining images

    return (
        <div className="p-4 md:px-16">
            <div className="flex justify-between">
                <h1 className="text-xl md:text-2xl font-medium mb-5 text-left">{service.title}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="photos" style={{ height: 'auto' }}>
                {/* Large image */}
                <div className="md:col-span-2 h-64 md:h-[500px]">
                    <img
                        src={`http://localhost:1234/uploads/${largeImage}`}
                        alt="Large Image"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Smaller images */}
                {smallerImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                        {smallerImages.map((img, index) => (
                            <img
                                key={index}
                                src={`http://localhost:1234/uploads/${img}`}
                                alt={`Small Image ${index + 1}`}
                                className="w-full h-32 sm:h-[250px] object-cover rounded-lg"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default Images;
