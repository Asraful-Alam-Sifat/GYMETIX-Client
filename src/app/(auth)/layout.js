import NavBar from "@/components/Navbar/NavBar";

const layout = ({ children }) => {
  return <div>
    <NavBar/>
    {children}
    </div>;
};

export default layout;
