import ContactSection from "./ContactSection";
import EligibilitySection from "./EligibilitySection";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EligibilitySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
