import Footer from "@/component/footer";
import Navbar from "@/component/navbar";
import StaffDashboard from "@/component/staff";



const Dashboard = () => {
    return (
        <div>
            <Navbar  title="Dashboard"/>
            <StaffDashboard />
            <Footer />
        </div>
    )
}
export default Dashboard;