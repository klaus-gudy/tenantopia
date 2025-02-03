'use client';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    gender: z.enum(["male", "female"]),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    email: z.string().email("Invalid email address"),
    nidaNumber: z.string().min(6, "NIDA number must be at least 6 characters"),
    emergencyContact: z.string().min(10, "Emergency contact must be at least 10 digits"),
    propertyName: z.string().min(1, "Please select a property"),
    leaseDuration: z.string().min(1, "Please select lease duration"),
    startDate: z.date(),
    endDate: z.date(),
    rentAmount: z.string().min(1, "Rent amount is required"),
});

export default function AddTenantPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: "male",
            startDate: new Date(),
            endDate: new Date(),
        },
    });
    return (
        <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/tenants">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">Add new tenant</h1>
                    <p className="text-sm text-muted-foreground">
                        Fill in the form below to add a new tenant
                    </p>
                </div>
            </div>

            <Card>
                <CardContent className="pt-4">
                    <Form {...form}>
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h2 className="text-lg font-medium">Basic information</h2>

                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Issa Moura" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex gap-4"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="male" id="male" />
                                                            <label htmlFor="male">Male</label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="female" id="female" />
                                                            <label htmlFor="female">Female</label>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+255 6234 70540" {...field} />
                                                </FormControl>
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
                                                    <Input placeholder="issamoura@gmail.com" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="nidaNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>NIDA number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="19920717-02754-34545-011" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="emergencyContact"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Emergency contact</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+255 6234 70540" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Lease Information */}
                                <div className="space-y-4">
                                    <h2 className="text-lg font-medium">Lease information</h2>

                                    <FormField
                                        control={form.control}
                                        name="propertyName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Property name</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select property" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="arcade">Arcade Square</SelectItem>
                                                        <SelectItem value="palm">Palm Heights</SelectItem>
                                                        <SelectItem value="sunset">Sunset Valley</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="leaseDuration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Lease duration</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select duration" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="6">6 months</SelectItem>
                                                        <SelectItem value="12">1 year</SelectItem>
                                                        <SelectItem value="24">2 years</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Start date</FormLabel>
                                                    <FormControl>
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            className="rounded-md border"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>End date</FormLabel>
                                                    <FormControl>
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            className="rounded-md border"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="rentAmount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Rent amount (TZS)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="500,000.00" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
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