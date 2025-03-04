'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react";

export function SampleHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
    <header className={`fixed top-0 w-full z-50 backdrop-filter backdrop-blur-lg ${isScrolled ? 'bg-transparent' : 'bg-background/85'}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="text-2xl font-bold text-primary">Tenantopia</div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-primary hover:text-primary" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
