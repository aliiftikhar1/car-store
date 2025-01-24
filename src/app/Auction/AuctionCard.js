import { Star } from "lucide-react";
import Image from "next/image";

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
                    <div className="flex-grow">
                        {item.status === 'Coming-Soon' ? (
                            <p className="text-sm sm:text-base text-left text-gray-600">Coming Soon</p>
                        ) : item.status === 'Scheduled' ? (
                            <div className="text-left">
                                <p className="text-sm text-gray-600">Auction Begins</p>
                                <p className="text-base sm:text-lg font-semibold">
                                    {new Date(item.startDate).toLocaleDateString()}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Latest bid</p>
                                    <p className="text-sm sm:text-base md:text-lg font-bold">{item.latestBid}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs sm:text-sm text-gray-600">Time left</p>
                                    <p className="text-sm sm:text-base md:text-lg font-bold text-[#B1955A]">
                                        {item.timeLeft}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price and Location */}
                    <div className="space-y-1">
                        <p className="text-lg sm:text-xl font-bold text-red-500">
                            {item?.CarSubmission?.currency} {item?.CarSubmission?.price}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {item?.location}
                        </p>
                    </div>
                </div>
            </div>
        </a>
    );
}