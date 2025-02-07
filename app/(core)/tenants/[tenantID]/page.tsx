import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TenantTimeline } from "@/components/tenant/tenant-timeline";

export default function TenantDetailsPage({
  params,
}: {
  params: { tenantID: string };
}) {
    return (
      <div className="animate-fadeIn space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/tenants">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Tenants details for {params.tenantID}
            </h1>
            <p className="text-sm text-muted-foreground">
              View more details about this tenant
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" alt="Issa Moura" />
                <AvatarFallback>IM</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium leading-none tracking-tight">Issa Moura</h3>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Active
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Joined since : 12 March 2022
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold leading-none tracking-tight mb-2">
                    Basic information
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Gender :{" "}
                      </span>
                      <span className="text-sm">Male</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Phone number :{" "}
                      </span>
                      <span className="text-sm">+255 6234 70540</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Other number :{" "}
                      </span>
                      <span className="text-sm">+255 6774 78466</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Email :{" "}
                      </span>
                      <span className="text-sm">issamoura@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold leading-none tracking-tight mb-2">
                    Property information
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Property name :{" "}
                      </span>
                      <span className="text-sm">Arcade square</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Address :{" "}
                      </span>
                      <span className="text-sm">365 Mkwajuni ST</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Lease term :{" "}
                      </span>
                      <span className="text-sm">6 Months</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Next payment :{" "}
                      </span>
                      <span className="text-sm">22/12/2025</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" asChild>
                    <Link href={`/tenants/${params.tenantID}/edit`}>
                      Edit details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <TenantTimeline />
        </div>
      </div>
    );
}
