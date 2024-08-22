// components/HappyClients.js

export default function HappyClients() {
    const testimonials = [
      {
        name: "jonas",
        review: "He is comprehensive and ready to work! I think I would contact him again in the future. Thank you so much.",
        platform: "fiverr",
        rating: 5,
      },
      {
        name: "Tarkon",
        review: "Ultra fast delivery and a website navigation unique style. Friendly Communication. High recommended. Thanks for your delivery. Good experience to work with him.",
        platform: "fiverr",
        rating: 5,
      },
      {
        name: "salian",
        review: "Thank you very much for your service! Very professional and very good communication. I love my Store and your ideas, you were really patient and verified I'm satisfied. I will use your service again soon.",
        platform: "fiverr",
        rating: 5,
      },
    ];
  
    return (
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-white mb-4">Our Happy Clients</h2>
          <p className="text-center text-gray-400 mb-12">
            We always take care of our clients and they are very happy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white text-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-2">{testimonial.name}</h3>
                <div className="flex items-center mb-2">
                  {Array(testimonial.rating).fill().map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.691h4.19c.97 0 1.372 1.24.588 1.81l-3.4 2.47a1 1 0 00-.364 1.118l1.287 3.973c.3.921-.755 1.688-1.54 1.118l-3.4-2.47a1 1 0 00-1.176 0l-3.4 2.47c-.785.57-1.84-.197-1.54-1.118l1.287-3.973a1 1 0 00-.364-1.118l-3.4-2.47c-.784-.57-.382-1.81.588-1.81h4.19a1 1 0 00.95-.691L9.049 2.927z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4">{testimonial.review}</p>
                <div className="flex items-center">
                  <img src="/fiverr-logo.png" alt={testimonial.platform} className="h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  