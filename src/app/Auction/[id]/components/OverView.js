
export default function OverviewSection({ data }) {
    return (
        <div className="space-y-8 ">
            {/* Added Services Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Added Services</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <h3 className="font-medium">Delivery Services</h3>
                        <a href="#" className="text-blue-600 hover:underline">
                            View options
                        </a>
                    </div>
                    <div>
                        <h3 className="font-medium">Vehicle inspections by NAS</h3>
                        <a href="#" className="text-blue-600 hover:underline">
                            Book an inspection
                        </a>
                    </div>
                    <div>
                        <h3 className="font-medium">Get a report on this car</h3>
                        <a href="#" className="text-blue-600 hover:underline">
                            Buy car history report for $25
                        </a>
                    </div>
                </div>
            </div>

            {/* Overview Section */}
            <div>
                <h2 className="text-lg font-bold text-blue-900 mb-4">OVERVIEW</h2>
                <div className="grid grid-cols-1 gap-px bg-gray-200">
                    <div className="grid grid-cols-[200px_1fr] bg-white">
                        <div className="p-4">Condition</div>
                        <div className="p-4">{data.CarSubmission.condition}</div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] bg-gray-50">
                        <div className="p-4">GST:</div>
                        <div className="p-4">Inclusive (GST Not Applicable on Item, See below note)</div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] bg-white">
                        <div className="p-4">Buyers premium</div>
                        <div className="p-4">
                            <span className="text-blue-600">$ 690</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] bg-gray-50">
                        <div className="p-4">Location</div>
                        <div className="p-4">{data.location}</div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] bg-white">
                        <div className="p-4">Category</div>
                        <div className="p-4">{data.CarSubmission.category}</div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] bg-gray-50">
                        <div className="p-4">Sales Support</div>
                        <div className="p-4">
                            <a
                                href="mailto:support@carbuydirect.com"
                                className="text-blue-600 hover:underline"
                            >
                                support@carbuydirect.com
                            </a>

                            {/* {" or (p) "} */}
                            {/* {data.salesSupport.phone} */}
                        </div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] bg-white">
                        <div className="p-4">Lot ID</div>
                        <div className="p-4">-</div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] bg-gray-50">
                        <div className="p-4">Part of Sale</div>
                        <div className="p-4">
                            <a href="#" className="text-blue-600 hover:underline">
                                -
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] bg-white">
                        <div className="p-4">Warranty</div>
                        <div className="p-4">-</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

