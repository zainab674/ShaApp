import React from "react";
import PayNav from "./components/PayNav";
import ConfirmAndPay from "./components/pay";

import Footer from "./components/footer"
import { useParams } from "react-router-dom";
import { SpecificService } from "../../connection/apis";
import { useEffect, useState } from "react";
import Navbar from "../home/Components/navbar";

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
            <Navbar />
            <ConfirmAndPay Service={Service} />


        </>
    )
}

export default Payment;