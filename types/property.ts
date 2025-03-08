interface Property {
    id: number;
    name: string;
    address: string;
    type: string;
    units: number;
    availableUnits: number;
    manager: string;
    status?: "Occupied" | "Vacant";
    vacantDate?: string;
    image?: string;
}

interface Unit {
    id: string;
    name: string;
    description: string;
    size: number;
    price: number;
    rooms: number;
    kitchen: boolean;
    bathrooms: boolean;
    livingRoom: boolean;
    balcony: boolean;
    minLeaseTerm: number;
    monthlyRent: number;
    isOccupied: boolean;
    tenant?: string;
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

interface PropertyDetails {
    id: string;
    name: string;
    address: string;
    type: string;
    city: string;
    district: string;
    street: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    manager: string | null;
    units: Unit[];
}