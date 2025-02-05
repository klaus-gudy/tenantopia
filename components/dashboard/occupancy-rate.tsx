"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

const chartData = [
  { name: "Arcade Square", revenue: 5000, expenses: 2000 },
  { name: "Palm Heights", revenue: 4500, expenses: 1800 },
  { name: "City View", revenue: 6000, expenses: 2500 },
  { name: "Sunset Apartments", revenue: 5500, expenses: 2200 },
  { name: "Green Valley", revenue: 4000, expenses: 1500 },
  { name: "Ocean View", revenue: 7000, expenses: 3000 },
]

const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    expenses: {
      label: "Expenses",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

export function OccupancyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Performance</CardTitle>
        <CardDescription>January 2020 - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending of the most profitable properties <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing revenue and expenses for the top 6 properties
        </div>
      </CardFooter>
    </Card>
  )
}

