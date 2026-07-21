import EligibilitySection from "./EligibilitySection";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
// import InstructionsSection from "./InstructionsSection";
// import ProcessSection from "./ProcessSection";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EligibilitySection />
        {/* <ProcessSection /> */}
        {/* <InstructionsSection /> */}
        {/* <FAQSection /> */}
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
