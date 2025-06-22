import { useState } from "react";
import {
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiAlertCircle,
  FiSettings,
  FiEye,
} from "react-icons/fi";

export type WorkOrder = {
  id: string;
  title: string;
  type: "repair" | "maintenance";
  status:
    | "draft"
    | "submitted"
    | "evaluation"
    | "approval"
    | "in-progress"
    | "completed"
    | "rejected"
    | "pending";
  progress: number;
  createdAt: string;
  submittedAt?: string;
  startedAt?: string;
  completedAt?: string;
  rejectedAt?: string;

  // Request details
  requestor: string;
  assetName: string;
  location: string;
  problemDescription: string;

  // Technical details
  technician?: string;
  scope?: "mechanic" | "electric" | "hydraulic" | "pneumatic";
  priority?: "low" | "medium" | "high" | "critical";

  // Status-specific fields
  requestedChanges?: string;
  pendingReason?: string;
  rejectedReason?: string;
  estimatedCost?: number;
  estimatedCompletion?: string;
  approvedBy?: string;

  // Media
  photos?: string[];
  documents?: string[];
};
const WorkOrderPage = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    // 1. Recently Submitted (last 3 days)
    {
      id: "WO-2023-0625-001",
      title: "CNC Router Emergency Repair",
      type: "repair",
      status: "submitted",
      progress: 20,
      createdAt: "2023-06-23",
      submittedAt: "2023-06-25", // Today
      assetName: "CNC Router XJ-2000",
      location: "Workshop A",
      requestor: "Budi Santoso",
      problemDescription: "Machine stopped mid-operation with E-stop error",
    },
    {
      id: "WO-2023-0625-002",
      title: "Monthly Conveyor Maintenance",
      type: "maintenance",
      status: "submitted",
      progress: 20,
      createdAt: "2023-06-24",
      submittedAt: "2023-06-25", // Today
      assetName: "Conveyor Belt System",
      location: "Packaging Line 2",
      requestor: "Ani Wijaya",
      problemDescription: "Routine lubrication and inspection",
    },

    // 2. Needs Evaluation
    {
      id: "WO-2023-0620-003",
      title: "Hydraulic Press Leak",
      type: "repair",
      status: "evaluation",
      progress: 40,
      createdAt: "2023-06-20",
      submittedAt: "2023-06-20",
      assetName: "Hydraulic Press 50T",
      location: "Metal Stamping Area",
      requestor: "Joko Prasetyo",
      problemDescription: "Oil leak near main cylinder, needs assessment",
      requestedChanges: "Please verify if this requires external specialist",
    },
    {
      id: "WO-2023-0622-004",
      title: "Electrical Panel Inspection",
      type: "maintenance",
      status: "evaluation",
      progress: 40,
      createdAt: "2023-06-22",
      submittedAt: "2023-06-22",
      assetName: "Main Electrical Panel",
      location: "Workshop B",
      requestor: "Dewi Kurnia",
      problemDescription: "Routine safety check overdue",
    },

    // 3. Waiting Approval
    {
      id: "WO-2023-0618-005",
      title: "Forklift Battery Replacement",
      type: "repair",
      status: "approval",
      progress: 60,
      createdAt: "2023-06-18",
      submittedAt: "2023-06-18",
      assetName: "Electric Forklift #3",
      location: "Warehouse",
      requestor: "Ahmad Fauzi",
      problemDescription: "Battery not holding charge",
      technician: "Eko Sutrisno",
      estimatedCost: 1750000,
    },

    // 4. In Progress
    {
      id: "WO-2023-0615-006",
      title: "Cooling System Overhaul",
      type: "repair",
      status: "in-progress",
      progress: 75,
      createdAt: "2023-06-15",
      submittedAt: "2023-06-15",
      assetName: "Cooling System",
      location: "Molding Area",
      requestor: "Rina Melati",
      technician: "Bambang Surya",
      startedAt: "2023-06-19",
      estimatedCompletion: "2023-06-28",
      problemDescription: "Battery not holding charge",
    },
    {
      id: "WO-2023-0610-007",
      title: "Quarterly Generator Maintenance",
      type: "maintenance",
      status: "in-progress",
      progress: 50,
      createdAt: "2023-06-10",
      submittedAt: "2023-06-10",
      assetName: "Backup Generator",
      location: "Power Station",
      requestor: "Faisal Rahman",
      technician: "Dodi Permana",
      startedAt: "2023-06-20",
      problemDescription: "Battery not holding charge",
    },

    // 5. Pending (with reasons)
    {
      id: "WO-2023-0612-008",
      title: "Robotic Arm Calibration",
      type: "repair",
      status: "pending",
      progress: 30,
      createdAt: "2023-06-12",
      submittedAt: "2023-06-12",
      assetName: "Robotic Arm #5",
      location: "Assembly Line",
      requestor: "Gita Wulandari",
      pendingReason:
        "Waiting for calibration tools to arrive (ETA: 2023-06-27)",
      problemDescription: "Battery not holding charge",
    },
    {
      id: "WO-2023-0608-009",
      title: "HVAC System Cleaning",
      type: "maintenance",
      status: "pending",
      progress: 25,
      createdAt: "2023-06-08",
      submittedAt: "2023-06-08",
      assetName: "HVAC System",
      location: "Office Area",
      requestor: "Hendra Setiawan",
      pendingReason: "Production schedule conflict - rescheduled for weekend",
      problemDescription: "Battery not holding charge",
    },

    // 6. Completed
    {
      id: "WO-2023-0601-010",
      title: "Conveyor Motor Replacement",
      type: "repair",
      status: "completed",
      progress: 100,
      createdAt: "2023-06-01",
      submittedAt: "2023-06-01",
      completedAt: "2023-06-05",
      assetName: "Conveyor Motor",
      location: "Packaging Line 1",
      requestor: "Irfan Maulana",
      technician: "Eko Sutrisno",
      approvedBy: "Dewi Kurnia",
      problemDescription: "Battery not holding charge",
    },

    // 7. Rejected
    {
      id: "WO-2023-0624-011",
      title: "Office Chair Repair",
      type: "repair",
      status: "rejected",
      progress: 0,
      createdAt: "2023-06-24",
      submittedAt: "2023-06-24",
      rejectedAt: "2023-06-24",
      assetName: "Office Chair",
      location: "Admin Office",
      requestor: "Linda Hartati",
      rejectedReason:
        "Not covered under maintenance contract - please contact facilities",
      problemDescription: "Battery not holding charge",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);

  const statusConfig = {
    draft: { color: "bg-gray-400", icon: <FiClock /> },
    submitted: { color: "bg-blue-500", icon: <FiClock /> },
    evaluation: { color: "bg-yellow-500", icon: <FiAlertCircle /> },
    approval: { color: "bg-purple-500", icon: <FiUser /> },
    "in-progress": { color: "bg-orange-500", icon: <FiSettings /> },
    completed: { color: "bg-green-500", icon: <FiCheckCircle /> },
    rejected: { color: "bg-red-500", icon: <FiAlertCircle /> },
    pending: { color: "bg-yellow-400", icon: <FiClock /> },
  };

  const milestones = [
    { id: "submitted", label: "Submitted" },
    { id: "evaluation", label: "Evaluation" },
    { id: "approval", label: "Approval" },
    { id: "in-progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ];

  // Get recently submitted orders (within last 3 days)
  const recentSubmissions = workOrders.filter(
    (order) =>
      order.status === "submitted" &&
      order.submittedAt &&
      new Date(order.submittedAt) >
        new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  );

  // Other orders grouped by status
  const evaluationNeeded = workOrders.filter(
    (order) => order.status === "evaluation"
  );
  const inProgressOrders = workOrders.filter(
    (order) => order.status === "in-progress"
  );
  const pendingOrders = workOrders.filter(
    (order) => order.status === "pending"
  );

  const createWorkOrder = () => setShowCreateModal(true);
  const reviewOrder = (order: WorkOrder) => setSelectedOrder(order);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[#211F60]">Work Orders</h1>
        <button
          onClick={createWorkOrder}
          className="flex items-center px-4 py-2 bg-[#211F60] text-white rounded-lg hover:bg-[#1A1850] w-[60%]"
        >
          <FiPlus className="mr-2" />
          Create Work Order
        </button>
      </div>

      {/* Recently Submitted Section */}
      {recentSubmissions.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              For Immediate Review
            </h2>
            <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {recentSubmissions.length} new
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentSubmissions.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md border-l-4 border-red-500"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{order.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                        statusConfig[order.status].color
                      } text-white`}
                    >
                      {statusConfig[order.status].icon}
                      <span className="ml-1 capitalize">New Submission</span>
                    </span>
                  </div>

                  <div className="flex items-center text-sm mb-3">
                    <span className="text-gray-500 mr-2">Submitted:</span>
                    <span>{new Date(order.submittedAt!).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.type === "repair"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.type.toUpperCase()}
                    </span>

                    <button
                      onClick={() => reviewOrder(order)}
                      className="flex items-center px-3 py-1 bg-[#211F60] text-white rounded-lg text-sm"
                    >
                      <FiEye className="mr-1" /> Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evaluation Needed Section */}
      {evaluationNeeded.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Needs Evaluation</h2>
          <div className="space-y-4">
            {evaluationNeeded.map((order) => (
              <WorkOrderCard
                key={order.id}
                order={order}
                statusConfig={statusConfig}
                milestones={milestones}
                onAction={() => reviewOrder(order)}
                actionText="Evaluate"
              />
            ))}
          </div>
        </div>
      )}

      {/* In Progress Section */}
      {inProgressOrders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Work In Progress</h2>
          <div className="space-y-4">
            {inProgressOrders.map((order) => (
              <WorkOrderCard
                key={order.id}
                order={order}
                statusConfig={statusConfig}
                milestones={milestones}
              />
            ))}
          </div>
        </div>
      )}

      {/* Pending Section */}
      {pendingOrders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <WorkOrderCard
                key={order.id}
                order={order}
                statusConfig={statusConfig}
                milestones={milestones}
              />
            ))}
          </div>
        </div>
      )}

      {/* Create Work Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Create New Work Order</h3>
              {/* Form would go here */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#211F60] text-white rounded-lg">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Work Order Card Component
const WorkOrderCard = ({
  order,
  statusConfig,
  milestones,
  onAction,
  actionText,
}: {
  order: WorkOrder;
  statusConfig: any;
  milestones: any[];
  onAction?: () => void;
  actionText?: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Order Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{order.title}</h3>
          <div className="flex items-center mt-1">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                order.type === "repair"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {order.type.toUpperCase()}
            </span>
            <span className="ml-2 text-sm text-gray-500">#{order.id}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
              statusConfig[order.status].color
            } text-white`}
          >
            {statusConfig[order.status].icon}
            <span className="ml-1 capitalize">
              {order.status.replace("-", " ")}
            </span>
          </span>
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium">Progress</h4>
          <span className="text-sm font-medium">{order.progress}%</span>
        </div>

        <div className="relative h-2 bg-gray-200 rounded-full mb-6">
          <div
            className="absolute top-0 left-0 h-full bg-[#211F60] rounded-full"
            style={{ width: `${order.progress}%` }}
          ></div>
        </div>

        {/* Circular Milestones */}
        <div className="flex justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 mx-8"></div>
          {milestones.map((milestone, index) => {
            const isCompleted = order.progress >= (index + 1) * 20;
            const isCurrent =
              order.progress < (index + 1) * 20 && order.progress > index * 20;

            return (
              <div
                key={milestone.id}
                className="flex flex-col items-center z-10"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-[#211F60]"
                      : isCurrent
                      ? "bg-[#211F60] bg-opacity-50"
                      : "bg-gray-200"
                  }`}
                >
                  {isCompleted ? (
                    <FiCheckCircle className="text-white" />
                  ) : (
                    <span
                      className={`text-sm font-medium ${
                        isCurrent ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center ${
                    isCompleted ? "text-[#211F60] font-medium" : "text-gray-500"
                  }`}
                >
                  {milestone.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Info */}
      <div className="p-4 bg-gray-50">
        {order.status === "pending" && (
          <div className="flex items-start text-yellow-800 bg-yellow-50 p-3 rounded-lg mb-3">
            <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Pending Reason</p>
              <p className="text-sm">{order.pendingReason}</p>
            </div>
          </div>
        )}

        {order.technician && (
          <div className="flex items-center text-sm mb-2">
            <span className="text-gray-500 mr-2">Technician:</span>
            <span>{order.technician}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            Created: {new Date(order.createdAt).toLocaleDateString()}
          </span>

          {onAction && actionText && (
            <button
              onClick={onAction}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkOrderPage;
