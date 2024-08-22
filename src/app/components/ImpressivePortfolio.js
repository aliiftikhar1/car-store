// components/ImpressivePortfolio.js

export default function ImpressivePortfolio() {
    const portfolios = [
      {
        id: 1,
        title: "THIS IS A SIMPLE BANNER",
        description: "A Website for Acme Company",
        image: "/web1.png",
      },
      {
        id: 2,
        title: "THIS IS A SIMPLE BANNER",
        description: "A Website for Acme Company",
        image: "/laptop.png",
      },
      {
        id: 3,
        title: "THIS IS A SIMPLE BANNER",
        description: "A Website for Acme Company",
        image: "/mulitlaptop.png",
      },
      {
        id: 4,
        title: "THIS IS A SIMPLE BANNER",
        description: "A Website for Acme Company",
        image: "/meeting.png",
      },
      {
        id: 5,
        title: "THIS IS A SIMPLE BANNER",
        description: "A Website for Acme Company",
        image: "/aboutus1.png",
      },
      {
        id: 6,
        title: "THIS IS A SIMPLE BANNER",
        description: "A Website for Acme Company",
        image: "/aboutus2.png",
      },
    ];
  
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Impressive Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className="relative overflow-hidden group">
                <img
                  src={portfolio.image}
                  alt={portfolio.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-lg font-bold">{portfolio.title}</h3>
                  <p className="text-white">{portfolio.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  