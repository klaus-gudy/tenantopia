import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import Link from "next/link";

const properties = [
    { id: 1, name: "Arcade square" },
    { id: 2, name: "Sunset Heights" },
    { id: 3, name: "Ocean View" },
    { id: 4, name: "Mountain Lodge" },
];

const mockPropertyManagers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        properties: [1, 2],
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "0987654321",
        properties: [3, 4],
    },
];

export default function ManagerPage() {

    const getPropertyNames = (propertyIds: number[]) => {
        return propertyIds
            .map((id) => properties.find((p) => p.id === id)?.name)
            .filter(Boolean);
    };

    return (
        <div className="animate-fadeIn space-y-4">
            <div>
                <h1 className="text-xl font-semibold tracking-tight">
                    Property managers
                </h1>
                <p className="text-sm text-muted-foreground">Manage your property managers and their assignments</p>
            </div>

            <div className="flex items-center justify-end gap-4 flex-wrap">
                <Button asChild>
                    <Link href="/manager/add">
                        <Plus className="h-4 w-4 mr-2" />
                        Create a manager
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockPropertyManagers.map((manager) => (
                    <div
                        key={manager.id}
                        className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarFallback>
                                        {manager.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-medium">{manager.name}</h3>
                                    <p className="text-sm text-muted-foreground">{manager.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-muted-foreground">
                                Assigned properties
                            </p>
                            <div className="mt-2 flex -space-x-2">
                                {getPropertyNames(manager.properties).map((name, index) => (
                                    <div key={index} className="relative group">
                                        <Avatar className="border-2 border-background">
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {name?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute bottom-full mb-2 hidden w-max px-2 py-1 text-xs text-white bg-black rounded group-hover:block">
                                            {name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
