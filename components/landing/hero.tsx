import Link from "next/link"
import { Button } from "@/components/ui/button"
import Background from "@/public/background2.jpeg"

export function HeroSection() {
  return (
    <section
      className="relative h-screen flex items-center"
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/75" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Smart Property Management Made Simple
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Streamline your property management workflow with our comprehensive solution for tenants, property owners,
            and managers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/dashboard">Access Dashboard</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-muted hover:text-foreground"
            >
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
