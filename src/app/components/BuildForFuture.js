// components/BuildForFuture.js

export default function BuildForFuture() {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:space-x-8">
          {/* Text Content */}
          <div className="md:w-1/2">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              In the digital universe, your website is not just a page; it is the pulse of your business. It’s where people first meet, and transactions happen. If your website looks old-fashioned and doesn’t work, it is time to change it. Let’s build, enhance your brand, and access your hidden potential with a website that is made for success.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Build for the Future</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              As your business grows, so should your website. By using the best in the current design and technology, we make websites that work both today and tomorrow. Be part of shaping a lively online space that grows alongside you.
            </p>
          </div>
  
          {/* Image Content */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="/threelaptop.png"
              alt="Responsive Web Design"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    );
  }
  