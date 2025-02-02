interface Payment {
    id: string;
    tenant: string;
    property: string;
    amount: string;
    status: "paid" | "pending" | "overdue";
    date: string;
    dueDate: string;
    duration: string;
}