import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewsletterSubscribe from "../components/NewsletterSubscribe/NewsletterSubscribe";

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <NewsletterSubscribe />
      <Footer />
    </>
  );
}

export default PublicLayout;
