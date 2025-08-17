const Dashboard = () => {
  // Sample data
  const stats = [
    {
      name: "Total Revenue",
      value: "$45,231",
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "New Users",
      value: "2,345",
      change: "+18%",
      changeType: "positive",
    },
    {
      name: "Pending Orders",
      value: "12",
      change: "-2%",
      changeType: "negative",
    },
    {
      name: "Active Projects",
      value: "9",
      change: "+3%",
      changeType: "positive",
    },
  ];

  const recentActivities = [
    { id: 1, user: "John Doe", action: "placed an order", time: "2 min ago" },
    {
      id: 2,
      user: "Sarah Smith",
      action: "updated profile",
      time: "10 min ago",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "completed payment",
      time: "25 min ago",
    },
    {
      id: 4,
      user: "Emma Wilson",
      action: "requested support",
      time: "1 hour ago",
    },
  ];

  return (
    <div className=" bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Dashboard Overview
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat: any, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Charts and Data */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Revenue Overview
                </h3>
                <select className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                [Chart Placeholder]
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Recent Activities
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium mr-3 mt-1">
                      {activity.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {activity.user}{" "}
                        <span className="font-normal text-gray-500">
                          {activity.action}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Reusable Components

type Stat = {
  name: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
};

const StatCard = ({ stat }: { stat: Stat }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{stat.name}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">
            {stat.value}
          </p>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            stat.changeType === "positive"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {stat.change}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
