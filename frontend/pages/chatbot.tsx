import Chatbot from "@/component/chatbot";
import Footer from "@/component/footer";
import Navbar from "@/component/navbar";

const ChatWithBot = () => {
    return (
        <div>
        <Navbar  title="ChatBot"/>
        <Chatbot />
        <Footer />
        </div>
    );
    }

export default ChatWithBot;