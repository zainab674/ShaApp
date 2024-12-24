import CardNavbar from "./components/navbar";
import Detail from "./components/details";
import Footer from "./../common/footer"
import FixedNav from "./components/fixednavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ServiceReviews, SpecificService, SpecificUser } from "../../connection/apis";
const CardDetail = () => {
    const { id } = useParams();
    const [Service, setService] = useState({});
    const [Vendor, setVendor] = useState({});
    const [reviews, setReviews] = useState([]);

    const GetService = async () => {
        try {
            const res = await SpecificService(id);
            setService(res);
            console.log("Service Data:", res);
        } catch (error) {
            console.error("Error fetching Service DATA:", error);
        }
    };

    const GetVendor = async () => {
        try {
            const res = await SpecificUser(Service.userId);
            setVendor(res);
            console.log("Vendor Data:", res);
        } catch (error) {
            console.error("Error fetching Vendor DATA:", error);
        }
    };

    const GetReviews = async () => {
        try {
            const res = await ServiceReviews(id);
            setReviews(res);
            console.log("Reviews Data:", res);
        } catch (error) {
            console.error("Error fetching Reviews DATA:", error);
        }
    };

    useEffect(() => {
        GetService();
        GetReviews();
    }, []);

    useEffect(() => {
        if (Service.userId) {
            GetVendor();
        }
    }, [Service]);
    return (
        <>

            <FixedNav Service={Service} />
            <CardNavbar Service={Service} />
            <Detail Service={Service} Vendor={Vendor} reviews={reviews} />
            <div className="pb-20 md:pb-0">

                <Footer />
            </div>
        </>
    )
}

export default CardDetail;