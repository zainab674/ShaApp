
import Detail from "./components/details";
import Footer from "./../common/footer"
import React from 'react'

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ServiceReviews, SpecificService, SpecificUser } from "../../connection/apis";
import Navbar from "../home/Components/navbar";
const CardDetail = () => {
    const { id } = useParams();
    const [Service, setService] = useState({});
    const [Vendor, setVendor] = useState({});
    const [reviews, setReviews] = useState([]);

    const GetService = async () => {
        try {
            const res = await SpecificService(id);
            setService(res);

        } catch (error) {
            console.error("Error fetching Service DATA:", error);
        }
    };

    const GetVendor = async () => {
        try {
            const res = await SpecificUser(Service.userId);
            setVendor(res);

        } catch (error) {
            console.error("Error fetching Vendor DATA:", error);
        }
    };

    const GetReviews = async () => {
        try {
            const res = await ServiceReviews(id);
            setReviews(res);

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


            <Navbar />
            <Detail Service={Service} Vendor={Vendor} reviews={reviews} />
            <div className="pb-20 md:pb-0">

                <Footer />
            </div>
        </>
    )
}

export default CardDetail;