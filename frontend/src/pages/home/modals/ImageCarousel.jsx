import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const PrevArrow = ({ onClick }) => (
    <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10"
        onClick={onClick}
        aria-label="Previous"
    >
        <span className="text-lg">&lt;</span>
    </button>
);

const NextArrow = ({ onClick }) => (
    <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10"
        onClick={onClick}
        aria-label="Next"
    >
        <span className="text-lg">&gt;</span>
    </button>
);

const ImageCarousel = ({ service }) => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 90,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        appendDots: (dots) => (
            <div
                style={{
                    backgroundColor: "transparent",
                    padding: "10px",
                    position: "absolute",
                    bottom: "10px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <ul style={{ margin: "0", padding: "0", display: "flex", gap: "2px" }}>
                    {dots.map((dot, index) => (
                        <li key={index} style={{ margin: "0", padding: "0" }}>
                            {dot}
                        </li>
                    ))}
                </ul>
            </div>
        ),
    };

    return (
        <div className="w-full h-96 overflow-hidden ">

            <Slider {...settings}>
                {Array.isArray(service.image) && (service.image).length > 0 ? (

                    (service.image).map((img, index) => (
                        <div key={index} className="w-full h-full">
                            <img
                                src={`http://localhost:1234/uploads/${img}`}
                                alt="https://www.w3schools.com/w3images/nature.jpg"
                                className="w-full h-96 object-cover"

                            />
                        </div>
                    ))
                ) : (
                    <img

                        src="https://www.w3schools.com/w3images/nature.jpg"
                        className="w-full h-56 object-cover"

                    />
                )}
            </Slider>
        </div>
    );
};

export default ImageCarousel;
