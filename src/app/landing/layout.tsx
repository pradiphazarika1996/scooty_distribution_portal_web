import Navbar from "@/components/landing/Navbar/Navbar";
import Footer from "@/components/landing/Footer/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}