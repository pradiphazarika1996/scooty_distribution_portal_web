import Navbar from "../../components/landing/Navbar/Navbar";
import Hero from "../../components/landing/Hero/Hero";
// import StatsBar from "@/components/landing/StatsBar/StatsBar";
// import WhyThisPortal from "@/components/landing/WhyThisPortal/WhyThisPortal";
// import ApplicationJourney from "@/components/landing/ApplicationJourney/ApplicationJourney";
// import CTABanner from "@/components/landing/CTABanner/CTABanner";
// import Footer from "@/components/landing/Footer/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* <StatsBar />
        <WhyThisPortal />
        <ApplicationJourney />
        <CTABanner /> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}