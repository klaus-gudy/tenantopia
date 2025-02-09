import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="text-2xl font-bold text-white">Tenantopia</div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-blue-600">
              Login
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-white/90">Register</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
