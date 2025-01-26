import { Star } from "lucide-react";
import Image from "next/image";
import TimerComponent from "../Car/[id]/components/CountDownTimer";

export default function AuctionCard({ item, index }) {
    return (
        <a href={`/Auction/${item.id}`} key={index} className="block w-full h-full group border rounded-lg transition-transform duration-300 ">
            <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] overflow-hidden">
                    <Image
                        fill
                        src={
                            item?.CarSubmission?.SubmissionImages?.find(
                                (image) => image.label === "portrait"
                            )?.data || "/placeholder.jpg"
                        }
                        alt={item.name}
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 4} // Prioritize loading for first 4 items
                    />
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-grow py-4 px-2">
                    {/* Vehicle Title */}
                    <div className="text-left">
                        <h2 className="text-base sm:text-lg md:text-lg font-bold line-clamp-2">
                            {item?.CarSubmission?.vehicleYear}{' '}
                            {item?.CarSubmission?.vehicleMake}{' '}
                            {item?.CarSubmission?.vehicleModel}
                        </h2>
                    </div>

                    {/* Status Section */}
                    <div className="flex-grow flex justify-center items-center">
                        {item.status === 'Coming-Soon' ? (
                            <h2 className="text-xl  font-[200] tracking-tight">Comming Soon</h2>
                            // <p className="text-sm sm:text-base text-left text-gray-600">Coming Soon</p>
                        ) : item.status === 'Scheduled' ? (
                            <div className="text-left flex gap-4">
                                <p className="text-xl  font-[200] tracking-tight">Auction Begins In</p>
                                <TimerComponent className="gap-1 text-lg" endDate={item.startDate} />
                            </div>
                        ) : item.status === 'Ended' ? (
                            <div className="text-left flex gap-4">
                                <p className="text-xl  font-[200] tracking-tight">Auction Ended</p>
                                {/* <p className="text-sm sm:text-base text-left text-gray-600">Sold Out</p> */}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Latest bid</p>
                                    <p className="text-lg sm:text-xl font-bold text-red-500">
                                    {item?.Bids.length>0?(item?.Bids[0]?.price+' '+ item.Bids[0]?.currency) : (item.CarSubmission.currency +' '+ item.CarSubmission.price)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs sm:text-sm text-gray-600">Time left</p>
                                    <TimerComponent className="gap-1" endDate={item.endDate} />
                                    {/* <p className="text-sm sm:text-base md:text-lg font-bold text-[#B1955A]">
                                        {item.timeLeft}
                                    </p> */}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price and Location */}
                    <div className="space-y-1">

                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {item?.location}
                        </p>
                    </div>
                </div>
            </div>
        </a>
    );
}