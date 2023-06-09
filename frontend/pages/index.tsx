import Body from "@/component/body";
import Footer from "@/component/footer";
import Navbar from "@/component/navbar";
import axios from "axios";
import { useEffect } from "react";


const Home = () => {
  return (
    <div>
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
};

export default Home;