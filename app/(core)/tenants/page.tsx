'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tenant } from "@/types/tenants";
import { useQuery } from "@tanstack/react-query";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";

// const tenants: Tenant[] = [
//   {
//     id: 1,
//     name: "Issa Moura",
//     phone: "+255 6234 70540",
//     property: "Arcade square",
//     unit: "A1",
//     duration: "3 months left",
//     image: "https://github.com/shadcn.png",
//   },
//   {
//     id: 2,
//     name: "Juma Juma",
//     phone: "+255 6234 70540",
//     property: "Arcade square",
//     unit: "A2",
//     duration: "3 months left",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 3,
//     name: "Musa Musa",
//     phone: "+255 6234 70540",
//     property: "Arcade square",
//     unit: "A3",
//     duration: "3 months left",
//     image: "/placeholder.svg",
//   },
//   {
//     id: 4,
//     name: "Salim Salim",
//     phone: "+255 6234 70540",
//     property: "Arcade square",
//     unit: "A4",
//     duration: "3 months left",
//     image: "/placeholder.svg",
//   },
// ];

const fetchTenants = async (): Promise<Tenant[]> => {
  const response = await fetch("/api/tenants");
  if (!response.ok) {
    throw new Error("Failed to fetch tenants");
  }
  return response.json();
};

export default function TenantsPage() {
  const {
    data: tenants,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tenants"],
    queryFn: fetchTenants,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading tenants...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Failed to load tenants.</div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Tenants</h1>
        <p className="text-sm text-muted-foreground">See all possible tenants available in your property</p>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search for tenants..." className="pl-10" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href="/tenants/add">
              <Plus className="h-4 w-4 mr-2" />
              Create a tenant
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
          !tenants?.length && (
            <div className="text-center text-muted-foreground">
              No tenants found.
            </div>
          )
        }
        {tenants?.map((tenant) => (
          <div
            key={tenant.id}
            className="flex items-end justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={tenant.image} alt={tenant.name} />
                <AvatarFallback>{tenant.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{tenant.name}</h3>
                <p className="text-sm text-muted-foreground">{tenant.phone}</p>
                <div className="mt-1">
                  <p className="text-sm font-medium">{tenant.property} - {tenant.unit}</p>
                  <p className="text-sm text-green-600">
                    Duration{" "}
                    <span className="text-gray-600">• 3 months left</span>
                  </p>
                </div>
              </div>
            </div>
            <Button variant="secondary" asChild>
              <Link href={`/tenants/${tenant.id}`}>View more</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
