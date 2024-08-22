'use client';
// components/WhoWeAre.js

export default function WhoWeAre() {
  return (
    <section className="relative bg-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4">
            Who we are
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-black mb-6">
            We want to give you the best <span className="text-yellow-500">service</span>
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Div Enclave is an in-house and on-site team that has been working as an agency for over 12 years and continues to bring value to our clients.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>We embrace the new and are open to experimenting with new technologies, web development techniques, and web design approaches.</li>
            <li>We believe that having a positive attitude and an optimistic approach to challenges is the key to powering any web project, no matter how complicated.</li>
          </ul>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 relative px-6 md:px-12">
          <div className="relative z-10">
            <img
              src="/meeting.png"
              alt="Team Working Together"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="absolute z-40 bottom-0 right-0 translate-y-10">
            <div className="bg-yellow-500 text-white flex flex-col text-center font-bold rounded-full p-4 w-36 h-36 md:w-48 md:h-48 flex items-center justify-center shadow-lg">
              <div className="text-2xl md:text-3xl">3+ Years of</div>
              <div className="text-2xl md:text-3xl">Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
