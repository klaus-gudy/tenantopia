import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RentHouse from "@/public/rent_house.png";
import { RecentTenant } from "@/types/tenants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropertyTimeline } from "@/components/property/property-timeline";

const recentTenants: RecentTenant[] = [
  { name: "Mr.Remmy Ambokile", period: "Jan 2023 - Sept 2023" },
  { name: "Jesca Malisa", period: "Mar 2021 - Dec 2022" },
  { name: "Emmy Wilson", period: "Jan 2020 - Mar 2021" },
];

export default function PropertyDetailsPage({
  params,
}: {
  params: { propertyID: string };
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
            Property details for {params.propertyID}
          </h1>
          <p className="text-sm text-muted-foreground">
            View more details about this property
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={RentHouse}
              alt="Property name"
              className="object-cover w-full h-full"
            />
          </div>

          <Card>
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">Map view coming soon</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTenants.map((tenant, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-medium">{tenant.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {tenant.period}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property details</CardTitle>
              <CardDescription>January 2020 - December 2024</CardDescription>
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
                    Bedrooms
                  </label>
                  <p className="text-sm font-medium">2 Bedroom</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Bathroom
                  </label>
                  <p className="text-sm font-medium">1 Bathroom</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Living area
                  </label>
                  <p className="text-sm font-medium">Yes</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Kitchen
                  </label>
                  <p className="text-sm font-medium">Yes</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Secure parking
                  </label>
                  <p className="text-sm font-medium">Yes</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Monthly rent
                  </label>
                  <p className="text-sm font-medium">500,000 TZS</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Min Lease terms
                  </label>
                  <p className="text-sm font-medium">6 Months</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <Button variant="outline">Edit details</Button>
              </div>
            </CardContent>
          </Card>

          <PropertyTimeline />
        </div>
      </div>
    </div>
  );
}
