// components/AboutSection.js

export default function AboutSection() {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto space-y-12">
          {/* First Block */}
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="md:w-1/2">
              <p className="text-lg text-gray-800 leading-relaxed">
                We’re a digital agency with global reach. We help brands build personal relationships with their customers in today’s digital landscape. Most of our clients are still with us today. The secret to our success is bringing the personal to digital.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed mt-4">
                We’re only as great as our clients say we are. And in this regard, the honor we’ve received so far gives us the confidence to say yes: it’s worth it.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed mt-4">
                All the hard work, all the time spent exploring code, and dealing with hundreds of design iterations for every project.
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src="/aboutus1.png"
                alt="Teamwork"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
  
          {/* Second Block */}
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="md:w-1/2 mt-8 md:mt-0 order-2 md:order-1">
              <img
                src="/aboutus2.png"
                alt="Working"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Work Is Our Passion</h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                We’re a digital agency with global reach. We help brands build personal relationships with their customers in today’s digital landscape. Most of our clients are still with us today. The secret to our success is bringing the personal to digital.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed mt-4">
                We’re only as great as our clients say we are. And in this regard, the honor we’ve received so far gives us the confidence to say yes: it’s worth it.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed mt-4">
                All the hard work, all the time spent exploring code, and dealing with hundreds of design iterations for every project.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  