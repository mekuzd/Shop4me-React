import React from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
}
export default DefaultLayout;
