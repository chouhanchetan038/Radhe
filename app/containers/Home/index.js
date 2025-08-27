import React from 'react';
import {
  AboutSection,
  // ContactSection,
  DonateSection,
  GallerySection,
  HeroSection,
  ImpactStats,
  InitiativesSection,
  ProgramSection,
  TestimonialsSection,
} from '../pageListAsync';

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <InitiativesSection />
      <ImpactStats />
      <ProgramSection />
      <GallerySection />
      <TestimonialsSection />
      <DonateSection />
      {/* <ContactSection /> */}
    </>
  );
};

export default Home;
