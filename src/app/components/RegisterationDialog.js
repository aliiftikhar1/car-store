"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Eye, EyeOff, Loader } from "lucide-react"
import { useDispatch } from "react-redux"
import { setUserDetails } from "@/store/UserSlice"

export function RegistrationDialog({ open, onClose, email }) {
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [password, setPassword] = useState("")
  const [loadingAction, setLoadingAction] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async () => {
    if (!password) {
      toast.error("Please fill in all fields")
      return
    }

    const payload = { email, name, address, phoneNo, password }

    try {
      setLoadingAction("register")
      const response = await fetch(`/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (result.success) {
        toast.success("User registered successfully")
        dispatch(setUserDetails(result.data));
        console.log('Data saved to Redux');
        onClose()
        window.location.replace('/');
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error submitting registration:", error)
      toast.error("An error occurred during registration")
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xs md:max-w-sm p-4">
        <DialogHeader>
          <DialogTitle className="text-2xl">Registration</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-xl">
          <Input type="email" value={email} disabled className="rounded-none p-4" placeholder="Email" />
          {/* <Input
            type="text"
            placeholder="Name"
            value={name}
            className="rounded-none p-4"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Address"
            value={address}
            className="rounded-none p-4"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            className="rounded-none p-4"
            onChange={(e) => setPhoneNo(e.target.value)}
          /> */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              className="rounded-none p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <Button
            className="w-full bg-black text-white rounded-none p-4"
            onClick={handleSubmit}
            disabled={loadingAction === "register"}
          >
            {loadingAction === "register" ? <Loader className="animate-spin" /> : "Register"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

