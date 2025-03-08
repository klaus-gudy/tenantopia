'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import UnitDetails from "@/components/property/unit-details";

const fetchPropertyDetails = async (propertyID: string): Promise<PropertyDetails> => {
  const response = await fetch(`/api/properties/${propertyID}`);
  if (!response.ok) {
    throw new Error("Failed to fetch property details");
  }
  return response.json();
};

export default function PropertyDetailsPage({
  params,
  searchParams,
}: {
  params: { propertyID: string };
  searchParams: { name: string };
}) {
  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["property", params.propertyID],
    queryFn: () => fetchPropertyDetails(params.propertyID),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading property details...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  const propertyDetails = [
    { label: "Address", value: property?.address },
    { label: "Property type", value: property?.type },
    { label: "City", value: property?.city },
    { label: "District", value: property?.district },
    { label: "Street", value: property?.street },
  ];

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
                {propertyDetails.map((detail, index) => (
                  <div key={index}>
                    <label className="text-sm text-muted-foreground">
                      {detail.label}
                    </label>
                    <p className="text-sm font-medium">{detail.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <label className="text-sm text-muted-foreground">
                  Description
                </label>
                <p className="text-sm font-medium">
                {property?.description}
                </p>
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
          <UnitDetails propertyID={params.propertyID} units={property?.units || []} />
        </div>
      </div>
    </div>
  );
}
