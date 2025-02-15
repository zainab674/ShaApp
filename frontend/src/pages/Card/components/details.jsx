import Section2 from "./detailParts/section2";
import Location from "./detailParts/location";
import Reviews from "./detailParts/reviews";
import ImageCarousel from "../../home/modals/ImageCarousel";
import Images from "./detailParts/images";
import React from 'react'


const Detail = ({ Service, Vendor, reviews }) => {





    return (<>
        <>
            <div id="photos">
                {/* <ImageCarousel service={Service} /> */}
                <Images service={Service} />
            </div>

            <Section2 service={Service} vendor={Vendor} />





            <div id="reviews">
                <Reviews service={Service} rating={reviews} />
            </div>

            <div id="location">
                <Location service={Service} />
            </div>

        </>

    </>
    )
}

export default Detail;