import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const expiringLeases = [
  { tenant: "John Doe", property: "Sunset Apartments", expiryDate: "2023-07-15" },
  { tenant: "Jane Smith", property: "Riverside Condos", expiryDate: "2023-07-22" },
  { tenant: "Bob Johnson", property: "Downtown Lofts", expiryDate: "2023-07-30" },
]

export function ExpiringLeases() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leases Expiring This Month</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expiringLeases.map((lease, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{lease.tenant}</p>
                <p className="text-sm text-muted-foreground">{lease.property}</p>
              </div>
              <p className="text-sm">{lease.expiryDate}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}