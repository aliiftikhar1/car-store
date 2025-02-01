"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Bell, Heart, HelpCircle, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OverviewSection from "./OverView"
import TabsSection from "./TabsSection"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import BidRegistrationForm from "./BidRegisterationDialog"
import { useSelector } from "react-redux"
import { Loader } from "lucide-react"
import TimerComponent from "@/app/Car/[id]/components/CountDownTimer"


export default function HeroSection({ data, triggerfetch }) {
  const images = data.CarSubmission.SubmissionImages || []

  const [currentImage, setCurrentImage] = useState(0)
  const [visibleThumbnails, setVisibleThumbnails] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentBid, setCurrentBid] = useState(parseInt(data?.Bids[0]?.price) || parseInt(data?.CarSubmission?.price) || 0); // Current bid
  const [bidAmount, setBidAmount] = useState(parseInt(currentBid) + 100); // Default bid value
  const [bids, setBids] = useState(data?.Bids?.length || 0); // Total bids
  const userid = useSelector((state) => state.CarUser.userDetails?.id);
  const [loading, setLoading] = useState(false);
  const [handler, setHandler] = useState(false);

  useEffect(() => {
    if (userid) {

      const fetchUserDetails = async () => {
        setLoading(true)
        try {
          const response = await fetch(`/api/user/getUserDetails/${userid}`);
          const result = await response.json();
          setUser(result.user);
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.error("Error fetching user details:", error);
        }

      };

      fetchUserDetails();
    }
  }, [userid, handler]);

  const isEligible = user?.cardName && user?.cardNumber && user?.cardExpiry && user?.cardCvc;

  const handlePlaceBid = () => {
    if (!user) {
      alert("Please login to place a bid.");
    } else if (!isEligible) {
      setIsDialogOpen(true);
    } else {
      setIsBidDialogOpen(true);
    }
  };

  const confirmBid = async () => {
    if (bidAmount < currentBid + 100) {
      alert(`Bid amount must be at least $${currentBid + 100}.`);
      return;
    }

    setLoading(true); // Start loading state
    try {
      const response = await fetch(`/api/user/bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bidAmount: bidAmount,
          currency: data.CarSubmission.currency,
          auctionId: data.id,
          userId: userid,
          carId: data.CarSubmission.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to place bid. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Bid placed successfully:", result);

      setCurrentBid(bidAmount);
      setBidAmount(bidAmount + 100);
      setBids((prevBids) => prevBids + 1);
      triggerfetch((prev) => !prev);
      // alert("Bid placed successfully!");
      setIsBidDialogOpen(false);
    } catch (error) {
      console.error("Error occurred while placing bid:", error);
      alert("An error occurred while placing your bid. Please try again.");
    } finally {
      setLoading(false); // End loading state
    }
  };


  useEffect(() => {
    // Initialize `currentImage` with the index of the image whose label is "horizontal"
    const horizontalImageIndex = images.findIndex((image) => image.label === "horizontal")
    if (horizontalImageIndex !== -1) {
      setCurrentImage(horizontalImageIndex)
    }
  }, [images])

  const updateVisibleThumbnails = (currentIndex) => {
    const totalImages = images.length
    if (totalImages <= 6) {
      setVisibleThumbnails(Array.from({ length: totalImages }, (_, i) => i))
    } else {
      const start = Math.max(0, Math.min(currentIndex - 3, totalImages - 6))
      setVisibleThumbnails(Array.from({ length: 6 }, (_, i) => start + i))
    }
  }

  useEffect(() => {
    updateVisibleThumbnails(currentImage)
  }, [currentImage, images.length])

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-36 flex flex-col gap-8 md:py-8">
      {/* Left side - Image slider */}
      <div className="flex flex-col md:flex-row gap-8">
      <div className="space-y-4 md:min-w-3/5">
        <div className="relative md:h-[75vh] aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
          {images.length > 0 ? (
            <Image
              src={images[currentImage]?.data || "/placeholder.svg"}
              alt={`${data.CarSubmission.vehicleMake} ${data.CarSubmission.vehicleModel}`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image available</div>
          )}
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 rounded text-sm">
            {currentImage + 1} of {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="hidden md:flex gap-2 pb-2">
          {visibleThumbnails.slice().reverse().map((index) => (
            <button
              key={images[index].id}
              onClick={() => setCurrentImage(index)}
              className={`relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden ${currentImage === index ? "ring-2 ring-red-500 shadow-[0_0_10px_red]" : ""
                }`}
            >
              <Image
                src={images[index].data || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
        
      </div>

      

      {/* Right side - Details */}
      <div className="space-y-3 md:w-2/5">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold">
            {data.CarSubmission.vehicleYear} {data.CarSubmission.vehicleMake} {data.CarSubmission.vehicleModel} 
            <br />

          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-600">
              {data.status === 'Coming-Soon' ? (
                <h2 className="text-xl  font-[200] tracking-tight">Comming Soon</h2>
                // <p className="text-sm sm:text-base text-left text-gray-600">Coming Soon</p>
              ) : data.status === 'Scheduled' ? (
                <div className="text-left flex gap-4">
                  <p className="text-xl  font-[200] tracking-tight">Auction Begins On</p>
                  <TimerComponent className="gap-1 text-lg" endDate={data.startDate} />
                </div>
              ) : data.status === 'Ended' ? (
                <div className="text-left flex gap-4">
                  <p className="text-xl  font-[200] tracking-tight">Auction Ended</p>
                  {/* <p className="text-sm sm:text-base text-left text-gray-600">Sold Out</p> */}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <TimerComponent className="gap-1" endDate={data.endDate} />
                    <button>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </button>
                  </span>
                </div>
              )}

            </div>
            {(data.status==='Scheduled'||data.status==='Live') && <Button variant="ghost" className="text-red-600 flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Remind me
            </Button>}
          
          </div>

          <div className="space-y-2">
            {data.status === 'Live' &&
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  Current Bid
                  <span className="text-blue-600">{data?.Bids.length}</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <span>No reserve</span>
                  <Info className="h-4 w-4" />
                </div>
              </div>
            }

            <div className="text-2xl md:text-4xl font-bold">{data?.CarSubmission.currency} {data?.Bids.length > 0 ? parseInt(data.Bids[0].price) : parseInt(data?.CarSubmission?.price)}</div>

            <div className="text-sm text-gray-600">
              <span className="text-blue-600">$690</span> buyers premium not included in the price. Excludes any Debit
              Card / Credit Card / PayPal surcharges that will apply.
            </div>
          </div>

          {data.status === 'Live' ? <>
            <div className="space-y-3">
              <div className="font-medium">Bid {data?.CarSubmission.currency} {parseInt(data?.Bids.length > 0) ? parseInt(data.Bids[0].price) + 100 : parseInt(data?.CarSubmission?.price) + 100} or more</div>
              <div className="flex gap-2">
                <Input type="text" value={parseInt(data?.Bids[0]?.price) + 100 || parseInt(data.CarSubmission.price) + 100} className="text-lg" />
                <Tabs defaultValue="autobid" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="autobid" className="text-sm">
                      Autobid
                    </TabsTrigger>
                    <TabsTrigger value="standard" className="text-sm">
                      Standard
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button size="icon" variant="ghost">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="solid"
                size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={handlePlaceBid}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader className="animate-spin" size={20} />
                    Loading...
                  </span>
                ) : (
                  "Place A Bid"
                )}
              </Button>

              <Button size="lg" variant="outline" className="w-full bg-gray-50">
                <Heart className="h-4 w-4 mr-2" />
                Watch
              </Button>
            </div>
          </>
            : <>{data.status === 'Ended' ? <p className="text-3xl text-red-500 text-left md:text-center font-[800] tracking-tight">Sold Out</p> : ""}</>
          }
        </div>


        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <span className="text-white text-xl">VA</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">VIC Auto</h3>
              <p className="text-gray-600 text-sm">Enquires about the item</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Button variant="outline" className="flex-1 text-blue-600 border-blue-600">
              <span className="mr-2">📞</span> Call
            </Button>
            <Button variant="link" className="flex-1 text-blue-600">
              Send an email
            </Button>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <BidRegistrationForm setHandler={setHandler} setIsDialogOpen={setIsDialogOpen} />
          </DialogContent>
        </Dialog>

        <Dialog open={isBidDialogOpen} onOpenChange={setIsBidDialogOpen}>
          <DialogContent className="max-w-4xl">
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">Place Your Bid</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Current Bid</p>
                  <p className="text-2xl font-bold">${currentBid}</p>
                  <p className="text-sm text-gray-500">{bids} bids</p>
                </div>
                <div>
                  <p className="text-gray-600">
                    Your Bid (Minimum: ${currentBid + 100})
                  </p>
                  <input
                    type="number"
                    className="w-32 p-2 border border-gray-300 rounded"
                    value={bidAmount}
                    min={currentBid + 100}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  className="px-6 py-2 text-lg bg-red-600 text-white hover:bg-red-700 rounded"
                  onClick={confirmBid}
                >
                  Confirm Bid
                </Button>
                <Button
                  variant="ghost"
                  className="px-6 py-2 text-lg border border-gray-300 rounded hover:bg-gray-100"
                  onClick={() => setIsBidDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      </div>

      <div className="md:w-3/5">
      <div>
          <OverviewSection data={data} />
        </div>
        <div>
          <TabsSection data={data} />
        </div>
      </div>
    </div>
  )
}

