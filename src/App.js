import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Workflow from "./components/Workflow";
// import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Pricing from "./components/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import "./index.css";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout>
              <main>
                <Hero />
                <Features />
                <Workflow />
                {/* <Testimonials /> */}
                <Pricing />
                <CTA />
              </main>
            </Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
            <Route path="/cookies" element={<Layout><CookiePolicy /></Layout>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
