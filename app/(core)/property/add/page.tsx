'use client';

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/tenant/image-upload";
import { Checkbox } from "@/components/ui/checkbox";

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
    other: z.object({
        masterRoom: z.boolean(),
        livingRoom: z.boolean(),
        kitchen: z.boolean(),
        parking: z.boolean(),
    }).nonstrict(),
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

                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price (TZS)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter price" {...field} />
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
                                                        {[1, 2, 3, 4, 5].map((num) => (
                                                            <SelectItem key={num} value={num.toString()}>
                                                                {num} {num === 1 ? "bedroom" : "bedrooms"}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="other"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Other</FormLabel>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {[
                                                        "Master room",
                                                        "Living room",
                                                        "Kitchen",
                                                        "Parking",
                                                    ].map((amenity) => (
                                                        <FormField
                                                            key={amenity}
                                                            control={form.control}
                                                            name={`other.${amenity.toLowerCase().replace(" ", "-")}`}
                                                            render={({ field: checkboxField }) => (
                                                                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            onCheckedChange={checkboxField.onChange}
                                                                            id={amenity.toLowerCase().replace(" ", "-")}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel htmlFor={amenity.toLowerCase().replace(" ", "-")} className="font-normal">
                                                                        {amenity}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="images"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Property Images</FormLabel>
                                                <FormControl>
                                                    <ImageUpload
                                                        value={field.value}
                                                        onChange={(urls) => field.onChange(urls)}
                                                        onRemove={(url) => field.onChange(field.value.filter((current) => current !== url))}
                                                    />
                                                </FormControl>
                                                <FormDescription>Upload images of the property. You can upload multiple images.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
    )
}