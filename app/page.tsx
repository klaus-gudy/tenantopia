import { ClientSection } from "@/components/landing/clients";
import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ClientSection/>
    </div>
  );
}
