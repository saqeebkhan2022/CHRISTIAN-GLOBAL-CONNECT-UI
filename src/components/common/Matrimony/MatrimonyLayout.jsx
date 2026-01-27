import Header from "./Header";
import Footer from "../CommonHome/Footer";

import { Outlet } from "react-router-dom";

const MatrimonyLayout = () => {
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

export default MatrimonyLayout;
