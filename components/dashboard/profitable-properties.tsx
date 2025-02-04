import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const profitableProperties = [
  { name: "Sunset Apartments", noi: 250000 },
  { name: "Riverside Condos", noi: 180000 },
  { name: "Downtown Lofts", noi: 210000 },
]

export function ProfitableProperties() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Profitable Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profitableProperties.map((property, index) => (
            <div key={index} className="flex items-center justify-between">
              <p className="font-medium">{property.name}</p>
              <p className="font-medium">${property.noi.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
