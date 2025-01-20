import Navbar from "./Components/navbar";
import Category from "./Components/category";
// import { InspirationSection } from "./Components/inspiration";
import Footer from "../common/footer";
import FixedFooter from "./Components/fixedFooter";
import ChatbotComponent from "../common/chatbot";
import FloatingChatbot from "../common/chatbot";
import Chatbot from "react-chatbot-kit";
import config from "../common/chatbotConfig";
import MessageParser from "../common/chatParser";

const HomePage = () => {
    return (<>

        <Navbar />
        <Category />
        <FloatingChatbot />
        {/* <InspirationSection /> */}
        <div className="pb-20 md:pb-0">

            <Footer />
        </div>
        <div className="block md:hidden">
            <FixedFooter />
        </div>

    </>)
}

export default HomePage;