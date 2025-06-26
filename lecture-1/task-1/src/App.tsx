import "./App.css"
import PricingCard from "./components/PricingCard"

const App: React.FC = () => {
  const pricingPlans = [
    {
      plan: "Standard",
      price: "100",
      features: [
        "50,000 Requests",
        "4 contributors",
        "Up to 3 GB storage space",
      ],
      isFeatured: false,
    },
    {
      plan: "Pro",
      price: "200",
      features: [
        "100,000 Requests",
        "7 contributors",
        "Up to 6 GB storage space",
      ],
      isFeatured: true,
    },
    {
      plan: "Expert",
      price: "500",
      features: [
        "200,000 Requests",
        "11 contributors",
        "Up to 10 GB storage space",
      ],
      isFeatured: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#242c38] flex flex-col items-center justify-center p-4">
      <h1 className="text-white text-4xl font-bold mb-12">Pricing</h1>
      <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center -space-x-px w-full max-w-6xl">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            plan={plan.plan}
            price={plan.price}
            features={plan.features}
            isFeatured={plan.isFeatured}
          />
        ))}
      </div>
    </div>
  )
}

export default App
