export interface Tenant {
    id: number;
    name: string;
    phone: string;
    property: string;
    unit: string;
    duration: string;
    image: string;
}

export interface RecentTenant {
    name: string;
    period: string;
}

export interface TenantTimelineEvent {
    id: string;
    date: Date;
    type: "lease" | "payment" | "maintenance" | "other";
    title: string;
    description: string;
    amount?: number;
    documents?: {
        name: string;
        type: string;
        url: string;
    }[];
    status?: "Paid" | "Pending" | "Overdue" | "Resolved";
}