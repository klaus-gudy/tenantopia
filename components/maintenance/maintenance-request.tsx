
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, User, Wrench } from "lucide-react";
import { useState } from "react";

type Priority = "Low" | "Medium" | "High";
type Status = "Open" | "In Progress" | "Completed";

interface MaintenanceRequest {
  id: string;
  propertyName: string;
  description: string;
  priority: Priority;
  status: Status;
  dateSubmitted: string;
  assignedTo?: string;
}

const contractors = [
  "John Smith",
  "Sarah Johnson",
  "Mike Williams",
  "Emma Davis",
];

const dummyRequests: MaintenanceRequest[] = [
  {
    id: "1",
    propertyName: "Sunset Apartments #101",
    description: "Leaking faucet in kitchen",
    priority: "Medium",
    status: "Open",
    dateSubmitted: "2024-03-15",
  },
  {
    id: "2",
    propertyName: "Ocean View Complex #304",
    description: "AC not cooling properly",
    priority: "High",
    status: "In Progress",
    dateSubmitted: "2024-03-14",
    assignedTo: "John Smith",
  },
];

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(dummyRequests);

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "";
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  const assignContractor = (requestId: string, contractorName: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              assignedTo: contractorName,
              status: "In Progress" as Status,
            }
          : request
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          <h1 className="text-2xl font-semibold">Maintenance Requests</h1>
        </div>
        <Button
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.propertyName}
                </TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>
                  <span className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </TableCell>
                <TableCell>{request.dateSubmitted}</TableCell>
                <TableCell>
                  {request.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {request.assignedTo}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">
                        {request.status === "Open" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Assign Contractor
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {contractors.map((contractor) => (
                          <DropdownMenuItem
                            key={contractor}
                            onClick={() => assignContractor(request.id, contractor)}
                          >
                            {contractor}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {request.status === "Open" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Assign Contractor
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {contractors.map((contractor) => (
                          <DropdownMenuItem
                            key={contractor}
                            onClick={() => assignContractor(request.id, contractor)}
                          >
                            {contractor}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default MaintenanceRequests;
