"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Building, Filter, MapPin, Plus, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RentHouse from "@/public/rent_house.png";

const fetchProperties = async (): Promise<Property[]> => {
  const response = await fetch("/api/properties");
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return response.json();
};

export default function PropertyPage() {
  const {
    data: properties,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading properties...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Failed to load properties.</div>
    );
  }

  return (
    <div className="animate-fadeIn space-y-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Property listing
        </h1>
        <p className="text-sm text-muted-foreground">Manage your properties</p>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search for property..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href="/property/add">
              <Plus className="h-4 w-4 mr-2" />
              Add a property
            </Link>
          </Button>
        </div>
      </div>

      {properties?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src={RentHouse}
                  alt={property.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      property.type === "Apartment"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {property.type}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between gap-4 items-center">
                  <div>
                    <p className="text-sm font-medium">{property.name}</p>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <p className="text-sm truncate">{property.address}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm">{property.units} Units</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Building className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {property.availableUnits} Available
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href={`/property/${property.id}?name=${property.name}`}>
                    View listing
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          No properties found. Add a new property to get started.
        </div>
      )}
    </div>
  );
}
