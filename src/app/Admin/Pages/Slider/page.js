'use client'

import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { PencilIcon, TrashIcon, PlusIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import 'react-toastify/dist/ReactToastify.css'

// Add the imgHippoUpload function
const imgHippoUpload = async (file) => {
  try {
    if (!file) throw new Error('No file selected for upload')
    const formData = new FormData()
    formData.append('api_key', '91ae71a1cd49263f128de1b43b06aaff') // Your API key
    formData.append('file', file)

    const response = await fetch('https://api.imghippo.com/v1/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Image upload failed: ${errorData.error.message}`)
    }

    const data = await response.json()
    return data.data.url // Uploaded image URL
  } catch (error) {
    console.error('Error during image upload:', error)
    throw error
  }
}

export default function SlideManagement() {
  const [slides, setSlides] = useState([])
  const [filteredSlides, setFilteredSlides] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [loadingAction, setLoadingAction] = useState(null)

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/slidermanagement')
      if (!response.ok) throw new Error('Failed to fetch slides')
      const data = await response.json()
      setSlides(data)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setFilteredSlides(
      slides.filter((slide) =>
        [slide.title, slide.description, slide.link].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    )
  }, [slides, searchTerm])

  const handleAddSlide = () => {
    setCurrentSlide(null)
    setIsModalOpen(true)
  }

  const handleUpdateSlide = (slide) => {
    setCurrentSlide(slide)
    setIsModalOpen(true)
  }

  const handleDeleteSlide = async (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setLoadingAction(id)
      try {
        const response = await fetch(`/api/admin/slidermanagement/${id}`, {
          method: 'DELETE',
        })
        if (!response.ok) throw new Error('Failed to delete slide')
        setSlides(slides.filter((slide) => slide.id !== id))
        toast.success('Slide deleted successfully')
      } catch (err) {
        toast.error(err.message)
      } finally {
        setLoadingAction(null)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    try {
      setLoadingAction('form')

      // Handle image upload
      const imageFile = formData.get('image')
      let imageUrl = currentSlide?.image // Keep the existing image URL if no new file is selected

      if (imageFile && imageFile.size > 0) {
        imageUrl = await imgHippoUpload(imageFile)
      }

      const slideData = {
        title: formData.get('title'),
        description: formData.get('description'),
        image: imageUrl,
        link: formData.get('link'),
      }

      if (currentSlide) {
        // Update existing slide
        const response = await fetch(`/api/admin/slidermanagement/${currentSlide.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slideData),
        })
        if (!response.ok) throw new Error('Failed to update slide')
        const updatedSlide = await response.json()
    fetchSlides()
       
        toast.success('Slide updated successfully')
      } else {
        // Add new slide
        const response = await fetch('/api/admin/slidermanagement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slideData),
        })
        if (!response.ok) throw new Error('Failed to add slide')
        const newSlide = await response.json()
        fetchSlides()
        toast.success('Slide added successfully')
      }

      setIsModalOpen(false)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="mb-6 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search slides..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddSlide} className="">
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentSlide ? 'Update Slide' : 'Add Slide'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={currentSlide?.title}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={currentSlide?.description}
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1">
                  Image
                </label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                />

                {currentSlide?.image && (
                  <img src={currentSlide.image} alt="Current slide" className="mt-2 w-full h-32 object-cover rounded" />
                )}
              </div>
              <div>
                <label htmlFor="link" className="block text-sm font-medium mb-1">
                  Link
                </label>
                <Input
                  id="link"
                  name="link"
                  type="url"
                  defaultValue={currentSlide?.link}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loadingAction === 'form'}>
                {loadingAction === 'form' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentSlide ? 'Update' : 'Add'} Slide
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSlides.map((slide) => (
                <TableRow key={slide.id}>
                  <TableCell>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className=" h-20 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{slide.title}</TableCell>
                  <TableCell>{slide.description}</TableCell>
                  <TableCell>
                    <a href={slide.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {slide.link}
                    </a>
                  </TableCell>
                  <TableCell>{new Date(slide.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(slide.updatedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleUpdateSlide(slide)}
                      variant="ghost"
                      size="sm"
                      className="mr-2"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteSlide(slide.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      disabled={loadingAction === slide.id}
                    >
                      {loadingAction === slide.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <TrashIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

