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
import { Plus } from "lucide-react";
import { useState } from "react";

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
];

export default function UnitDetails() {
  const [units, setUnits] = useState<Unit[]>(initialUnit);
  const [newUnit, setNewUnit] = useState<Partial<Unit>>({
    number: "",
    bedrooms: 1,
    bathrooms: true,
    monthlyRent: 0,
    status: "Vacant",
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Units</h2>
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
                  <Input id="bedrooms" type="number" value={newUnit.bedrooms} />
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
      </div>
      <div className="grid gap-4">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="border rounded-lg p-4 space-y-2 hover:bg-accent transition-colors"
          >
            <div className="flex items-center justify-between">
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
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Bedrooms:</span>{" "}
                {unit.bedrooms}
              </div>
              <div>
                <span className="text-muted-foreground">Bathrooms:</span>{" "}
                {unit.bathrooms}
              </div>
              <div>
                <span className="text-muted-foreground">Rent:</span>{" "}
                {unit.monthlyRent.toLocaleString()} TZS
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
