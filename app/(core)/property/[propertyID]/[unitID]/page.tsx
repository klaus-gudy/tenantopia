import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Calendar } from "lucide-react";
import { PropertyTimeline } from "@/components/property/property-timeline";
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

export default function UnitDetailsPage() {
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
                  <p className="text-sm font-medium">Occupied</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Size</label>
                  <p className="text-sm font-medium">800 sq ft</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Layout
                  </label>
                  <p className="text-sm font-medium">1 Bedroom / 1 Bathroom</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Monthly rent
                  </label>
                  <p className="text-sm font-medium">1,500 TZS</p>
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
              <div className="grid gap-6">
                {tenants.map((tenant) => (
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
                          {tenant.moveInDate} to{" "}
                          {tenant.moveOutDate ? (
                            tenant.moveOutDate
                          ) : (
                            <span className="text-green-500">
                              {tenant.leaseEnd}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
