import Hero from "@/components/landing/Hero/Hero";
// import StatsBar from "../../components/landing/Stats/Stats";
import WhyThisPortal from "../../components/landing/WhyThisPortal/FeatureCard";
import ApplicationJourney from "@/components/landing/ApplicationJourney/ApplicationJourney";
import CTABanner from "@/components/landing/CTABanner/CTABanner";

export default function LandingPage() {
  return (
    <>
      <Hero />
      {/* <StatsBar /> */}
      <WhyThisPortal />
      <ApplicationJourney />
      <CTABanner />
    </>
  );
}