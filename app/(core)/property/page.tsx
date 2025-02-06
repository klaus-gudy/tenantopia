import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RentHouse from "@/public/rent_house.png";

const properties: Property[] = [
  {
    id: 1,
    name: "Arcade square",
    address: "365 Mkiwajuni ST",
    manager: "Issa Moura",
    status: "Occupied",
    vacantDate: "01/02/24",
    image: "/lovable-uploads/e10c9a73-e63f-40ce-a65f-6ec377450ab9.png",
  },
  {
    id: 2,
    name: "Mwenge",
    address: "Mwenge Shopping Center",
    manager: "Juma Juma",
    status: "Vacant",
    vacantDate: "01/01/24",
    image: "/lovable-uploads/a5c9b9d9-2a1b-4d2b-9f3b-8c38a7a9f8f1.png",
  },
  {
    id: 3,
    name: "Mlimani City",
    address: "Mlimani City, Dar es Salaam",
    manager: "Salim Salim",
    status: "Occupied",
    vacantDate: "01/04/24",
    image: "/lovable-uploads/a5c9b9d9-2a1b-4d2b-9f3b-8c38a7a9f8f1.png",
  },
];

export default function PropertyPage() {
  return (
    <div className="animate-fadeIn space-y-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold tracking-tight">Property listing</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={RentHouse}
                alt={property.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 left-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    property.status === "Occupied"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {property.status}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between gap-4 items-center">
                <div>
                  <p className="text-sm font-medium">{property.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {property.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">{property.manager}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Vacant on - {property.vacantDate}</span>
                  </div>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href={`/property/${property.id}`}>View listing</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
