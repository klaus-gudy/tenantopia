interface Property {
    id: number;
    name: string;
    address: string;
    manager: string;
    status: "Occupied" | "Vacant";
    vacantDate: string;
    image: string;
}

interface TimelineEvent {
    id: string
    date: Date
    type: "tenant" | "maintenance" | "document" | "inspection"
    title: string
    description: string
    cost?: number
    documents?: {
        name: string
        type: string
        url: string
    }[]
    maintenanceType?: string
    contractor?: {
        name: string
        company: string
        avatar: string
    }
    tenant?: {
        name: string
        avatar: string
    }
}