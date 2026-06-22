// import NavBar from "@/Components/NavBar/NavBar";
// import { ToastContainer } from "react-toastify";

import Footer from "@/components/Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      {/* <NavBar /> */}
      {children}
       <Footer />
      {/* <ToastContainer position="bottom-center" autoClose={1000} /> */}
    </div>
  );
};

export default MainLayout;
