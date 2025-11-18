import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyProConnect } from "@/components/WhyProConnect";
import { Pillars } from "@/components/Pillars";
import { Equipment } from "@/components/Equipment";
import { CEO } from "@/components/CEO";
import { OurStructure } from "@/components/OurStructure";
import { Cases } from "@/components/Cases";
import { PrimeHub } from "@/components/PrimeHub";
import { Guarantee } from "@/components/Guarantee";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenForm={() => setIsFormOpen(true)} />
      <Hero onOpenForm={() => setIsFormOpen(true)} />
      <WhyProConnect />
      <Pillars />
      <Equipment />
      <CEO />
      <OurStructure />
      <Cases />
      <PrimeHub onOpenForm={() => setIsFormOpen(true)} />
      <Guarantee />
      <Contact onOpenForm={() => setIsFormOpen(true)} />
      <Footer />
      <LeadFormModal open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
};

export default Index;
