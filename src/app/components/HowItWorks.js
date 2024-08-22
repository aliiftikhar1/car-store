// components/HowItWorks.js

export default function HowItWorks() {
    return (
      <section className="bg-blue-950 text-white p-12">
        <div className="container mx-auto flex flex-col md:flex-row">
          {/* Text Content */}
          <div className="md:w-1/2 px-6">
            <h2 className="text-3xl font-bold text-yellow-500 mb-8">HOW IT WORKS</h2>
            
            {/* Step 1 */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">01</h3>
              <h4 className="text-xl font-bold text-yellow-500 mb-2">SCHEDULE A FLY-OVER CALL</h4>
              <p className="text-lg text-white">
                Start the process with a comprehensive strategy session. We delve into your overarching goals and select the key milestones you aim to achieve through your marketing efforts.
              </p>
            </div>
  
            {/* Step 2 */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">02</h3>
              <h4 className="text-xl font-bold text-yellow-500 mb-2">CREATE A CUSTOMIZED PLAN</h4>
              <p className="text-lg text-white">
                Carefully craft a strategy surrounding messaging, targeted advertising channels, and media platforms. This strategy is designed to efficiently and effectively push you toward your specified goals.
              </p>
            </div>
  
            {/* Step 3 */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">03</h3>
              <h4 className="text-xl font-bold text-yellow-500 mb-2">REVIEW ONGOING RESULTS</h4>
              <p className="text-lg text-white">
                Once the strategy is completed, we continuously monitor and analyze the results. Our detailed and accessible reports provide valuable insights into the return on investment, enabling informed decision-making and ongoing optimization for maximum impact.
              </p>
            </div>
          </div>
  
          {/* Image Content */}
          <div className="md:w-1/2 px-6">
            <img
              src="/mulitlaptop.png"
              alt="How It Works"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    );
  }
  