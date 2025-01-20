"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RegistrationDialog({ open, onClose, email }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setpassword] = useState('')

  const handleSubmit = async () => {
    const payload = { email, name, location, phoneNo, password };

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {

        toast.success("User registered Successfully")
        onClose(); 
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error(error)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-xs md:max-w-sm p-4 '>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Registration</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-xl">
          <Input type="email" value={email} disabled 
            className='rounded-none p-4 ' placeholder="Email" />
          <Input
            type="text"
            placeholder="Name"
            value={name}
            className='rounded-none p-4'
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            className='rounded-none p-4'
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            className='rounded-none p-4'
            onChange={(e) => setPhoneNo(e.target.value)}
          />
           <Input
            type="text"
            placeholder="Password"
            value={password}
            className='rounded-none p-4'
            onChange={(e) => setpassword(e.target.value)}
          />
          <Button className="w-full bg-black text-white rounded-none p-4" onClick={handleSubmit}>
            Register
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
