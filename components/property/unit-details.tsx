"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const initialUnit: Unit[] = [
  {
    id: "1",
    number: "101",
    bedrooms: 2,
    livingArea: true,
    bathrooms: true,
    kitchen: true,
    livingRoom: true,
    minLeaseTerm: 12,
    monthlyRent: 1500,
    status: "Vacant",
  },
  {
    id: "2",
    number: "102",
    bedrooms: 1,
    livingArea: true,
    bathrooms: true,
    kitchen: true,
    livingRoom: true,
    minLeaseTerm: 6,
    monthlyRent: 1000,
    status: "Occupied",
    tenant: "John Doe",
  },
];

export default function UnitDetails({ propertyID }: { propertyID: string }) {
  const [units] = useState<Unit[]>(initialUnit);
  const [newUnit, setNewUnit] = useState<Partial<Unit>>({
    number: "",
    bedrooms: 1,
    bathrooms: true,
    monthlyRent: 0,
    status: "Vacant",
  });
  return (
    <Card>
      <div className="space-y-4">
        <CardHeader className="flex flex-row items-center justify-between pt-4">
          <CardTitle>Units</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="default">
                <Plus className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Unit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unitNumber">Unit Number*</Label>
                    <Input id="unitNumber" value={newUnit.number} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={newUnit.bedrooms}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="checkbox"
                      checked={newUnit.bathrooms}
                      onChange={(e) =>
                        setNewUnit({ ...newUnit, bathrooms: e.target.checked })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rent">Monthly Rent (TZS)</Label>
                  <Input id="rent" type="number" value={newUnit.monthlyRent} />
                </div>
                <Button className="w-full">Add Unit</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mt-0">
            {units.map((unit) => (
              <Link
                href={`/property/${propertyID}/${unit.id}`}
                key={unit.id}
                className="border rounded-lg p-4 space-y-2 hover:bg-accent transition-colors"
              >
                <div className="relative flex items-center justify-between">
                  <h3 className="font-semibold">Unit {unit.number}</h3>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      unit.status === "Vacant"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {unit.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm pt-1">
                  <div className="col-span-4">
                    {(() => {
                      const features = [];
                      if (unit.bathrooms) features.push("Bathroom");
                      if (unit.kitchen) features.push("Kitchen");
                      if (unit.livingArea) features.push("Living Area");
                      if (unit.livingRoom) features.push("Living Room");
                      return features.join(" / ");
                    })()}
                    <div className="pt-2">
                      <span className="text-muted-foreground">Rent:</span>{" "}
                      {unit.monthlyRent.toLocaleString()} TZS
                    </div>
                  </div>
                  <div className="col-start-5">
                    {unit.tenant && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{unit.tenant}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
