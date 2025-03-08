"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Calendar } from "lucide-react";
// import { PropertyTimeline } from "@/components/property/property-timeline";
import { UnitTimeline } from "@/components/property/unit-timeline";

const tenants = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    moveInDate: "2022-06-15",
    leaseEnd: "2023-12-31",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    moveInDate: "2020-03-01",
    moveOutDate: "2022-05-31",
    avatar: "https://github.com/shadcn.png",
  },
];

const fetchUnitDetails = async (
  propertyID: string,
  unitID: string
): Promise<UnitDetails> => {
  const response = await fetch(`/api/properties/${propertyID}/${unitID}`);
  if (!response.ok) {
    throw new Error("Failed to fetch unit details");
  }
  return response.json();
};

export default function UnitDetailsPage({
  params,
}: {
  params: { propertyID: string; unitID: string };
}) {

  const {
    data: unit,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["unit", params.propertyID, params.unitID],
    queryFn: () => fetchUnitDetails(params.propertyID, params.unitID),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading unit details...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="animate-fadeIn space-y-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Unit details</h1>
        <p className="text-sm text-muted-foreground">
          Manage your property unit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unit information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <label className="text-sm text-muted-foreground">
                    status
                  </label>
                  <p className="text-sm font-medium">{unit?.isOccupied ? "Occupied" : "Vacant"}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Size</label>
                  <p className="text-sm font-medium">{unit?.size} sq ft</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Layout
                  </label>
                  <p className="text-sm font-medium">{unit?.rooms} rooms</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Monthly rent
                  </label>
                  <p className="text-sm font-medium">{unit?.price.toLocaleString()} TZS</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4 justify-end">
                <Button>Edit details</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tenants history</CardTitle>
            </CardHeader>
            <CardContent>
                {unit?.tenants?.length ? (
                <div className="grid gap-6">
                  {unit.tenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={tenant.avatar} alt={tenant.name} />
                      <AvatarFallback>{tenant.name[0]}</AvatarFallback>
                    </Avatar>
                    </div>
                    <div className="grid gap-1">
                    <h3 className="font-medium">{tenant.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Mail className="h-3 w-3 mr-1" />
                      <span>{tenant.email}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{tenant.phone}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                      {new Date(tenant.moveInDate).toLocaleDateString()} to{" "}
                      {tenant.moveOutDate ? (
                        new Date(tenant.moveOutDate).toLocaleDateString()
                      ) : (
                        <span className="text-green-500">Present</span>
                      )}
                      </span>
                    </div>
                    </div>
                  </div>
                  ))}
                </div>
                ) : (
                <p className="text-muted-foreground text-sm">No tenants history available.</p>
                )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <UnitTimeline />
        </div>
      </div>
    </div>
  );
}
