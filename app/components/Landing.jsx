import UnderlinedText from "./UnderlinedText";

const PortfolioLanding = () => {
    const features = [
      "Create it your way",
      "All the essentials",
      "Reach more people",
      "Open new income streams",
      "Manage your network",
      "Get expert tips"
    ];
  
    return (
      
        <div className="container mx-auto px-4 py-16 max-w-4xl mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 font-enrich text-gray-300">
          Build your online {" "}
          <span className="underline text-[#5f58e2]">portfolio</span>
          {" "} with full creative freedom 🤖
        </h1>
        <p className="text-xl text-center mb-16 text-gray-500 font-enrich">
          Display, promote all your work from your portfolio builder, so you can focus on the work that matters most.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center ">
          {features.map((feature, index) => (
            <div key={index} className="border p-6 rounded-lg  hover:bg-[#e13fd9]  hover:border-black hover:text-white">
              <p className="font-semibold ">{feature}</p>
            </div>
          ))}
        </div>
      </div>
      
    );
  };

  export default PortfolioLanding;