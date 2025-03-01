import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="text-2xl font-bold text-white">Tenantopia</div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-blue-600" asChild>
            <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-white/90" asChild>
            <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
