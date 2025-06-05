import React from "react"

type PricingCardProps = {
  plan: string
  price: string
  features: string[]
  isFeatured?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  price,
  features,
  isFeatured = false,
}) => {
  return (
    <div
      tabIndex={0}
      className={`flex flex-col items-center py-10 text-center sm:w-full w-full max-w-sm transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${
        isFeatured
          ? "bg-[#2c3e50] text-white scale-105 shadow-xl z-10"
          : "bg-white text-[#2c3e50] shadow"
      } hover:shadow-lg`}
    >
      <h3 className="text-sm font-semibold mb-2 uppercase tracking-wide">
        {plan}
      </h3>
      <p className="text-4xl font-bold mb-6">${price}</p>

      <div className="w-full divide-y divide-gray-300 border-y border-gray-300 mb-10">
        {features.map((feature, index) => (
          <div key={index} className="py-3 text-sm px-4">
            {feature}
          </div>
        ))}
      </div>

      <button
        className={`appearance-none bg-transparent border border-current rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isFeatured
            ? "text-white focus-visible:ring-white hover:bg-white hover:text-[#2c3e50]"
            : "text-[#2c3e50] focus-visible:ring-[#2c3e50] hover:bg-[#2c3e50] hover:text-white"
        } transition-colors duration-300`}
      >
        Subscribe
      </button>
    </div>
  )
}

export default PricingCard
