import Footer from "@/components/Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
