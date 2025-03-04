import { Home, Building2, UserCog, LucideIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function UserCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="border-none shadow-lg bg-card text-card-foreground">
      <CardHeader>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function ClientSection() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Tailored Solutions for Every Role
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <UserCard
            title="For Tenants"
            description="Easy rent payments, maintenance requests, and communication with property managers all in one place."
            icon={Home}
          />
          <UserCard
            title="For Property Owners"
            description="Track your investments, monitor income, and stay updated with property performance metrics."
            icon={Building2}
          />
          <UserCard
            title="For Property Managers"
            description="Efficiently manage multiple properties, automate tasks, and streamline communication with owners and tenants."
            icon={UserCog}
          />
        </div>
      </div>
    </section>
  );
}
