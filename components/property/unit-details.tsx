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
import { Badge } from "@/components/ui/badge";

export default function UnitDetails({
  propertyID,
  units,
}: {
  propertyID: string;
  units: Unit[];
}) {
  // const [units] = useState<Unit[]>(initialUnit);
  const [newUnit, setNewUnit] = useState<Partial<Unit>>({
    name: "",
    rooms: 1,
    bathrooms: true,
    monthlyRent: 0,
    isOccupied: false,
  });
  return (
    <Card>
      <div className="space-y-4">
        <CardHeader className="flex flex-row items-center justify-between pt-4">
          <CardTitle>Unit information</CardTitle>
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
                    <Input id="unitNumber" value={newUnit.name} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" type="number" value={newUnit.rooms} />
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
            {units.length > 0 ? (
            <div className="grid gap-4 mt-0">
              {units.map((unit) => (
              <Link
                href={`/property/${propertyID}/${unit.id}`}
                key={unit.id}
                className="border rounded-lg p-4 space-y-2 hover:bg-accent transition-colors"
              >
                <div className="relative flex items-center justify-between">
                <h3 className="font-semibold">{unit.name}</h3>
                <Badge variant={unit.isOccupied ? "secondary" : "default"}>
                  {unit.isOccupied ? "Occupied" : "Vacant"}
                </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm pt-1">
                <div className="col-span-4">
                  {(() => {
                  const features = [];
                  if (unit.bathrooms) features.push("Bathroom");
                  if (unit.kitchen) features.push("Kitchen");
                  if (unit.livingRoom) features.push("Living Room");
                  if (unit.balcony) features.push("Balcony");
                  if (unit.rooms > 1) features.push(`${unit.rooms} Rooms`);
                  return features.join(" / ");
                  })()}
                  <div className="pt-2">
                  <span className="text-muted-foreground">Rent:</span>{" "}
                  {unit.monthlyRent
                    ? unit.monthlyRent.toLocaleString()
                    : "0"}{" "}
                  TZS
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
            ) : (
            <p>No units available.</p>
            )}
        </CardContent>
      </div>
    </Card>
  );
}
