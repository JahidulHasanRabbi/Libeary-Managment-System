import UserDashboard from "@/component/User";
import Footer from "@/component/footer";
import Navbar from "@/component/navbar";


const StudentDashboard = () => {
    return (

        <div>
            <Navbar  title="Dashboard"/>
            <UserDashboard />
            <Footer />
        </div>
    )
    }
export default StudentDashboard;