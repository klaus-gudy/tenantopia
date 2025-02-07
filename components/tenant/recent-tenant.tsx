import type { RecentTenant } from "@/types/tenants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentTenants: RecentTenant[] = [
  { name: "Mr.Remmy Ambokile", period: "Jan 2023 - Sept 2023" },
  { name: "Jesca Malisa", period: "Mar 2021 - Dec 2022" },
  { name: "Emmy Wilson", period: "Jan 2020 - Mar 2021" },
];

export default function RecentTenant() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent tenants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTenants.map((tenant, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm font-medium">{tenant.name}</span>
              <span className="text-sm text-muted-foreground">
                {tenant.period}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
