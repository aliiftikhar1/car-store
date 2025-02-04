'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../Actions";
import { toast } from "sonner";

export default function MyAccountSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [newpassword, setnewpassword] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    id: "",
  });

  const dispatch = useDispatch();
  const data = useSelector((state) => state.CarUser.userDetails);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        phoneNo: data.phoneNo || "",
        email: data.email || "",
        password: data.password || "", // Adjust this field based on actual data
        id: data.id || "",
      });
      setPhoneNumber(data.phoneNo || "");
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const updatedData = {
      ...formData,
      password: newpassword,
      phoneNo: `${phoneNumber}`, // Combine country code and phone number
    };

    try {
      const response = await updateUserDetails(updatedData, dispatch);
      console.log("Profile updated successfully:", response);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="w-full mt-8">
      <h2 className="text-3xl font-semibold mb-2">
        My <span className="text-[#B08968]">Account</span>
      </h2>
      <p className="text-muted-foreground mb-8">Manage your account from here</p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="Name" className="text-sm font-medium">
              Full Name (optional)
            </label>
            <Input
              id="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone number
            </label>
            <div className="flex gap-2">
              <Input
                id="phone"
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div className="flex max-w-[600px] gap-2">
            <Input
              id="email"
              type="email"
              disabled
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {/* <Button variant="ghost" className="shrink-0">
              Verify
            </Button> */}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="flex max-w-[600px] gap-2">
            <Input
              id="password"
              type="password"
              // value={formData.password}
              onChange={(e) =>
                setnewpassword( e.target.value )
              }
            />
            <Button variant="ghost" className="shrink-0">
              Change
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="bg-muted/60 hover:bg-muted"
        >
          Save changes
        </Button>
      </form>
    </div>
  );
}
