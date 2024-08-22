import Navbar from "../dashboard/navbar/navbar";
import Sidebar from "../dashboard/sidebar/sidebar";
import Footer from "../dashboard/footer/footer";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <ToastContainer />
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <div className="flex-grow p-4">
          {children}
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
