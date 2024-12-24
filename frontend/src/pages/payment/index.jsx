
import PayNav from "./components/PayNav";
import ConfirmAndPay from "./components/pay";
import Login from "./components/login";
import Footer from "./components/footer"
import { useParams } from "react-router-dom";
import { SpecificService } from "../../connection/apis";
import { useEffect, useState } from "react";

const Payment = () => {
    const { id } = useParams();
    const [Service, setService] = useState({});


    const GetService = async () => {
        try {
            const res = await SpecificService(id);
            setService(res);
            console.log("Service Data:", res);
        } catch (error) {
            console.error("Error fetching Service DATA:", error);
        }
    };





    useEffect(() => {
        GetService();

    }, []);


    return (
        <>
            <PayNav />
            <ConfirmAndPay Service={Service} />
            <Footer />


        </>
    )
}

export default Payment;