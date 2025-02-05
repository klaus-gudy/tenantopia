// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const delinquentTenants = [
//   { name: "Alice Brown", property: "Sunset Apartments", amountDue: 1500, daysOverdue: 15 },
//   { name: "Charlie Davis", property: "Riverside Condos", amountDue: 2000, daysOverdue: 10 },
//   { name: "Eva Green", property: "Downtown Lofts", amountDue: 1200, daysOverdue: 7 },
// ]

// export function DelinquentTenants() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Top Delinquent Tenants</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {delinquentTenants.map((tenant, index) => (
//             <div key={index} className="flex items-center justify-between">
//               <div>
//                 <p className="font-medium">{tenant.name}</p>
//                 <p className="text-sm text-muted-foreground">{tenant.property}</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-medium">${tenant.amountDue}</p>
//                 <p className="text-sm text-muted-foreground">{tenant.daysOverdue} days overdue</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { name: "Alice Brown", desktop: 186, mobile: 80 },
  { name: "Charlie Davis", desktop: 305, mobile: 200 },
  { name: "Eva Green", desktop: 237, mobile: 120 },
  { name: "Max Johnson", desktop: 73, mobile: 190 },
  { name: "Alex Smith", desktop: 209, mobile: 130 },
  { name: "Bob Wilson", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export function DelinquentTenants() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Delinquent Tenants</CardTitle>
        <CardDescription>Quarter 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="desktop"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
