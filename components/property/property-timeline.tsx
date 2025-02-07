"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  Users,
  Wrench,
  FileText,
  ChevronDown,
  Receipt,
  Home,
  PaintbrushIcon as Paint,
  Plug,
  Droplets,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const timelineEvents: TimelineEvent[] = [
    {
        id: "1",
        date: new Date("2024-01-15"),
        type: "tenant",
        title: "New Tenant Move-in",
        description: "Mr. Remmy Ambokile signed a 6-month lease agreement",
        documents: [
            {
                name: "Lease Agreement",
                type: "PDF",
                url: "#",
            },
            {
                name: "Move-in Inspection",
                type: "PDF",
                url: "#",
            },
        ],
        tenant: {
            name: "Remmy Ambokile",
            avatar: "/placeholder.svg",
        },
    },
    {
        id: "2",
        date: new Date("2023-12-20"),
        type: "maintenance",
        title: "Electrical System Upgrade",
        description: "Complete rewiring of the kitchen and installation of new outlets",
        cost: 750000,
        maintenanceType: "electrical",
        contractor: {
            name: "James Wilson",
            company: "Elite Electrical Services",
            avatar: "/placeholder.svg",
        },
        documents: [
            {
                name: "Invoice #EL-2023-12",
                type: "PDF",
                url: "#",
            },
            {
                name: "Electrical Inspection Report",
                type: "PDF",
                url: "#",
            },
        ],
    },
    {
        id: "3",
        date: new Date("2023-11-15"),
        type: "inspection",
        title: "Annual Property Inspection",
        description: "Comprehensive inspection of all systems and structure",
        documents: [
            {
                name: "Inspection Report",
                type: "PDF",
                url: "#",
            },
            {
                name: "Photo Documentation",
                type: "ZIP",
                url: "#",
            },
        ],
    },
    {
        id: "4",
        date: new Date("2023-10-01"),
        type: "maintenance",
        title: "Interior Painting",
        description: "Complete repainting of all interior walls and ceilings",
        cost: 1200000,
        maintenanceType: "renovation",
        contractor: {
            name: "Sarah Chen",
            company: "Perfect Paint Pro",
            avatar: "/placeholder.svg",
        },
        documents: [
            {
                name: "Invoice #PP-2023-10",
                type: "PDF",
                url: "#",
            },
        ],
    },
    {
        id: "5",
        date: new Date("2023-09-30"),
        type: "tenant",
        title: "Tenant Move-out",
        description: "Previous tenant Emmy Wilson completed their lease term",
        tenant: {
            name: "Emmy Wilson",
            avatar: "/placeholder.svg",
        },
        documents: [
            {
                name: "Move-out Inspection",
                type: "PDF",
                url: "#",
            },
            {
                name: "Security Deposit Return",
                type: "PDF",
                url: "#",
            },
        ],
    },
]

function getEventIcon(type: TimelineEvent["type"], maintenanceType?: string) {
    if (type === "tenant") return Users
    if (type === "document") return FileText
    if (type === "inspection") return Home
    if (type === "maintenance") {
        switch (maintenanceType) {
            case "electrical":
                return Plug
            case "plumbing":
                return Droplets
            case "renovation":
                return Paint
            default:
                return Wrench
        }
    }
    return FileText
}

function getEventColor(type: TimelineEvent["type"]) {
    switch (type) {
        case "tenant":
            return "bg-blue-500"
        case "maintenance":
            return "bg-orange-500"
        case "document":
            return "bg-purple-500"
        case "inspection":
            return "bg-green-500"
        default:
            return "bg-gray-500"
    }
}

export function PropertyTimeline() {
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggleItem = (id: string) => {
        setOpenItems((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
    }

    const totalMaintenanceCost = timelineEvents
        .filter((event) => event.type === "maintenance")
        .reduce((sum, event) => sum + (event.cost || 0), 0)
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Property Timeline</CardTitle>
                    <Badge variant="secondary" className="font-mono">
                        Total Maintenance: {totalMaintenanceCost.toLocaleString()} TZS
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />
                    <div className="space-y-6">
                        {timelineEvents.map((event) => {
                            const Icon = getEventIcon(event.type, event.maintenanceType)
                            const isOpen = openItems.includes(event.id)

                            return (
                                <Collapsible key={event.id} open={isOpen} onOpenChange={() => toggleItem(event.id)}>
                                    <div className="relative flex gap-4">
                                        <div
                                            className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${getEventColor(
                                                event.type,
                                            )} text-white`}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1">
                                            <CollapsibleTrigger className="flex w-full items-start justify-between text-left">
                                                <div>
                                                    <p className="text-sm font-medium leading-none">{event.title}</p>
                                                    <p className="text-sm text-muted-foreground">{format(event.date, "PPP")}</p>
                                                </div>
                                                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="mt-2 space-y-4">
                                                <p className="text-sm text-muted-foreground">{event.description}</p>
                                                {event.cost && <p className="text-sm font-medium">Cost: {event.cost.toLocaleString()} TZS</p>}
                                                {event.contractor && (
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={event.contractor.avatar} alt={event.contractor.name} />
                                                            <AvatarFallback>
                                                                {event.contractor.name
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="text-sm">
                                                            <p className="font-medium">{event.contractor.name}</p>
                                                            <p className="text-muted-foreground">{event.contractor.company}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {event.tenant && (
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={event.tenant.avatar} alt={event.tenant.name} />
                                                            <AvatarFallback>
                                                                {event.tenant.name
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <p className="text-sm font-medium">{event.tenant.name}</p>
                                                    </div>
                                                )}
                                                {event.documents && event.documents.length > 0 && (
                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium">Documents</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {event.documents.map((doc, index) => (
                                                                <Button key={index} variant="outline" size="sm" className="h-7">
                                                                    <Receipt className="mr-2 h-3 w-3" />
                                                                    {doc.name}
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </CollapsibleContent>
                                        </div>
                                    </div>
                                </Collapsible>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}