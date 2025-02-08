'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Upload } from "lucide-react"
import { useState } from "react"

export function LeaseApplicationDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Apply for leasing</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for leasing</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Detailed filed summary</Label>
            <Input defaultValue="Arcade square" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Select tenant</Label>
            <Input placeholder="Select tenant" />
          </div>
          <div className="space-y-2">
            <Label>Duration</Label>
            <Input placeholder="Duration" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start date</Label>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Pick start date
              </Button>
            </div>
            <div className="space-y-2">
              <Label>End date</Label>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Pick end date
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Rent amount</Label>
            <Input placeholder="Enter rent amount" />
          </div>
          <div className="space-y-2">
            <Label>Payment schedule (optional)</Label>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Pick start date
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Attachment (optional)</Label>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <Upload className="mr-2 h-4 w-4" />
              Upload pay slip statement
            </Button>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}