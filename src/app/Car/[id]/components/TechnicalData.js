// components/TechnicalData.tsx

const TechnicalData = () => {
    return (
      <div className="bg-white shadow-sm rounded-md w-full">
        <h2 className="text-3xl font-bold mb-4">TECHNICAL DATA</h2>
  
        {/* Chassis Row */}
        <div className="flex items-center justify-between border-b pb-4 mb-4 ">
          <div>
            <span className="text-xl font-medium text-gray-600">Chassis No:</span>{" "}
            <span className="font-bold text-black">SCFRMHAV9LGR01434</span>
          </div>
          {/* <img
            src="/carfax-logo.png"
            alt="Carfax Logo"
            className="w-16 h-5 object-contain"
          /> */}
        </div>
  
        {/* Data Grid */}
        <div className="grid grid-cols-3 gap-y-20 py-10 text-xl">
          <div>
            <span className="text-gray-600 font-medium">Seller:</span>{" "}
            <span className="text-gold-500 font-bold">Jlane36</span>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Seller Type:</span>{" "}
            <span className="font-medium">Private Party</span>
          </div>
  
          <div>
            <span className="text-gray-600 font-medium">Interior:</span>{" "}
            <span className="font-bold">Black / Orange</span>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Exterior:</span>{" "}
            <span className="font-bold">Cosmos Orange</span>
          </div>
  
          <div>
            <span className="text-gray-600 font-medium">Mileage:</span>{" "}
            <span className="font-bold">10,800 Miles</span>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Location:</span>{" "}
            <span className="font-bold">Dallas, Texas, USA</span>
          </div>
  
          <div>
            <span className="text-gray-600 font-medium">Spec:</span>{" "}
            <span className="font-bold">US</span>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Drive Orientation:</span>{" "}
            <span className="font-bold">Left</span>
          </div>
  
          <div>
            <span className="text-gray-600 font-medium">Lot#:</span>{" "}
            <span className="font-bold">230</span>
          </div>
          <div>
            <span className="text-gray-600 font-medium">
              Vehicle Make / Model:
            </span>{" "}
            <span className="font-bold">Aston Martin DBS Superleggera</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default TechnicalData;
  