'use client';

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const propertyFormSchema = z.object({
    name: z.string().min(2, { message: "Property name must be at least 2 characters.", }),
    description: z.string().min(10, { message: "Property description must be at least 10 characters.", }),
    address: z.string().min(5, {message: "Address must be at least 5 characters.", }),
    type: z.string({ required_error: "Please select a property type.", }),
    status: z.string({ required_error: "Please select a property status.", }),
    price: z.string().min(1, { message: "Price is required.", }),
    bedrooms: z.string().min(1, { message: "Number of bedrooms is required.", }),
    bathrooms: z.string().min(1, { message: "Number of bathrooms is required.", }),
    images: z.array(z.string()).min(1, { message: "At least one image is required.", }),
  })

export default function AddPropertyPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof propertyFormSchema>>({
        resolver: zodResolver(propertyFormSchema),
        defaultValues: {
            images: [],
        },
    })
    return (
        <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/property">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">Add new tenant</h1>
                    <p className="text-sm text-muted-foreground">
                        Fill in the details below to add a new property
                    </p>
                </div>
            </div>

            <Card>
                <CardContent className="pt-4">
                    <Form {...form}>
                        <form className="space-y-8">
                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Property Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter property name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Enter property description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter property address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Property Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select property type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="apartment">Apartment</SelectItem>
                                                        <SelectItem value="house">House</SelectItem>
                                                        <SelectItem value="condo">Condo</SelectItem>
                                                        <SelectItem value="commercial">Commercial</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div></div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button variant="outline" type="button" onClick={() => router.push("/tenants")}>
                                    Cancel
                                </Button>
                                <Button type="submit">Save details</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}