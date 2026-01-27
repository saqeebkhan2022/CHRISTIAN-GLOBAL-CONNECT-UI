import Header from "./Header";
import Footer from "../CommonHome/Footer";

// import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const EducationLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-160px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default EducationLayout;
