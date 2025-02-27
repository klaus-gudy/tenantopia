import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UnitDetails from "@/components/property/unit-details";

export default function PropertyDetailsPage({
  searchParams,
}: {
  searchParams: {name: string};
}) {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/property">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
          {searchParams.name} details
          </h1>
          <p className="text-sm text-muted-foreground">
            View more details about this property
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <label className="text-sm text-muted-foreground">
                    Address
                  </label>
                  <p className="text-sm font-medium">365 Mkiwajuni ST</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Property type
                  </label>
                  <p className="text-sm font-medium">Residential</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Year built
                  </label>
                  <p className="text-sm font-medium">2010</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Total square footage
                  </label>
                  <p className="text-sm font-medium">1,500 sq ft</p>
                </div>
              </div>
              <div className="mt-2">
                  <label className="text-sm text-muted-foreground">
                    Address
                  </label>
                  <p className="text-sm font-medium">A beautiful apartment complex with modern amenities, located in the heart of Los Angeles with easy access to public transportation, shopping centers, and entertainment venues.</p>
                </div>
              <div className="flex gap-4 mt-4 justify-end">
                <Button>Edit details</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">Map view coming soon</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <UnitDetails />
        </div>
      </div>
    </div>
  );
}
