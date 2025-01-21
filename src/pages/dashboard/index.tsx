import DashboardCard from "../../components/dashbaord/card";

const Dashboard = () => {
  const dashboardData = [
    { title: 'Total Users', value: '4', icon: '👥' },
    { title: 'Revenue', value: '$12,345', icon: '💰' },
    { title: 'Active Projects', value: '8', icon: '📊' },
    { title: 'Tasks Completed', value: '156', icon: '✅' },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;