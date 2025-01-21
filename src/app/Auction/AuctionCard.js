import { Star } from "lucide-react";
import Image from "next/image";

// export default function AuctionCard({ item, index }) {
//     return (
//         <a href={`/Car/${item.id}`} key={index} className="md:border group py-2  md:p-4 cursor-pointer">
//             <div className="bg-white h-[60vh] md:h-[90%] relative shadow-lg overflow-hidden ">
//                 <img
//                   src={
//                     item?.CarSubmission?.SubmissionImages?.find(
//                       (image) => image.label === "portrait"
//                     )?.data || "/placeholder.jpg"
//                   }
                  
//                     alt={item.name}
//                     className="w-full h-full object-cover group-hover:scale-[1.07] transform transition-all duration-500"
//                 />
//                 <div className="bg-black absolute flex rounded-full text-white justify-center items-center gap-2  top-2 right-2 px-4 py-2"><Star className="text-white size-5 fill-transparent hover:fill-white" /> 423</div>
//                 <div className="w-full h-full bg-black/20 absolute top-0"> </div>
//                 <div className="p-2 md:p-5 absolute z-10 bottom-0 text-white w-full">
//                     <div className="flex justify-between text-base font-[300] md:text-lg">
//                         <div className="">
//                             <p>{item?.CarSubmission?.vehicleYear}</p>
//                             <h3 className="font-extrabold text-xl">{item?.CarSubmission?.vehicleMake}</h3>
//                             <p>{item?.CarSubmission?.vehicleModel}</p>
//                         </div>
//                         <div className="flex flex-col justify-end">
//                             <p className=" text-right  text-base md:text-lg font-[300]">
//                                 {item.location?.split(",").map((part, index) => (
//                                     <span key={index}>
//                                         {part}
//                                         {index < item.location.split(",").length - 1 && <br />}
//                                     </span>
//                                 ))}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {item.status === 'Coming-Soon' ?
//                 <div className="mt-4 flex items-center justify-center px-1">
//                     <h2 className="text-2xl  font-[100]">Comming Soon</h2>
//                 </div> :
//                 <>
//                     {item.status === 'Scheduled' ?
//                         <div className="mt-4 flex items-center justify-center px-1">
//                             <h2 className="text-2xl text-center font-[100]">Auction Begins at: <strong>{new Date(item.startDate).toLocaleDateString()}</strong></h2>
//                         </div>
//                         :
//                         <div className="mt-4 flex items-center justify-between px-1">
//                             <div>
//                                 <div className="text-sm text-muted-foreground">Latest bid</div>
//                                 <div className="text-xl font-bold">{item.latestBid}</div>
//                             </div>
//                             <div className="text-right">
//                                 <div className="text-sm text-muted-foreground">Time left</div>
//                                 <div className="text-xl font-bold text-[#B1955A]">{item.timeLeft}</div>
//                             </div>
//                         </div>
//                     }
//                 </>

//             }
//         </a>
//     )
// }


export default function AuctionCard({item,index}){
    return(
        <a href={`/Car/${item.id}`} key={index} className="md:border h-[70%] group py-2  md:p-4 cursor-pointer">
        <div className="bg-white h-[60vh] md:h-[70%] relative  overflow-hidden ">
            <Image
               width={200}
               height={200}
            //    className="w-full h-full object-cover"
              src={
                item?.CarSubmission?.SubmissionImages?.find(
                  (image) => image.label === "portrait"
                )?.data || "/placeholder.jpg"
              }
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-[1.07] transform transition-all duration-500"
            />
            {/* <div className="bg-black absolute flex rounded-full text-white justify-center items-center gap-2  top-2 right-2 px-4 py-2"><Star className="text-white size-5 fill-transparent hover:fill-white" /> 423</div>
            <div className="w-full h-full bg-black/20 absolute top-0"> </div> */}
            
        </div>
       
                <div className="flex justify-between text-base font-[300] md:text-base">
                    <div className="">
                        <p>{item?.CarSubmission?.vehicleYear}</p>
                        <h3 className="font-extrabold text-xl">{item?.CarSubmission?.vehicleMake}</h3>
                        <p>{item?.CarSubmission?.vehicleModel}</p>
                    </div>
                    <div className="flex flex-col justify-end">
                        <p className=" text-right  text-base md:text-base font-[300]">
                            {item.location?.split(",").map((part, index) => (
                                <span key={index}>
                                    {part}
                                    {index < item.location.split(",").length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
         
        {item.status === 'Coming-Soon' ?
            <div className="mt-4 flex items-center justify-center px-1">
                <h2 className="text-xl  font-[200]">Comming Soon</h2>
            </div> :
            <>
                {item.status === 'Scheduled' ?
                    <div className="mt-4 flex items-center justify-center px-1">
                        <h2 className="text-2xl text-center font-[100]">Auction Begins at: <strong>{new Date(item.startDate).toLocaleDateString()}</strong></h2>
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
    </a>

    )
}