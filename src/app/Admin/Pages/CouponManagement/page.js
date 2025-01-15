'use client';

import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { format, parseISO, formatISO } from 'date-fns';

// Fetch all coupons
const fetchCoupons = async () => {
  const response = await fetch('/api/admin/couponmanagement');
  if (!response.ok) {
    throw new Error('Failed to fetch coupons');
  }
  const data = await response.json();
  return data.data;
};

// Add a new coupon
const addCoupon = async (coupon) => {
  const response = await fetch('/api/admin/couponmanagement', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(coupon),
  });
  if (!response.ok) {
    throw new Error('Failed to add coupon');
  }
  return response.json();
};

// Update an existing coupon
const updateCoupon = async (coupon) => {
  const response = await fetch(`/api/admin/couponmanagement/${coupon.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(coupon),
  });
  if (!response.ok) {
    throw new Error('Failed to update coupon');
  }
  return response.json();
};

// Delete a coupon
const deleteCoupon = async (id) => {
  const response = await fetch(`/api/admin/couponmanagement/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete coupon');
  }
  return true;
};

export default function CouponManagement() {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(null);

  useEffect(() => {
    fetchCoupons()
      .then(setCoupons)
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setFilteredCoupons(
      coupons.filter(
        (coupon) =>
          coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [coupons, searchTerm]);

  const handleAddCoupon = () => {
    setCurrentCoupon(null);
    setIsModalOpen(true);
  };

  const handleUpdateCoupon = (coupon) => {
    setCurrentCoupon({
      ...coupon,
      expiry: format(parseISO(coupon.expiry), "yyyy-MM-dd'T'HH:mm"),
    });
    setIsModalOpen(true);
  };

  const handleDeleteCoupon = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setLoadingAction(id);
      try {
        await deleteCoupon(id);
        const updatedCoupons = await fetchCoupons();
        setCoupons(updatedCoupons);
        toast.success('Coupon deleted successfully');
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
    const couponData = Object.fromEntries(formData.entries());

    // Convert expiry date to ISO string
    if (couponData.expiry) {
      couponData.expiry = formatISO(new Date(couponData.expiry));
    }

    setLoadingAction('form');
    try {
      if (currentCoupon) {
        const updatedCoupon = await updateCoupon({ ...currentCoupon, ...couponData });
        toast.success('Coupon updated successfully');
      } else {
        const newCoupon = await addCoupon(couponData);
        toast.success('Coupon added successfully');
      }
      // Fetch updated coupon list
      const updatedCoupons = await fetchCoupons();
      setCoupons(updatedCoupons);
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
            placeholder="Search coupons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-auto"
          />
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddCoupon} className="bg-indigo-600">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Coupon
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{currentCoupon ? 'Update Coupon' : 'Add Coupon'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="">
                <div className='grid grid-cols-2 gap-4 mb-4'>
                  {['title', 'discount', 'code', 'expiry'].map((field) => (
                    <div key={field} className='relative'>
                      <label htmlFor={field} className="block text-sm font-medium">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <Input
                        type={field === 'expiry' ? 'datetime-local' : field === 'discount' ? 'number' : 'text'}
                        name={field}
                        defaultValue={currentCoupon?.[field] || ''}
                      />
                    </div>
                  ))}
                </div>
                <Button type="submit" className="w-full" disabled={loadingAction === 'form'}>
                  {loadingAction === 'form' && <Loader className="mr-2 animate-spin" />}
                  {currentCoupon ? 'Update' : 'Add'} Coupon
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
                  <TableHead>Title</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon, index) => (
                  <TableRow key={coupon.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{coupon.title}</TableCell>
                    <TableCell>{coupon.discount}%</TableCell>
                    <TableCell>{coupon.code}</TableCell>
                    <TableCell>{format(parseISO(coupon.expiry), 'PPpp')}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleUpdateCoupon(coupon)} variant="ghost">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteCoupon(coupon.id)}
                        variant="ghost"
                        className="text-red-600"
                        disabled={loadingAction === coupon.id}
                      >
                        {loadingAction === coupon.id ? (
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

