'use client';

import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';



export default function SubcategoryManagement() {
  const [subcategories, setSubCategories] = useState([]);
  const [filteredcategories, setFilteredcategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentcategory, setCurrentcategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch all subcategories
  const fetchCategories = async () => {
    const response = await fetch('/api/admin/categorymanagement');
    if (!response.ok) {
      throw new Error('Failed to fetch subcategories');
    }
    const data = await response.json();
    return data.data;
  };


  const fetchSubCategories = async () => {
    const response = await fetch('/api/admin/subcategorymanagement');
    if (!response.ok) {
      throw new Error('Failed to fetch subcategories');
    }
    const data = await response.json();
    return data.data;
  };

  // Add a new subcategory
  const addSubcategory = async (subcategory) => {
    const response = await fetch('/api/admin/subcategorymanagement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subcategory),
    });
    if (!response.ok) {
      throw new Error('Failed to add subcategory');
    }
    return response.json();
  };

  const handleUpdateSubcategory = (subcategory) => {
    setCurrentcategory(subcategory); // Set the selected subcategory as the current one
    setIsModalOpen(true); // Open the modal for editing
  };

  // Update an existing subcategory
  const updateSubcategory = async (subcategory) => {
    const response = await fetch(`/api/admin/subcategorymanagement/${subcategory.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subcategory),
    });
    if (!response.ok) {
      throw new Error('Failed to update subcategory');
    }
    return response.json();
  };

  // Delete a subcategory
  const deleteSubcategory = async (id) => {
    const response = await fetch(`/api/admin/subcategorymanagement/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Failed to delete subcategory');
    }
    return true;
  };

  // Image upload function
  const imgHippoUpload = async (file) => {
    try {
      if (!file) throw new Error('No file selected for upload');
      const formData = new FormData();
      formData.append('api_key', '91ae71a1cd49263f128de1b43b06aaff'); // Your API key
      formData.append('file', file);

      const response = await fetch('https://api.imghippo.com/v1/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Image upload failed: ${errorData.error.message}`);
      }

      const data = await response.json();
      return data.data.url; // Uploaded image URL
    } catch (error) {
      console.error('Error during image upload:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSubCategories()
      .then(setSubCategories)
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setFilteredcategories(
      subcategories.filter((subcategory) =>
        [subcategory.name, subcategory.description].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [subcategories, searchTerm]);

  const handleAddSubcategory = () => {
    setCurrentcategory(null);
    setIsModalOpen(true);
  };

  const handleDeleteSubcategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      setLoadingAction(id);
      try {
        await deleteSubcategory(id);
        const updatedCategories = await fetchSubCategories();
        setSubCategories(updatedCategories);
        toast.success('Subcategory deleted successfully');
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoadingAction(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const selectedImage = formData.get('image');
    const selectedCoverImage = formData.get('coverimage');

    try {
      
      const isValidImage = selectedImage 
      const isValidCoverImage = selectedCoverImage 

      const imageUrl = isValidImage ? await imgHippoUpload(selectedImage) : null;
      const coverImageUrl = isValidCoverImage ? await imgHippoUpload(selectedCoverImage) : null;


      const categoryData = {
        name: formData.get('name'),
        description: formData.get('description'),
        image: imageUrl,
        coverimage: coverImageUrl,
        category_id: formData.get('category_id'),
      };

      setLoadingAction('form');
      if (currentcategory) {
        await updateSubcategory({ ...currentcategory, ...categoryData });
        toast.success('Subcategory updated successfully');
      } else {
        await addSubcategory(categoryData);
        toast.success('Subcategory added successfully');
      }

      const updatedCategories = await fetchSubCategories();
      setSubCategories(updatedCategories);
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <Input
            type="text"
            placeholder="Search subcategories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-auto"
          />
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddSubcategory} className="bg-indigo-600">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Subcategory
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl ">
              <DialogHeader>
                <DialogTitle>
                  {currentcategory ? 'Update Subcategory' : 'Add Subcategory'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {['name', 'description'].map((field) => (
                    <div key={field} className="relative">
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium"
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <Input
                        type="text"
                        name={field}
                        defaultValue={currentcategory?.[field]}
                      />
                    </div>
                  ))}

                  <div key="image" className="relative">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium"
                    >
                      Image
                    </label>
                    <Input type="file" name="image" />
                  </div>
                  <div key="coverimage" className="relative">
                    <label
                      htmlFor="coverimage"
                      className="block text-sm font-medium"
                    >
                      Cover Image
                    </label>
                    <Input type="file" name="coverimage" />
                  </div>
                </div>
                <div className='mb-2'>
                  <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                    Select Category
                  </label>
                  <Select name="category_id" defaultValue={currentcategory?.category_id || ''}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={loadingAction === 'form'}>
                  {loadingAction === 'form' && <Loader className="mr-2 animate-spin" />}
                  {currentcategory ? 'Update' : 'Add'} Subcategory
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="overflow-auto max-h-[72vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Cover Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredcategories.map((subcategory, index) => (
                  <TableRow key={subcategory.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={subcategory.image || '/placeholder.jpg'}
                        alt="Subcategory"
                        className="w-auto h-20 object-contain"
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={subcategory.coverimage || '/placeholder.jpg'}
                        alt="Subcategory"
                        className="w-auto h-20 object-contain"
                      />
                    </TableCell>
                    <TableCell>{subcategory.name}</TableCell>
                    <TableCell>{subcategory.description}</TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }).format(new Date(subcategory.createdAt))}
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }).format(new Date(subcategory.updatedAt))}
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() => handleUpdateSubcategory(subcategory)}
                        variant="ghost"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteSubcategory(subcategory.id)}
                        variant="ghost"
                        className="text-red-600"
                        disabled={loadingAction === subcategory.id}
                      >
                        {loadingAction === subcategory.id ? (
                          <Loader className="h-4 w-4 animate-spin" />
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
    </div>
  );
}
