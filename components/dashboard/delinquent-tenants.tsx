import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const delinquentTenants = [
  { name: "Alice Brown", property: "Sunset Apartments", amountDue: 1500, daysOverdue: 15 },
  { name: "Charlie Davis", property: "Riverside Condos", amountDue: 2000, daysOverdue: 10 },
  { name: "Eva Green", property: "Downtown Lofts", amountDue: 1200, daysOverdue: 7 },
]

export function DelinquentTenants() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Delinquent Tenants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {delinquentTenants.map((tenant, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{tenant.name}</p>
                <p className="text-sm text-muted-foreground">{tenant.property}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${tenant.amountDue}</p>
                <p className="text-sm text-muted-foreground">{tenant.daysOverdue} days overdue</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}