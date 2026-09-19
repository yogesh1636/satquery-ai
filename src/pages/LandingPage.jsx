import React from 'react';
import { LandingNav } from '../components/landing/LandingNav';
import { HeroSection } from '../components/landing/HeroSection';
import { QueryDemo } from '../components/landing/QueryDemo';
import { HowItWorks } from '../components/landing/HowItWorks';
import { MultimodalSection } from '../components/landing/MultimodalSection';
import { AnalysisShowcase } from '../components/landing/AnalysisShowcase';
import { ChangeDetectionShowcase } from '../components/landing/ChangeDetectionShowcase';
import { SpectralSection } from '../components/landing/SpectralSection';
import { RoleShowcase } from '../components/landing/RoleShowcase';
import { ApplicationsSection } from '../components/landing/ApplicationsSection';
import { TechnologySection } from '../components/landing/TechnologySection';
import { WhyOrbitIQ } from '../components/landing/WhyOrbitIQ';
import { ImpactSection } from '../components/landing/ImpactSection';
import { FinalCTA } from '../components/landing/FinalCTA';
import { LandingFooter } from '../components/landing/LandingFooter';

export const LandingPage = () => {
  return (
    <div style={{ background: 'var(--sq-bg-deep)', minHeight: '100vh', color: 'var(--sq-white)', fontFamily: 'var(--sq-font)' }}>
      <LandingNav />
      <main>
        <HeroSection />
        <QueryDemo />
        <HowItWorks />
        <MultimodalSection />
        <AnalysisShowcase />
        <ChangeDetectionShowcase />
        <SpectralSection />
        <RoleShowcase />
        <ApplicationsSection />
        <TechnologySection />
        <WhyOrbitIQ />
        <ImpactSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
