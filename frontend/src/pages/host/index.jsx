
import HostDe from "./components/hostDetail";
import React from 'react'

import Footer from "../common/footer";
import Navbar from "../home/Components/navbar";

const HostDetail = () => {
    return (
        <>
            <Navbar />
            <HostDe />
            <div className="hidden md:block">
                <Footer />
            </div>

        </>
    )
}

export default HostDetail;