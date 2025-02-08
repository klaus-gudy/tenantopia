interface MaintenanceRequest {
    id: string
    title: string
    description: string
    property: string
    tenant: string
    dateSubmitted: string
    status: "new" | "assigned" | "in_progress" | "completed"
    priority: "low" | "medium" | "high" | "urgent"
    assignedTo?: string
}