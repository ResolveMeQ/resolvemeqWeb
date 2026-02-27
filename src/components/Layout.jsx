import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <>
    <Header />
    <div className="min-w-0 overflow-x-hidden">
      {children}
    </div>
    <Footer />
  </>
);

export default Layout;
