import ContactSection from "./ContactSection";
import EligibilitySection from "./EligibilitySection";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Notice from "./Notice";
import ProvisionalListSection from "./ProvisionalListSection";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Notice />
        <ProvisionalListSection />
        {/* <ImportantDatesSection /> */}
        <EligibilitySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
