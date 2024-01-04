import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Layout = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="container"> 
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
