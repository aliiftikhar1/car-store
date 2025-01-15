import Image from "next/image";

export default function Gallery() {
    const images =['/images/image (1).jpg','/images/image (2).jpg','/images/image (3).jpg','/images/image (4).jpg','/images/image (5).jpg','/images/image (6).jpg','/images/image (7).jpg','/images/image (8).jpg','/images/image (9).jpg','/images/image (10).jpg',]
    return (
        <div className="px-20 flex h-screen w-full gap-4">
            <div className="w-3/4  ">
                <img src="/banners/2020 Aston Martin DBS Superleggera_banner.jpg" className="w-full h-full object-" />
            </div>
            <div className="w-1/4  grid grid-cols-2 grid-rows-4 overflow-hidden gap-4 ">
            {images.slice(0,8).map((item,index)=>{
                return(
                    <div className="aspect-square relative ">
                        <img src={item}className="w-full h-full object-cover"></img>
                        <div className={` ${index==7 ? 'flex': 'hidden'} text-white font-bold justify-center items-center absolute top-0 z-20 w-full h-full bg-black/50`}>
                        All Media 135
                        </div>
                        </div>
                )
            })}

            </div>

        </div>
    )
}