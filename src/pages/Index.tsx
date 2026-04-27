import { useState, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadFormModal } from "@/components/LeadFormModal";

// Lazy load components below the fold for faster initial load
const WhyProConnect = lazy(() => import("@/components/WhyProConnect").then(m => ({ default: m.WhyProConnect })));
const CEO = lazy(() => import("@/components/CEO").then(m => ({ default: m.CEO })));
const Pillars = lazy(() => import("@/components/Pillars").then(m => ({ default: m.Pillars })));
const Equipment = lazy(() => import("@/components/Equipment").then(m => ({ default: m.Equipment })));
const Cases = lazy(() => import("@/components/Cases").then(m => ({ default: m.Cases })));
const PrimeHub = lazy(() => import("@/components/PrimeHub").then(m => ({ default: m.PrimeHub })));
const Guarantee = lazy(() => import("@/components/Guarantee").then(m => ({ default: m.Guarantee })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [serviceType, setServiceType] = useState<'standard' | 'prime_hub'>('standard');

  const handleOpenForm = (type: 'standard' | 'prime_hub' = 'standard') => {
    setServiceType(type);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenForm={() => handleOpenForm('standard')} />
      <Hero onOpenForm={() => handleOpenForm('standard')} />
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <WhyProConnect />
        <CEO />
        <Pillars />
        <Equipment />
        <Cases />
        <PrimeHub onOpenForm={() => handleOpenForm('prime_hub')} />
        <Guarantee />
        <Contact onOpenForm={() => handleOpenForm('standard')} />
        <Footer />
      </Suspense>
      <LeadFormModal open={isFormOpen} onOpenChange={setIsFormOpen} serviceType={serviceType} />
    </div>
  );
};

export default Index;
