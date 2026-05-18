import Hero from "@/components/landing/Hero/Hero";
// import StatsBar from "../../components/landing/Stats/Stats";
import ApplicationJourney from "@/components/landing/ApplicationJourney/ApplicationJourney";
import CTABanner from "@/components/landing/CTABanner/CTABanner";
import WhyThisPortal from "@/components/landing/WhyThisPortal/FeatureCard";

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
