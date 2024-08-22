// components/RecentProjects.js

export default function RecentProjects() {
    const projects = [
      {
        laptopImage: "/pro1.png", // Replace with the actual image path
      },
      {
        laptopImage: "/pro2.png", // Replace with the actual image path
      },
      {
        laptopImage: "/pro3.png", // Replace with the actual image path
      },
    ];
  
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Our Recent Projects</h2>
          <div className="flex justify-between items-center gap-8">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative">
                  <img src={project.laptopImage} alt={`Project ${index + 1}`} className="w-full h-auto max-w-xs md:max-w-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  