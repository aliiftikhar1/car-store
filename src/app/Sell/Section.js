import Link from "next/link";

export default function HowItWorksSection() {
  return (
    <section className="md:h-screen flex justify-center items-center px-6 md:px-36 bg-white mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Video Section */}
        <div className="flex justify-center w-full h-[35vh] md:h-full">
          <div className="bg-gray-200 w-full h-full p-4 rounded-lg">
            <iframe
              src="https://www.youtube.com/embed/l11HrVDPi00"
              title="CarBuyDirect - The Global Premium Car Auction Platform"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* How It Works Content */}
        <div className="space-y-4 md:space-y-6 w-full">
          <h2 className="text-4xl font-[100] text-center text-gray-800">
            How <span className="text-yellow-600">it Works</span>
          </h2>
          <p className="text-gray-600 text-center">
            Our process is simple, with guidance and expert advice available to you every step of the way.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                1. Submit for review
              </h3>
              <p className="text-gray-600">
                Submit your car for a specialist to review. Once your car is accepted for auction, we’ll work together to finalize a market-appropriate value.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                2. Getting ready for auction
              </h3>
              <p className="text-gray-600">
                We will start curating your listing, which includes writing the listing and dispatching professional photography services.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                3. Promote and go live
              </h3>
              <p className="text-gray-600">
                Once you have approved the details of your listing, we set the go-live date together and start promoting your vehicle to our unmatched global audience.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">4. SOLD!</h3>
              <p className="text-gray-600">
                Once your car is sold, we will connect you with the winning bidder so you can complete the transaction. We will guide you through this process.
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
          <Link href="/Sell/Form" className="bg-yellow-600 text-white px-8 py-4 w-[250px] mdw-[300px] mx-auto font-semibold">
            SUBMIT YOUR CAR
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
