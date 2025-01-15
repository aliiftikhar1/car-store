'use client';

import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, X, EyeIcon } from 'lucide-react';
import Image from 'next/image';
import { ProductDetailsDialog } from './product-details';
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

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [viewProductDialogOpen, setViewProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  // Fetch categories
  const fetchCategories = async () => {
    const response = await fetch('/api/admin/categorymanagement');
    const data = await response.json();
    return data.data;
  };

  // Fetch subcategories
  const fetchSubcategories = async () => {
    const response = await fetch('/api/admin/subcategorymanagement');
    const data = await response.json();
    return data.data;
  };

  // Fetch products
  const fetchProducts = async () => {
    const response = await fetch('/api/admin/productmanagement');
    const data = await response.json();
    return data.data;
  };

  // Image upload function
  const imgHippoUpload = async (files) => {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('api_key', '91ae71a1cd49263f128de1b43b06aaff');
      formData.append('file', file);

      const response = await fetch('https://api.imghippo.com/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.data.url;
    });

    return Promise.all(uploadPromises);
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const newImages = [...selectedImages];
      const uploadedImages = await imgHippoUpload(newImages.map(img => img.file));

      const productData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        status: formData.get('status'),
        isfeatured: formData.get('isfeatured') === 'on',
        istoprated: formData.get('istoprated') === 'on',
        istopselling: formData.get('istopselling') === 'on',
        isdiscounted: formData.get('isdiscounted') === 'on',
        discount: parseInt(formData.get('discount') || '0', 10),
        web_slug: formData.get('web_slug'),
        meta_title: formData.get('meta_title'),
        meta_description: formData.get('meta_description'),
        meta_keywords: formData.get('meta_keywords'),
        category_id: formData.get('category_id'),
        subcategory_id: formData.get('subcategory_id'),
        product_images: [
          ...existingImages,
          ...uploadedImages.map((url, index) => ({ 
            url, 
            type: newImages[index].type 
          }))
        ],
      };

      setLoadingAction('form');
      if (currentProduct) {
        await fetch(`/api/admin/productmanagement/${currentProduct.id}?id=${currentProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        toast.success('Product updated successfully');
      } else {
        await fetch('/api/admin/productmanagement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        toast.success('Product added successfully');
      }

      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
      setIsModalOpen(false);
      setSelectedImages([]);
      setExistingImages([]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleImageSelect = (e, type = 'product') => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files.map(file => ({ file, type }))]);
  };

  const handleRemoveSelectedImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories(), fetchSubcategories()])
      .then(([products, categories, subcategories]) => {
        setProducts(products);
        setCategories(categories);
        setSubcategories(subcategories);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (currentProduct) {
      setExistingImages(currentProduct.ProductImages || []);
    } else {
      setExistingImages([]);
    }
    setSelectedImages([]);
  }, [currentProduct]);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setViewProductDialogOpen(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-auto"
          />
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setCurrentProduct(null)} className="bg-indigo-600">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl">
              <DialogHeader>
                <DialogTitle>
                  {currentProduct ? 'Update Product' : 'Add Product'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-2 ">
                  {['name', 'description', 'price', 'status', 'web_slug', 'meta_title', 'meta_description', 'meta_keywords'].map((field) => (
                    <div key={field} className="relative">
                      <label htmlFor={field} className="block text-sm font-medium">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <Input
                        type="text"
                        name={field}
                        defaultValue={currentProduct?.[field] || ''}
                      />
                    </div>
                  ))}

                  <div key="images" className="relative col-span-2">
                    <label htmlFor="images" className="block text-sm font-medium">
                      Product Images (Multiple)
                    </label>
                    <Input type="file" name="images" multiple onChange={(e) => handleImageSelect(e, 'product')} />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {existingImages.map((image, index) => (
                        <div key={index} className="relative">
                          <Image src={image.image} alt={`Existing image ${index + 1}`} width={100} height={100} className="object-cover rounded" />
                          <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-1 rounded-br">
                            {image.type}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <Image src={URL.createObjectURL(image.file)} alt={`Selected image ${index + 1}`} width={100} height={100} className="object-cover rounded" />
                          <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-1 rounded-br">
                            {image.type}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSelectedImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div key="coverimage" className="relative">
                    <label htmlFor="coverimage" className="block text-sm font-medium">
                      Cover Image
                    </label>
                    <Input type="file" name="coverimage" onChange={(e) => handleImageSelect(e, 'cover')} />
                  </div>

                  <div key="category_id" className="relative">
                    <label htmlFor="category_id" className="block text-sm font-medium">
                      Select Category
                    </label>
                    <Select name="category_id" defaultValue={currentProduct?.category_id || ''}>
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

                  <div key="subcategory_id" className="relative">
                    <label htmlFor="subcategory_id" className="block text-sm font-medium">
                      Select Subcategory
                    </label>
                    <Select name="subcategory_id" defaultValue={currentProduct?.subcategory_id || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories.map((subcategory) => (
                          <SelectItem key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {['isfeatured', 'istoprated', 'istopselling', 'isdiscounted'].map((field) => (
                    <div key={field} className="flex items-center">
                      <input
                        type="checkbox"
                        name={field}
                        id={field}
                        defaultChecked={currentProduct?.[field] || false}
                        className="mr-2"
                      />
                      <label htmlFor={field} className="text-sm font-medium">
                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')}
                      </label>
                    </div>
                  ))}

                  <div key="discount" className="relative">
                    <label htmlFor="discount" className="block text-sm font-medium">
                      Discount Percentage
                    </label>
                    <Input
                      type="number"
                      name="discount"
                      defaultValue={currentProduct?.discount || 0}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mr-4 bg-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600"
                    disabled={loadingAction === 'form'}
                  >
                    {loadingAction === 'form' ? (
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                    ) : null}
                    {currentProduct ? 'Update' : 'Add'} Product
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="line-clamp-1">{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    <TableCell>
                      {product.Category?.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2"><Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewProduct(product)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsModalOpen(true);
                          }}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={async () => {
                            try {
                              setLoadingAction(product.id);
                              await fetch(`/api/admin/productmanagement/${product.id}`, {
                                method: 'DELETE',
                              });
                              const updatedProducts = await fetchProducts();
                              setProducts(updatedProducts);
                              toast.success('Product deleted successfully');
                            } catch (err) {
                              toast.error(err.message);
                            } finally {
                              setLoadingAction(null);
                            }
                          }}
                          disabled={loadingAction === product.id}
                        >
                          {loadingAction === product.id ? (
                            <Loader className="animate-spin h-4 w-4" />
                          ) : (
                            <TrashIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <ProductDetailsDialog
        product={selectedProduct}
        isOpen={viewProductDialogOpen}
        onClose={() => setViewProductDialogOpen(false)}
      />
    </div>
  );
}

