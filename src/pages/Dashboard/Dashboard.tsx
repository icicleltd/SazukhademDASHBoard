import PortfolioSection from "./PortfolioSection/PortfolioSection";

const Dashboard = () => {
  // Array of section data for cleaner code
  const sections = [
    {
      name: "Hero Section",
      icon: "🖼️",
      color: "bg-blue-100 hover:bg-blue-200 text-blue-800",
    },
    {
      name: "About Section",
      icon: "📝",
      color: "bg-green-100 hover:bg-green-200 text-green-800",
    },
    {
      name: "Portfolio Section",
      icon: "📂",
      color: "bg-purple-100 hover:bg-purple-200 text-purple-800",
    },
    {
      name: "Performances Section",
      icon: "🎭",
      color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
    },
    {
      name: "Media Archives",
      icon: "🎞️",
      color: "bg-red-100 hover:bg-red-200 text-red-800",
    },
    {
      name: "Award Section",
      icon: "🏆",
      color: "bg-indigo-100 hover:bg-indigo-200 text-indigo-800",
    },
    {
      name: "Footer Section",
      icon: "⬇️",
      color: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Dashboard Overview
          </h2>

          {/* Module and Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
            {sections.map((section, index) => (
              <button
                key={index}
                className={`${section.color} rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center justify-center h-40`}
              >
                <span className="text-3xl mb-3">{section.icon}</span>
                <span className="font-medium text-lg text-center">
                  {section.name}
                </span>
              </button>
            ))}
          </div>
        </main>

        <h1 className="font-semibold text-xl">Portfolio Sections: </h1>
        <PortfolioSection />
      </div>
    </div>
  );
};

export default Dashboard;
