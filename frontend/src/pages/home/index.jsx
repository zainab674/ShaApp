import Navbar from "./Components/navbar";
import Category from "./Components/category";
// import { InspirationSection } from "./Components/inspiration";
import Footer from "../common/footer";
import FixedFooter from "./Components/fixedFooter";
import React from 'react'

import FloatingChatbot from "../common/chatbot";

import AiRecomendation from "../common/reccomendation";
import { useAuth } from "../../authContext";

const HomePage = () => {
    const { token } = useAuth();
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar />

                <main className="flex-grow">
                    <Category />
                    {token && (
                        <>
                            <FloatingChatbot />
                            <AiRecomendation />
                        </>
                    )}
                </main>

                <Footer />
            </div>
        </>

    )
}

export default HomePage;