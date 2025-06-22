import {
  FiTool,
  FiSettings,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

interface WorkOrder {
  id: string;
  type: "repair" | "maintenance";
  priority: "low" | "medium" | "high";
  status: "in-progress" | "not-started" | "completed";
  requestor: string;
  assetName: string;
  location: string;
  date: string;
}

const WorkListPage = () => {
  // Sample data
  const workOrders: WorkOrder[] = [
    {
      id: "WO-2023-0625-001",
      type: "repair",
      priority: "high",
      status: "in-progress",
      requestor: "Budi Santoso",
      assetName: "CNC Router Machine",
      location: "Workshop A",
      date: "2023-06-25",
    },
    {
      id: "WO-2023-0626-002",
      type: "maintenance",
      priority: "medium",
      status: "not-started",
      requestor: "Ani Wijaya",
      assetName: "Hydraulic Press",
      location: "Production Line 2",
      date: "2023-06-26",
    },
    {
      id: "WO-2023-0627-003",
      type: "repair",
      priority: "low",
      status: "completed",
      requestor: "Joko Prasetyo",
      assetName: "Conveyor Belt",
      location: "Packaging Area",
      date: "2023-06-27",
    },
    {
      id: "WO-2023-0628-004",
      type: "maintenance",
      priority: "high",
      status: "in-progress",
      requestor: "Dewi Kurnia",
      assetName: "Cooling System",
      location: "Workshop B",
      date: "2023-06-28",
    },
  ];

  // Style configurations
  const priorityStyles = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const statusStyles = {
    "in-progress": "bg-blue-100 text-blue-800",
    "not-started": "bg-gray-100 text-gray-800",
    completed: "bg-green-100 text-green-800",
  };

  const statusIcons = {
    "in-progress": <FiClock className="mr-1" />,
    "not-started": <FiAlertCircle className="mr-1" />,
    completed: <FiCheckCircle className="mr-1" />,
  };

  // Filter work orders
  const repairOrders = workOrders.filter((order) => order.type === "repair");
  const maintenanceOrders = workOrders.filter(
    (order) => order.type === "maintenance"
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-[#211F60] mb-6">Work Orders</h1>

      {/* Repair Work Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FiTool className="text-[#211F60] text-xl mr-2" />
          <h2 className="text-xl font-semibold">Repair Work</h2>
          <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {repairOrders.length} orders
          </span>
        </div>

        <div className="space-y-3">
          {repairOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#211F60]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-[#211F60]">
                    {order.assetName}
                  </h3>
                  <p className="text-sm text-gray-600">{order.location}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    priorityStyles[order.priority]
                  }`}
                >
                  {order.priority}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  {statusIcons[order.status]}
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status.replace("-", " ")}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>

              <div className="mt-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-medium">Requestor:</span>{" "}
                  {order.requestor}
                </p>
                <p className="text-gray-500 text-xs mt-1">ID: {order.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Work Section */}
      <div>
        <div className="flex items-center mb-4">
          <FiSettings className="text-[#4F46E5] text-xl mr-2" />
          <h2 className="text-xl font-semibold">Maintenance Work</h2>
          <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {maintenanceOrders.length} orders
          </span>
        </div>

        <div className="space-y-3">
          {maintenanceOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#4F46E5]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-[#211F60]">
                    {order.assetName}
                  </h3>
                  <p className="text-sm text-gray-600">{order.location}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    priorityStyles[order.priority]
                  }`}
                >
                  {order.priority}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  {statusIcons[order.status]}
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status.replace("-", " ")}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>

              <div className="mt-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-medium">Requestor:</span>{" "}
                  {order.requestor}
                </p>
                <p className="text-gray-500 text-xs mt-1">ID: {order.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkListPage;
