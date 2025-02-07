"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  FileText,
  ChevronDown,
  Receipt,
  Key,
  Wrench,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { TenantTimelineEvent } from "@/types/tenants";

const timelineEvents: TenantTimelineEvent[] = [
  {
    id: "1",
    date: new Date("2024-01-15"),
    type: "lease",
    title: "Lease Renewal",
    description: "6-month lease agreement signed for Arcade Square, Apt 3B",
    documents: [
      {
        name: "Lease Agreement",
        type: "PDF",
        url: "#",
      },
    ],
  },
  {
    id: "2",
    date: new Date("2024-01-01"),
    type: "payment",
    title: "Rent Payment",
    description: "Monthly rent payment for January 2024",
    amount: 500000,
    status: "Paid",
  },
  {
    id: "3",
    date: new Date("2023-12-15"),
    type: "maintenance",
    title: "Maintenance Request",
    description: "Reported issue with kitchen sink",
    status: "Resolved",
  },
  {
    id: "4",
    date: new Date("2023-12-01"),
    type: "payment",
    title: "Rent Payment",
    description: "Monthly rent payment for December 2023",
    amount: 500000,
    status: "Paid",
  },
  {
    id: "5",
    date: new Date("2023-11-20"),
    type: "other",
    title: "Property Inspection",
    description: "Annual property inspection conducted",
    documents: [
      {
        name: "Inspection Report",
        type: "PDF",
        url: "#",
      },
    ],
  },
];

function getEventIcon(type: TenantTimelineEvent["type"]) {
  switch (type) {
    case "lease":
      return Key;
    case "payment":
      return DollarSign;
    case "maintenance":
      return Wrench;
    default:
      return FileText;
  }
}

function getEventColor(type: TenantTimelineEvent["type"]) {
  switch (type) {
    case "lease":
      return "bg-blue-500";
    case "payment":
      return "bg-green-500";
    case "maintenance":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
}

export function TenantTimeline() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tenant Activity Timeline</CardTitle>
        <CardDescription>
          Showing history of lease and payments for the past 3 years{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />
          <div className="space-y-6">
            {timelineEvents.map((event) => {
              const Icon = getEventIcon(event.type);
              const isOpen = openItems.includes(event.id);

              return (
                <Collapsible
                  key={event.id}
                  open={isOpen}
                  onOpenChange={() => toggleItem(event.id)}
                >
                  <div className="relative flex gap-4">
                    <div
                      className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${getEventColor(
                        event.type
                      )} text-white`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <CollapsibleTrigger className="flex w-full items-start justify-between text-left">
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {event.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(event.date, "PPP")}
                          </p>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                        {event.amount && (
                          <p className="text-sm font-medium">
                            Amount: {event.amount.toLocaleString()} TZS
                          </p>
                        )}
                        {event.status && (
                          <Badge
                            variant={
                              event.status === "Paid" ||
                              event.status === "Resolved"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {event.status}
                          </Badge>
                        )}
                        {event.documents && event.documents.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Documents</p>
                            <div className="flex flex-wrap gap-2">
                              {event.documents.map((doc, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="h-7"
                                >
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
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
