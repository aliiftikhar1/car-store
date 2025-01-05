export default function Auction() {
    // List of auction items
    const auctionItems = [
        {
            id: 1,
            year: "1974",
            name: "Jensen",
            model: "Interceptor S Cabriolet - V8",
            location: "Maruassan, Occitanie, France",
            image: "/images/image (2).jpg",
            latestBid: "US$ 345",
            timeLeft: "4 days",
        },
        {
            id: 2,
            year: "2019",
            name: "Ferrari",
            model: "F8 Spider",
            location: "Rome, Italy",
            image: "/images/image (1).jpg",
            latestBid: "US$ 500",
            timeLeft: "2 days",
        },
        {
            id: 3,
            year: "2020",
            name: "Lamborghini",
            model: "Aventador SVJ",
            location: "Dubai, UAE",
            image: "/images/image (3).jpg",
            latestBid: "US$ 700",
            timeLeft: "1 day",
        },
        {
            id: 4,
            year: "1967",
            name: "Ford",
            model: "Mustang Shelby GT500",
            location: "Texas, USA",
            image: "/images/image (4).jpg",
            latestBid: "US$ 420",
            timeLeft: "5 days",
        },
        {
            id: 5,
            year: "2018",
            name: "Aston Martin",
            model: "DBS Superleggera",
            location: "London, UK",
            image: "/images/image (5).jpg",
            latestBid: "US$ 650",
            timeLeft: "3 days",
        },
        {
            id: 6,
            year: "2015",
            name: "Porsche",
            model: "911 Turbo S",
            location: "Berlin, Germany",
            image: "/images/image (6).jpg",
            latestBid: "US$ 800",
            timeLeft: "1 day",
        },
        {
            id: 7,
            year: "2021",
            name: "McLaren",
            model: "720S Spider",
            location: "Monaco",
            image: "/images/image (7).jpg",
            latestBid: "US$ 1,200",
            timeLeft: "1 day",
        },
        {
            id: 8,
            year: "2017",
            name: "Tesla",
            model: "Model S Plaid",
            location: "San Francisco, USA",
            image: "/images/image (8).jpg",
            latestBid: "US$ 600",
            timeLeft: "2 days",
        },
        {
            id: 9,
            year: "2022",
            name: "Rivian",
            model: "R1T Adventure",
            location: "Seattle, USA",
            image: "/images/image (9).jpg",
            latestBid: "US$ 550",
            timeLeft: "4 days",
        },
        {
            id: 10,
            year: "2023",
            name: "Lucid",
            model: "Air Dream Edition",
            location: "California, USA",
            image: "/images/image (10).jpg",
            latestBid: "US$ 900",
            timeLeft: "1 day",
        },
        {
            id: 11,
            year: "1989",
            name: "BMW",
            model: "E30 M3",
            location: "Munich, Germany",
            image: "/images/image (11).jpg",
            latestBid: "US$ 300",
            timeLeft: "6 days",
        },
        {
            id: 12,
            year: "1995",
            name: "Toyota",
            model: "Supra MK4",
            location: "Tokyo, Japan",
            image: "/images/image (12).jpg",
            latestBid: "US$ 400",
            timeLeft: "3 days",
        },
        {
            id: 13,
            year: "1992",
            name: "Mazda",
            model: "RX-7 FD",
            location: "Osaka, Japan",
            image: "/images/image (13).jpg",
            latestBid: "US$ 350",
            timeLeft: "4 days",
        },
        {
            id: 14,
            year: "2020",
            name: "Chevrolet",
            model: "Corvette C8",
            location: "Detroit, USA",
            image: "/images/image (14).jpg",
            latestBid: "US$ 700",
            timeLeft: "2 days",
        },
        {
            id: 15,
            year: "2016",
            name: "Mercedes-Benz",
            model: "AMG GT R",
            location: "Stuttgart, Germany",
            image: "/images/image (15).jpg",
            latestBid: "US$ 750",
            timeLeft: "1 day",
        },
    ];


    return (
        <div className="px-2 md:px-20">
            <div className="py-2 flex md:flex-col flex-row items-center space-x-4">
                <h2 className="uppercase font-extrabold text-base md:text-xl">Auction</h2>
                <p className="text-sm md:text-base">Country: ALL</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 ">
                {auctionItems.map((item) => (
                    <div key={item.id} className="md:border group py-2  md:p-4 cursor-pointer">
                        <div className="bg-white h-[90vh] relative shadow-lg overflow-hidden ">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-[1.07] transform transition-all duration-500"
                            />
                            <div className="w-full h-full bg-black/20 absolute top-0"></div>
                            <div className="p-2 md:p-5 absolute z-10 bottom-0 text-white w-full">
                                <div className="flex justify-between text-base md:text-xl">
                                    <div>
                                        <p>{item.year}</p>
                                        <h3 className="font-extrabold text-2xl">{item.name}</h3>
                                        <p>{item.model}</p>
                                    </div>
                                    <div>
                                        <p className=" text-right  text-base md:text-lg font-[300]">
                                            {item.location.split(",").map((part, index) => (
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
                    </div>
                ))}
            </div>
        </div>
    );
}
