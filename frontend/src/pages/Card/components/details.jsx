import Images from "./detailParts/images";
import Section2 from "./detailParts/section2";
import MobileFooter from "./detailParts/mobilefooter";
import Location from "./detailParts/location";
import Reviews from "./detailParts/reviews";

const Detail = ({ Service, Vendor, reviews }) => {





    return (<>
        <>
            <div id="photos">
                <Images service={Service} />
            </div>

            <Section2 service={Service} vendor={Vendor} />





            <div id="reviews">
                <Reviews service={Service} rating={reviews} />
            </div>

            <div id="location">
                <Location service={Service} />
            </div>
            <MobileFooter service={Service} />

        </>

    </>
    )
}

export default Detail;