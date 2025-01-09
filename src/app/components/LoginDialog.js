"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { User } from 'lucide-react'

export function AuthDialogs() {
  const [open, setOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const toggleAuth = () => {
    setIsLogin(!isLogin)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-white hover:text-white/90">
          <p className="hidden md:flex">{isLogin ? "SignIn" : "Sign Up"}</p>
          <User className="flex md:hidden" />
        </button>
      </DialogTrigger>
      
      {isLogin ? (
        // Login Dialog Content
        <DialogContent className="max-w-sm p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Log In</DialogTitle>
            <DialogDescription className="text-center">
              Please Log in to watch, bid, comment or sell
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              id="email"
              placeholder="Email"
              type="email"
              className="col-span-3 px-4 py-6"
            />
            <div className="relative">
              <Input
                id="password"
                placeholder="Password"
                type="password"
                className="col-span-3 px-4 py-6"
              />
              <Button
                variant="link"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-sm"
                onClick={() => {}}
              >
                Forgot?
              </Button>
            </div>
            <Button className="w-full bg-[#B69C66] hover:bg-[#B69C66]/90 px-4 py-6">
              LOG IN
            </Button>
            <div className="text-center text-sm">
              {"Don't have an account? "}
              <Button variant="link" className="p-0" onClick={toggleAuth}>
                Sign up here
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full px-4 py-6" onClick={() => {}}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full px-4 py-6" onClick={() => {}}>
              <svg className="mr-2 h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
              </svg>
              Continue with Facebook
            </Button>
          </div>
        </DialogContent>
      ) : (
        // Sign Up Dialog Content
        <DialogContent className="max-w-sm p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Sign Up</DialogTitle>
            <DialogDescription className="text-center">
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={toggleAuth}>
                Log in here
              </Button>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button variant="outline" className="w-full px-4 py-6" onClick={() => {}}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full px-4 py-6" onClick={() => {}}>
              <svg className="mr-2 h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
              </svg>
              Continue with Facebook
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            <Input
              id="signup-email"
              placeholder="Email"
              type="email"
              className="col-span-3 px-4 py-6"
            />
            <Button className="w-full bg-black hover:bg-black/90 text-white px-4 py-6">
              CREATE ACCOUNT
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}

