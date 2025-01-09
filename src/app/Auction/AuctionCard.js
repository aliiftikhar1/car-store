import { Star } from "lucide-react";

export default function AuctionCard({ item, index }) {
    return (
        <div key={index} className="md:border group py-2  md:p-4 cursor-pointer">
            <div className="bg-white h-[90vh] relative shadow-lg overflow-hidden ">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-[1.07] transform transition-all duration-500"
                />
                <div className="bg-black absolute flex rounded-full text-white justify-center items-center gap-2  top-2 right-2 px-4 py-2"><Star className="text-white size-5 fill-transparent hover:fill-white" /> 423</div>
                <div className="w-full h-full bg-black/20 absolute top-0"> </div>
                <div className="p-2 md:p-5 absolute z-10 bottom-0 text-white w-full">
                    <div className="flex justify-between text-base md:text-xl">
                        <div>
                            <p>{item.year}</p>
                            <h3 className="font-extrabold text-2xl">{item.name}</h3>
                            <p>{item.model}</p>
                        </div>
                        <div>
                            <p className=" text-right  text-base md:text-lg font-[300]">
                                {item.location?.split(",").map((part, index) => (
                                    <span key={index}>
                                        {part}
                                        {index < item.location.split(",").length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {item.status === 'comming-soon' ?
                <div className="mt-4 flex items-center justify-center px-1">
                    <h2 className="text-2xl  font-[100]">Comming Soon</h2>
                </div> :
                <>
                    {item.status === 'waiting' ?
                        <div className="mt-4 flex items-center justify-center px-1">
                            <h2 className="text-2xl text-center font-[100]">Auction Begins at: <strong>{item.date}</strong></h2>
                        </div>
                        :
                        <div className="mt-4 flex items-center justify-between px-1">
                            <div>
                                <div className="text-sm text-muted-foreground">Latest bid</div>
                                <div className="text-xl font-bold">{item.latestBid}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-muted-foreground">Time left</div>
                                <div className="text-xl font-bold text-[#B1955A]">{item.timeLeft}</div>
                            </div>
                        </div>
                    }
                </>

            }
        </div>
    )
}