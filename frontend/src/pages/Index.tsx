import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClassificationSection from "@/components/ClassificationSection";
import PreventionSection from "@/components/PreventionSection";
import JournalSection from "@/components/JournalSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClassificationSection />
      <PreventionSection />
      <JournalSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
