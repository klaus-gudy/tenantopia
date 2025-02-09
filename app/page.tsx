import { ClientSection } from "@/components/landing/clients";
import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    title: "Property Owner",
    description:
      "Easily manage your properties with detailed tracking and reporting.",
  },
  {
    title: "Tenant Portal",
    description:
      "Provides tenants with a dedicated portal for payments and maintenance requests.",
  },
  {
    title: "Property Manager",
    description:
      "Simplify your property management with our intuitive platform.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ClientSection/>
    </div>
  );
}
