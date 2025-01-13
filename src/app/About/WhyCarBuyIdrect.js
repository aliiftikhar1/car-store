export default function WhySBXCars() {
    const features = [
      {
        title: "Media Reach",
        description:
          "Through the existing Supercar Blondie brand, SBX Cars has an unrivalled global reach to find the right buyer for your vehicle, bringing together buyers and sellers from all over the world.",
      },
      {
        title: "Premium",
        description:
          "SBX Cars is the only digital platform focusing exclusively on premium vehicles. Our focus on offering the best collector cars and vehicles from around the globe means your listing will get the attention it deserves.",
      },
      {
        title: "Global",
        description:
          "SBX Cars is the global digital car auction platform, bringing together buyers and sellers from all over the world.",
      },
      {
        title: "Expertise",
        description:
          "SBX Cars is built around a team who have years of collector car auction experience, ensuring our community has access to the best resources for buying and selling at auction.",
      },
      {
        title: "Lower Costs",
        description:
          "Due to our online model, we are able to offer our services at a much lower cost than the industry standard for traditional in-house auction companies. SBX Cars also removes the logistical challenges and insurance costs required by physical auction spaces.",
      },
      {
        title: "Fast Turnaround",
        description:
          "We are able to provide a fast turnaround for sellers as our auctions go live weekly.",
      },
    ];
  
    return (
      <section className="px-6 md:px-36 pb-20 bg-white">
        <h2 className="text-center text-4xl font-[100] text-gray-800 mb-12">
          Why <span className="text-yellow-600">SBX Cars?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  