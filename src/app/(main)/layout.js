import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Navbar/NavBar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <NavBar/>
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
