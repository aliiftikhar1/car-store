"use client"

import { useState, useEffect } from "react"
import { Eye, Loader } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const fetchBiddings = async () => {
  const response = await fetch("/api/admin/biddingManagement")
  if (!response.ok) {
    throw new Error("Failed to fetch biddings")
  }
  const data = await response.json()
  console.log("Bidding Data", data.data)
  return data.data
}

export default function BiddingsTable() {
  const [biddings, setBiddings] = useState([])
  const [filteredBiddings, setFilteredBiddings] = useState([])
  const [filter, setFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])
  const [auctions, setAuctions] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [selectedAuction, setSelectedAuction] = useState("")

  const filterBiddings = (biddings, userId, auctionId, textFilter) => {
    let filtered = biddings

    if (userId && userId !== "0") {
      filtered = filtered.filter((bidding) => bidding.User.id.toString() === userId)
    }

    if (auctionId && auctionId !== "0") {
      filtered = filtered.filter((bidding) => bidding.Auction.id.toString() === auctionId)
    }

    if (textFilter) {
      const lowercasedFilter = textFilter.toLowerCase()
      filtered = filtered.filter(
        (bidding) =>
          bidding.User.name.toLowerCase().includes(lowercasedFilter) ||
          bidding.price.toString().includes(lowercasedFilter) ||
          bidding.CarSubmission.vehicleMake.toLowerCase().includes(lowercasedFilter) ||
          bidding.CarSubmission.vehicleModel.toLowerCase().includes(lowercasedFilter),
      )
    }

    setFilteredBiddings(filtered)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchBiddings()
        setBiddings(data)
        filterBiddings(data, selectedUser, selectedAuction, filter)

        // Extract unique users and auctions
        const uniqueUsers = Array.from(new Set(data.map((b) => b.User.id)))
          .map((id) => data.find((b) => b.User.id === id)?.User)
          .filter((user) => user !== undefined)

        const uniqueAuctions = Array.from(new Set(data.map((b) => b.Auction.id)))
          .map((id) => data.find((b) => b.Auction.id === id)?.Auction)
          .filter((auction) => auction !== undefined)

        setUsers(uniqueUsers)
        setAuctions(uniqueAuctions)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    filterBiddings(biddings, selectedUser, selectedAuction, filter)
  }, [selectedUser, selectedAuction, filter, biddings])

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    )
  if (error) return <div className="text-red-500">Error fetching data: {error}</div>

  return (
    <div className="space-y-4 p-2">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All Users</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedAuction} onValueChange={setSelectedAuction}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select Auction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All Auctions</SelectItem>
            {auctions.map((auction) => (
              <SelectItem key={auction.id} value={auction.id.toString()}>
                {new Date(auction.startDate).toLocaleDateString()} - {auction.location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Filter by user name, price, or car details"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-[300px]"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Car</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBiddings.map((bidding) => (
            <TableRow key={bidding.id}>
              <TableCell>{bidding.User.name}</TableCell>
              <TableCell>{`${bidding.CarSubmission.vehicleYear} ${bidding.CarSubmission.vehicleMake} ${bidding.CarSubmission.vehicleModel}`}</TableCell>
              <TableCell>
                {bidding.currency} {bidding.price.toLocaleString()}
              </TableCell>
              <TableCell>{new Date(bidding.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle>Bidding Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <h3 className="text-lg font-semibold">User Information</h3>
                        <p>Name: {bidding.User.name}</p>
                        <p>Email: {bidding.User.email}</p>
                        <p>Username: {bidding.User.username}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Auction Information</h3>
                        <p>Start Date: {new Date(bidding.Auction.startDate).toLocaleString()}</p>
                        <p>End Date: {new Date(bidding.Auction.endDate).toLocaleString()}</p>
                        <p>Location: {bidding.Auction.location}</p>
                        <p>Status: {bidding.Auction.status}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Car Information</h3>
                        <p>Make: {bidding.CarSubmission.vehicleMake}</p>
                        <p>Model: {bidding.CarSubmission.vehicleModel}</p>
                        <p>Year: {bidding.CarSubmission.vehicleYear}</p>
                        <h4 className="font-medium mt-2">Image:</h4>
                        {bidding.CarSubmission.SubmissionImages.find((img) => img.label === "horizontal") && (
                          <img
                            src={
                              bidding.CarSubmission.SubmissionImages.find((img) => img.label === "horizontal").data ||
                              "/placeholder.svg"
                            }
                            alt={`${bidding.CarSubmission.vehicleYear} ${bidding.CarSubmission.vehicleMake} ${bidding.CarSubmission.vehicleModel}`}
                            className="mt-2 max-w-full h-auto"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Bid Information</h3>
                        <p>
                          Price: {bidding.currency} {bidding.price.toLocaleString()}
                        </p>
                        <p>Created At: {new Date(bidding.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

