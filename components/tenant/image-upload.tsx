"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string[]
  onChange: (value: string[]) => void
  onRemove: (value: string) => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // In a real application, you would upload these files to your storage
      // and get back URLs. For now, we'll create object URLs
      const urls = acceptedFiles.map((file) => URL.createObjectURL(file))
      onChange([...value, ...urls])
    },
    [onChange, value],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-4 hover:bg-accent/50 transition cursor-pointer"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive ? "Drop the images here" : `Drag & drop images here, or click to select (Max 5 files)`}
          </p>
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {value.map((url) => (
            <div key={url} className="relative group">
              <div className="aspect-square relative">
                <Image fill src={url || "/placeholder.svg"} alt="Property image" className="object-cover rounded-lg" />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                onClick={() => onRemove(url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

