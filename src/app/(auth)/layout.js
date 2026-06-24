// import NavBar from "@/Components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";

const layout = ({ children }) => {
  return (
    <div>
      {children}
      <ToastContainer position="bottom-center" autoClose={1000} />
    </div>
  );
};

export default layout;
