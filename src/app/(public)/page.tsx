import AnnouncementBar from "@/components/landing/AnnouncementBar/AnnouncementBar";
import ApplicationJourney from "@/components/landing/ApplicationJourney/ApplicationJourney";
import CTABanner from "@/components/landing/CTABanner/CTABanner";
import Hero from "@/components/landing/Hero/Hero";
import WhyThisPortal from "@/components/landing/WhyThisPortal/FeatureCard";
import StatsBar from "../../components/landing/Stats/Stats";

export default function LandingPage() {
  return (
    <>
      <AnnouncementBar />
      <Hero />
      <StatsBar />
      <WhyThisPortal />
      <ApplicationJourney />
      <CTABanner />
    </>
  );
}
