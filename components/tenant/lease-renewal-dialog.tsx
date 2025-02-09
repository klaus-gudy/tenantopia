"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format, addMonths } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

const renawalFormSchema = z.object({
  property: z.string({
    required_error: "Please select a property.",
  }),
  duration: z
    .number({
      required_error: "Please enter the lease duration.",
      invalid_type_error: "Duration must be a number.",
    })
    .positive()
    .int(),
  startDate: z.date({
    required_error: "Please select a start date.",
  }),
  rentAmount: z
    .number({
      required_error: "Please enter the rent amount.",
      invalid_type_error: "Rent amount must be a number.",
    })
    .positive(),
  paymentSchedule: z.enum(["monthly", "quarterly", "annually"], {
    required_error: "Please select a payment schedule.",
  }),
  payslip: z.instanceof(File).optional(),
  endDate: z
    .date({
      required_error: "End date is required.",
    })
    .optional(),
});

const property = [
  {
    id: "1",
    name: "Sunset Apartments",
  },
  {
    id: "2",
    name: "Downtown Lofts",
  },
  {
    id: "3",
    name: "Riverside Condos",
  },
];

export function LeaseRenewalDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const form = useForm<z.infer<typeof renawalFormSchema>>({
    resolver: zodResolver(renawalFormSchema),
    defaultValues: {
      duration: 12,
      paymentSchedule: "monthly",
      endDate: undefined,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Extend lease contract</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Extend lease contract</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="property"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a property" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {property.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
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
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (months)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        const startDate = form.getValues("startDate");
                        const duration = form.getValues("duration");
                        if (startDate && duration) {
                          const newEndDate = addMonths(startDate, duration);
                          setEndDate(newEndDate);
                          form.setValue("endDate", newEndDate);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          const duration = form.getValues("duration");
                          if (date && duration) {
                            const newEndDate = addMonths(date, duration);
                            setEndDate(newEndDate);
                            form.setValue("endDate", newEndDate);
                          }
                        }}
                        disabled={(date) =>
                          date < new Date() || date > new Date("2100-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={endDate ? format(endDate, "PPP") : ""}
                      disabled
                    />
                  </FormControl>
                  <FormDescription className="italic">
                    Automatically calculated based on start date and duration.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Amount (TZS)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                      disabled
                    />
                  </FormControl>
                  <FormDescription className="italic">
                    Automatically calculated based on duration.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Lease Agreement</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}