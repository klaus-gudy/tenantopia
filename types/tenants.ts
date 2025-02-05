export interface Tenant {
    id: number;
    name: string;
    phone: string;
    property: string;
    duration: string;
    image: string;
}

export interface RecentTenant {
    name: string;
    period: string;
}