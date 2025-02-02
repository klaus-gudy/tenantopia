import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search } from "lucide-react";

const payments: Payment[] = [
  {
    id: "1",
    tenant: "Issa Moura",
    property: "Arcade Square",
    amount: "500,000 TZS",
    status: "paid",
    date: "2024-01-01",
    dueDate: "2024-01-05",
    duration: "1 year",
  },
  {
    id: "2",
    tenant: "Emmy Wilson",
    property: "Palm Heights",
    amount: "750,000 TZS",
    status: "pending",
    date: "2024-02-01",
    dueDate: "2024-02-05",
    duration: "1 month",
  },
];

export default function PaymentPage() {
  return (
    <div className="animate-fadeIn space-y-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold tracking-tight">Payments</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track all property payments
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Agreement Duration</TableHead>
              <TableHead>Contract</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.tenant}</TableCell>
                <TableCell>{payment.property}</TableCell>
                <TableCell>{payment.amount.toLocaleString()} TZS</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "paid"
                        ? "default"
                        : payment.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell>{payment.duration}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}