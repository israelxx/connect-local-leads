import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import { CEO } from "@/components/CEO";
import { OurStructure } from "@/components/OurStructure";
import { Results } from "@/components/Results";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onOpenForm={() => setIsFormOpen(true)} />
      <Hero onOpenForm={() => setIsFormOpen(true)} />
      <Services />
      <WhyChoose />
      <CEO />
      <OurStructure />
      <Results />
      <Contact onOpenForm={() => setIsFormOpen(true)} />
      <Footer />
      <LeadFormModal open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
};

export default Index;
