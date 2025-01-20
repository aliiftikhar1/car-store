'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRef, useState } from "react"
import { Upload, Loader2 } from 'lucide-react'
import { toast } from "sonner"
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});
import { Label } from "@radix-ui/react-label"


export default function ContactForm() {
  const editor = useRef(null);
  const [files, setFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editorContent, setEditorContent] = useState({
    description: '',
    highlights: '',
    notes: '',
  });
  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...selectedFiles])
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const formData = new FormData(e.currentTarget);
      const jsonData = Object.fromEntries(formData.entries());
  
      // Handle select fields
      jsonData.phoneCode = formData.get('phoneCode');
      jsonData.mileageUnit = formData.get('mileageUnit');
      jsonData.currency = formData.get('currency');
      jsonData.country = formData.get('country');
  
      // Add editor content
      jsonData.description = editorContent.description;
      jsonData.highlights = editorContent.highlights;
      jsonData.notes = editorContent.notes;
     
      const filePromises = files.map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64,
        };
      });
  
      jsonData.files = await Promise.all(filePromises);
  
      // Submit the form
      const response = await fetch('http://localhost:3000/api/user/submitform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast.success("Your inquiry has been submitted successfully.");
        setFiles([]); // Reset file input
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="max-w-4xl mt-16 mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-8">
        <span className="text-[#B08968]">Contact</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              First Name *
            </label>
            <Input id="firstName" name="firstName" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name *
            </label>
            <Input id="lastName" name="lastName" required />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail *
            </label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone number *
            </label>
            <div className="flex gap-2">
              <Input id="phone" name="phone" type="tel" required className="flex-1" />
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-[#B08968] pt-4">Vehicle</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="vehicleMake" className="text-sm font-medium">
              Vehicle make *
            </label>
            <Input id="vehicleMake" name="vehicleMake" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="vehicleModel" className="text-sm font-medium">
              Vehicle model *
            </label>
            <Input id="vehicleModel" name="vehicleModel" required />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="vehicleYear" className="text-sm font-medium">
              Vehicle year *
            </label>
            <Input id="vehicleYear" name="vehicleYear" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="vin" className="text-sm font-medium">
              VIN or Chassis No.
            </label>
            <Input id="vin" name="vin" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="mileage" className="text-sm font-medium">
              Estimated Mileage *
            </label>
            <div className="flex gap-2">
              <Input id="mileage" name="mileage" required className="flex-1" />
              <Select name="mileageUnit" defaultValue="mi">
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="mi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mi">mi</SelectItem>
                  <SelectItem value="km">km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Expected Price
            </label>
            <div className="flex gap-2">
              <Input id="price" name="price" className="flex-1" />
              <Select name="currency" defaultValue="USD">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Where is the car located?
            </label>
            <Select name="country">
              <SelectTrigger>
                <SelectValue placeholder="Select Country..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="postal" className="text-sm font-medium">
              Postal / Zip Code
            </label>
            <Input id="postal" name="postal" />
          </div>
        </div>

        {['description', 'highlights', 'notes'].map((field) => (
          <div key={field} className="col-span-4">
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            
            <JoditEditor
              ref={editor}
              value={editorContent[field]}
              tabIndex={1}
              onBlur={(newContent) => setEditorContent(prev => ({ ...prev, [field]: newContent }))}
              onChange={() => { }}
            />
          </div>
        ))}
      
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Please submit a few clear photos of your car
          </Label>
          <div 
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/jpeg,image/gif,image/webp"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">
              Drag & drop files or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPEG, JPG, GIF, WEBP
            </p>
            {files.length > 0 && (
              <div className="mt-4 text-sm text-left">
                <p className="font-medium">Selected files:</p>
                <ul className="list-disc pl-5">
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit"
          className="bg-[#B08968] hover:bg-[#97775A] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Inquiry'
          )}
        </Button>
      </form>
    </div>
  )
}

