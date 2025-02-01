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
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Tenantopia</h1>
          <nav className="space-x-4">
            <Link href={"/login"}>
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href={"/register"}>
              <Button>Register</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-6 pt-6 pb-12 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <h2 className="text-5xl font-bold tracking-tight">
              Property Management Made Simple
            </h2>
            <p className="text-xl text-muted-foreground">
              Streamline your property management with our intuitive platform.
              Manage properties, tenants, and documents all in one place.
            </p>
            <div className="flex justify-center gap-4 pt-6">
              <Link href={""}>
                <Button size="lg">Start Free Trial</Button>
              </Link>
              <Link href={""}>
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-lg bg-background border animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-6 py-2 text-center text-muted-foreground">
          <p>© 2025 Tenantopia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
