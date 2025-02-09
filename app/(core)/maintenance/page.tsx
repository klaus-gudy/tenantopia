import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "MR001",
    title: "Leaking Faucet",
    description: "Kitchen sink faucet is constantly dripping",
    property: "Arcade Square, Apt 3B",
    tenant: "John Doe",
    dateSubmitted: "2024-01-15",
    status: "new",
    priority: "medium",
  },
];

export default function MaintainancePage() {
  return (
    <div className="animate-fadeIn space-y-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold tracking-tight">
          Maintenance request
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage and track maintenance request from tenants
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Assigned to</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceRequests.map((maintenanceRequest) => (
              <TableRow key={maintenanceRequest.id}>
                <TableCell>{maintenanceRequest.id}</TableCell>
                <TableCell>{maintenanceRequest.title}</TableCell>
                <TableCell>{maintenanceRequest.property}</TableCell>
                <TableCell>{maintenanceRequest.tenant}</TableCell>
                <TableCell><Badge variant={"outline"}>{maintenanceRequest.status}</Badge></TableCell>
                <TableCell><Badge variant={"outline"}>{maintenanceRequest.priority}</Badge></TableCell>
                <TableCell>{maintenanceRequest.dateSubmitted}</TableCell>
                <TableCell>
                {maintenanceRequest.assignedTo && maintenanceRequest.status !== "new" ? (
                    <div className="flex items-center gap-2">
                      {maintenanceRequest.assignedTo}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Unassigned</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
