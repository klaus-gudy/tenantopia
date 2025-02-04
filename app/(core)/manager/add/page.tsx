'use client';

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const properties = [
    { id: 1, name: "Arcade square" },
    { id: 2, name: "Sunset Heights" },
    { id: 3, name: "Ocean View" },
    { id: 4, name: "Mountain Lodge" },
];

const propertyManagerFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    properties: z.array(z.number()).min(1, "Select at least one property"),
});

export default function AddManagerPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof propertyManagerFormSchema>>({
        resolver: zodResolver(propertyManagerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            properties: [],
        },
    });
    return (
        <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/manager">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">Add new property manager</h1>
                    <p className="text-sm text-muted-foreground">
                        Create and assign property managers to your properties
                    </p>
                </div>
            </div>

            <Card>
                <CardContent className="pt-4">
                    <Form {...form}>
                        <form className="space-y-8">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+1 (555) 000-0000" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4">
                                <FormLabel>Assign Properties</FormLabel>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {properties.map((property) => (
                                        <FormField
                                            key={property.id}
                                            control={form.control}
                                            name="properties"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(property.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, property.id])
                                                                    : field.onChange(
                                                                        field.value?.filter((id) => id !== property.id)
                                                                    );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {property.name}
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button variant="outline" type="button" onClick={() => router.push("/property")}>
                                    Cancel
                                </Button>
                                <Button type="submit">Save details</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}