import Navbar from "./Components/navbar";
import Category from "./Components/category";
// import { InspirationSection } from "./Components/inspiration";
import Footer from "../common/footer";
import FixedFooter from "./Components/fixedFooter";

import FloatingChatbot from "../common/chatbot";

import AiRecomendation from "../common/reccomendation";

const HomePage = () => {
    return (<>

        <Navbar />
        <Category />
        <FloatingChatbot />
        <AiRecomendation />
        <div className="pb-20 md:pb-0">

            <Footer />
        </div>
        {/* <div className="block md:hidden">
            <FixedFooter />
        </div> */}

    </>)
}

export default HomePage;