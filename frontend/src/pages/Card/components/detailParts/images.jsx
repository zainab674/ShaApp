const Images = ({ service }) => {
    if (!service || !service.image || service.image.length === 0) {
        return <div>No images available</div>;
    }

    const largeImage = service.image[0]; // The first image
    const smallerImages = service.image.slice(1); // Remaining images

    return (
        <div className="p-4 px-16">
            <div className="flex justify-between">
                <h1 className="text-2xl font-medium mb-5 text-left">{service.title}</h1>
            </div>

            <div className="grid grid-cols-3 gap-4" id="photos" style={{ height: '500px' }}>
                {/* Large image */}
                <div className="col-span-2 h-full">
                    <img
                        src={`http://localhost:1234/uploads/${largeImage}`}
                        alt="Large Image"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Smaller images */}
                {smallerImages.length > 0 && (
                    <div className="grid gap-4 h-full">
                        {smallerImages.map((img, index) => (
                            <img
                                key={index}
                                src={`http://localhost:1234/uploads/${img}`}
                                alt={`Small Image ${index + 1}`}
                                className={`w-full object-cover`}
                                style={{
                                    height: `calc(500px / ${Math.min(smallerImages.length, 2)})`,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Images;
