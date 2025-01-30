import { Star } from "lucide-react";
import Image from "next/image";
import TimerComponent from "../Car/[id]/components/CountDownTimer";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function AuctionCard({ item, index ,watchdata,OnWatch, setloadingAction}) {
    const userid= useSelector((state) => state.CarUser.userDetails?.id);
    function handleWatch() {
        if(!userid){
            toast.message("Login to watch auction!!")
        }
        fetch(`/api/user/watch`, {
            method: "POST",
            body: JSON.stringify({
                auctionId: item.id,
                userId: userid,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                setloadingAction('watch')
                OnWatch();
                // setloadingAction('default')
                console.log("Success");
            } else {
                console.log("Failed");
            }
        });
    }
    return (
        <div
            key={index}
            className="block w-full h-full relative  border rounded-lg transition-transform duration-300"
        >
            {watchdata.find((watch) => (watch.auctionId === item.id&&watch.userId===userid)) ? (
                 <div onClick={handleWatch} className="z-10 cursor-pointer absolute top-2 right-2 group bg-black text-white gap-1 text-lg rounded-full flex px-2 py-1">
                    {/* <div className="size-5 group-hover:animate-ping bg-white rounded-full absolute"></div> */}
                    <Star
                     className="text-white transition-all group-hover:animate-ping absolute duration-300 fill-white group-hover:text-white"
                 />
                 <Star
                     className="text-white transition-all duration-300 fill-white group-hover:text-white"
                 />
                 {item?.Watching?.length}
             </div>):( <div onClick={handleWatch} className="z-10 cursor-pointer absolute top-2 right-2 group bg-black text-white gap-1 text-lg rounded-full flex px-2 py-1">
                <Star
                    className="text-white transition-all duration-300 group-hover:fill-white group-hover:text-white"
                />
                {item?.Watching?.length}
            </div>)}
           

            <a href={`/Auction/${item.id}`} className="flex group flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden">
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
                        {item.status === "Coming-Soon" ? (
                            <h2 className="text-xl font-[200] tracking-tight">Comming Soon</h2>
                        ) : item.status === "Scheduled" ? (
                            <div className="text-left flex gap-4">
                                <p className="text-xl font-[200] tracking-tight">
                                    Auction Begins In
                                </p>
                                <TimerComponent
                                    className="gap-1 text-lg"
                                    endDate={item.startDate}
                                />
                            </div>
                        ) : item.status === "Ended" ? (
                            <div className="text-left flex gap-4">
                                <p className="text-xl font-[200] tracking-tight">Auction Ended</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Latest bid</p>
                                    <p className="text-lg sm:text-xl font-bold text-red-500">
                                        {item?.Bids.length > 0
                                            ? item?.Bids[0]?.price +
                                              " " +
                                              item.Bids[0]?.currency
                                            : item.CarSubmission.currency +
                                              " " +
                                              item.CarSubmission.price}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs sm:text-sm text-gray-600">Time left</p>
                                    <TimerComponent
                                        className="gap-1"
                                        endDate={item.endDate}
                                    />
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
            </a>
        </div>
    );
}
