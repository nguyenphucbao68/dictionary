import ContactUsPage from "../components/dashboard/page/contact";
import App from "../components/app";
import React from "react";
React.useLayoutEffect = React.useEffect;

const ContactUs = () => {
  return (
    <>
      <App>
        <ContactUsPage />
      </App>
    </>
  );
};
export default ContactUs;
