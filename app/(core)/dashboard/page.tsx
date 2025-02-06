import { StatCard } from "@/components/dashboard/stat-card";
import { Building2, Users, Wallet, Wrench } from "lucide-react";
import { ExpiringLeases } from "@/components/dashboard/expiring-leases";
import { DelinquentTenants } from "@/components/dashboard/delinquent-tenants";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { OccupancyChart } from "@/components/dashboard/occupancy-rate";

export default function Page() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your property management metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Properties"
          value="125"
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          description="+3 from last month"
        />
        <StatCard
          title="Total Tenants"
          value="1,420"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="+8% from last month"
        />
        <StatCard
          title="Revenue (MTD)"
          value="$56,789"
          icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
          description="+12% from last month"
        />
        <StatCard
          title="Maintenance Requests"
          value="23"
          icon={<Wrench className="h-4 w-4 text-muted-foreground" />}
          description="5 urgent, 18 routine"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-6">
        <OccupancyChart />
        <DelinquentTenants />
        <ExpiringLeases />
        <RecentActivity />
      </div>
    </div>
  );
}