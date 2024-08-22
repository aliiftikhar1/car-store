// components/Portfolio.js

export default function Portfolio() {
    const projects = [
      {
        id: 1,
        title: "The Tech Scene",
        image: "/web1.png",
      },
      {
        id: 2,
        title: "Spark Mind",
        image: "/web2.png",
      },
      {
        id: 3,
        title: "Tast",
        image: "/web3.png",
      },
      {
        id: 4,
        title: "The Tech Scene",
        image: "/web4.png",
      },
      {
        id: 5,
        title: "Spark Mind",
        image: "/web5.png",
      },
      {
        id: 6,
        title: "Tast",
        image: "/web6.png",
      },
    ];
  
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-yellow-500 font-bold text-lg mb-2">Over Impressive Portfolio</h2>
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Popular Updated Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-center text-lg font-bold text-gray-800">
                    {project.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  