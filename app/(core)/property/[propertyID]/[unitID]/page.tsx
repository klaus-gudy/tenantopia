import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Banknote, Edit, Plus, Search } from "lucide-react";
import Link from "next/link";

export default function UnitDetailsPage() {
  return (
    <div className="animate-fadeIn space-y-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Unit details</h1>
        <p className="text-sm text-muted-foreground">
          Manage your property unit
        </p>
      </div>

      <div className="flex items-center justify-end gap-4 flex-wrap">
        <Button asChild>
          <Link href="">
            <Edit className="h-4 w-4 mr-2" />
            Edit details
          </Link>
        </Button>
      </div>

      <div className="">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Unit Information</CardTitle>
                </CardHeader>
                {/* <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-medium">Status</span>
                    </div>
                    <Badge variant={unit.status === "Occupied" ? "default" : "secondary"}>{unit.status}</Badge>
                  </div>
                  <div className="flex items-start">
                    <SquareFeet className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Size</p>
                      <p className="text-muted-foreground">{unit.size}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Home className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Layout</p>
                      <p className="text-muted-foreground">
                        {unit.bedrooms} Bedroom / {unit.bathrooms} Bathroom
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Banknote className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Monthly Rent</p>
                      <p className="text-muted-foreground">{unit.rent}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Description</p>
                      <p className="text-muted-foreground">{unit.description}</p>
                    </div>
                  </div>
                </CardContent> */}
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2"></ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tenants" className="mt-6">
            <div className="grid grid-cols-1 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Previous Tenants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6"></div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="mt-6 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance History</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
