import React, { useRef, useState, useEffect } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';




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

const ImageCarousel = ({ title, id, handleClick }) => {
    const images = [
        "https://media.istockphoto.com/id/1408146514/photo/minimalistic-modern-private-house-exterior-in-pink-with-flamingos.jpg?s=612x612&w=0&k=20&c=eBUQw8rdxo5bvxnl6EUcQWkJ0WwqTv6UNTcqrOI74Dg=",
        "https://cdn.openart.ai/published/9ohAD2ktCjGkZWAOLxle/le4zwnzr_BIsd_1024.webp",
        " https://images.squarespace-cdn.com/content/v1/603879fa0773aa458e567927/1706711476458-AIWCVV1X6VUZX9KJX26Z/Cover+Image.JPG",
        " https://assets.teenvogue.com/photos/58e3b07d9093dd2fbd6babca/16:9/w_2560%2Cc_limit/47a2da2a-0193-4e88-b99d-1bca2d7c6235.jpg",
        " https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/at%2Fhouse%20tours%2F2022-07%2FAdora%2F09_Apartment_Therapy_House_of_Adora",


    ]
    const settings = {
        dots: true,
        infinite: true,
        speed: 90,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        appendDots: dots => (
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
        <div className="w-full h-56 overflow-hidden rounded-lg">
            <Slider {...settings}>
                {Array.isArray(images) && images.length > 0 ? (
                    images.map((img, index) => (
                        <div key={index} className="w-full h-full">
                            <img
                                src={img}
                                alt={`${title} image ${index + 1}`}
                                className="w-full h-56 object-cover"
                                onClick={() => handleClick(id)}
                            />
                        </div>
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </Slider>
        </div>
    );
};

export default ImageCarousel;