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
                  <h3 className="text-lg font-medium">Issa Moura</h3>
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

          <Card className="p-6">
            <CardHeader>
              <CardTitle>Lease and payment history</CardTitle>
              <CardDescription>Showing history of lease and payments for the past 6 months </CardDescription>
            </CardHeader>
            <div className="space-y-4">
              <div className="relative pl-6 border-l">
                <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[5px] rounded-full bg-primary"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">22 Dec 2024</p>
                    <p className="font-medium">Contract renewal</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Lease_agreement_2024.pdf
                      </span>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative pl-6 border-l">
                <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[5px] rounded-full bg-primary"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">23 Dec 2023</p>
                    <p className="font-medium">Payment deposit</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Bank_statement_dec_2023.pdf
                      </span>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative pl-6">
                <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[5px] rounded-full bg-primary"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">22 Dec 2023</p>
                    <p className="font-medium">Initial contract signing</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Lease_agreement_2023.pdf
                      </span>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
}
