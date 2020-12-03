import React from "react";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import { ToastContainer } from "react-toastify";
const App = ({ children }) => {
  return (
    <>
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <Header />
        <div className="page-body-wrapper sidebar-icon">
          <Sidebar />
          <div className="page-body">{children}</div>
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
