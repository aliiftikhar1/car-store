'use client';

import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import 'react-toastify/dist/ReactToastify.css';

// Fetch all charges
const fetchCharges = async () => {
  const response = await fetch('/api/admin/chargesmanagement');
  if (!response.ok) {
    throw new Error('Failed to fetch charges');
  }
  const data = await response.json();
  return data.data;
};

// Update an existing charge
const updateCharges = async (charges) => {
  const response = await fetch(`/api/admin/chargesmanagement/${charges.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(charges),
  });
  if (!response.ok) {
    throw new Error('Failed to update charges');
  }
  return response.json();
};

export default function ChargesManagement() {
  const [currentCharges, setCurrentCharges] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(null);

  // Fetch and load the first record
  useEffect(() => {
    fetchCharges()
      .then((charges) => {
        if (charges.length > 0) {
          setCurrentCharges(charges[0]); // Set the first record as the current charge
        } else {
          toast.error('No charges available to display.');
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    setLoadingAction('form');
    try {
      await updateCharges({ ...currentCharges, ...updatedData });
      toast.success('Charges updated successfully');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-6 flex flex-col justify-center items-center w-full h-[90vh]">
        {isLoading ? (
          <div className="flex justify-center">
            <Loader className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="w-[30vw] mx-auto">
            <h1 className='text-2xl font-bold text-center mb-4'>Charges Management</h1>
            {currentCharges ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {['tax', 'delivery_charges'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <Input
                      type="number"
                      name={field}
                      defaultValue={currentCharges[field]}
                      required
                    />
                  </div>
                ))}
                <Button type="submit" className="w-full" disabled={loadingAction === 'form'}>
                  {loadingAction === 'form' && <Loader className="mr-2 animate-spin" />}
                  Update Charges
                </Button>
              </form>
            ) : (
              <p className="text-center">No charges available to update.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
