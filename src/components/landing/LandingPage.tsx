import ContactSection from "./ContactSection";
import EligibilitySection from "./EligibilitySection";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import ImportantDatesSection from "./ImportantDate";
import Notice from "./Notice";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Notice />
        <ImportantDatesSection />
        <EligibilitySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
