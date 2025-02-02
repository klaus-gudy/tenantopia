interface Property {
    id: number;
    name: string;
    address: string;
    manager: string;
    status: "Occupied" | "Vacant";
    vacantDate: string;
    image: string;
}