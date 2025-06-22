import {
  FiTool,
  FiSettings,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiList,
} from "react-icons/fi";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useRouter } from "next/router";

ChartJS.register(ArcElement, Tooltip, Legend);

const Pekerjaan = () => {
  // Sample data - replace with your actual data
  const workData = {
    totalRepair: 24,
    totalMaintenance: 16,
    inProgress: 12,
    notStarted: 8,
    completed: 20,
    total: 40,
  };

  const router = useRouter();

  // Calculate percentages for doughnut chart
  const totalWork = workData.totalRepair + workData.totalMaintenance;
  const repairPercentage = Math.round((workData.totalRepair / totalWork) * 100);
  const maintenancePercentage = 100 - repairPercentage;

  // Doughnut chart data
  const chartData = {
    labels: ["Repair", "Maintenance"],
    datasets: [
      {
        data: [workData.totalRepair, workData.totalMaintenance],
        backgroundColor: ["#211F60", "#4F46E5"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-bold text-[#211F60]">
          Statistik Pekerjaan
        </h1>
        <div>
          <h1>Nama</h1>
          <p className="opacity-50">Staff</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 text-black col-span-2 mb-4">
        <div className="flex items-center">
          <FiList className="text-black text-xl mr-2" />
          <h3 className="font-medium text-gray-700">Total Pekerjaan</h3>
        </div>
        <p className="text-3xl font-bold mt-2 text-black">{workData.total}</p>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-gray-700 mb-4 text-center">
            Distribusi Pekerjaan
          </h3>
          <div className="h-64 flex justify-center">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Repair: {repairPercentage}% | Maintenance: {maintenancePercentage}
              %
            </p>
          </div>
        </div>

        {/* Right Column - Stats Cards in 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Total Repair Work */}
          <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-[#211F60]">
            <div className="flex items-center">
              <FiTool className="text-[#211F60] text-xl mr-2" />
              <h3 className="font-medium text-gray-700">Repair</h3>
            </div>
            <p className="text-3xl font-bold mt-2 text-[#211F60]">
              {workData.totalRepair}
            </p>
          </div>

          {/* Total Maintenance Work */}
          <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-[#4F46E5]">
            <div className="flex items-center">
              <FiSettings className="text-[#4F46E5] text-xl mr-2" />
              <h3 className="font-medium text-gray-700">Maintenance</h3>
            </div>
            <p className="text-3xl font-bold mt-2 text-[#4F46E5]">
              {workData.totalMaintenance}
            </p>
          </div>

          {/* In Progress */}
          <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-[#F59E0B]">
            <div className="flex items-center">
              <FiClock className="text-[#F59E0B] text-xl mr-2" />
              <h3 className="font-medium text-gray-700">Berjalan</h3>
            </div>
            <p className="text-3xl font-bold mt-2 text-[#F59E0B]">
              {workData.inProgress}
            </p>
          </div>

          {/* Not Started */}
          <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-[#EF4444]">
            <div className="flex items-center">
              <FiAlertCircle className="text-[#EF4444] text-xl mr-2" />
              <h3 className="font-medium text-gray-700">Belum Mulai</h3>
            </div>
            <p className="text-3xl font-bold mt-2 text-[#EF4444]">
              {workData.notStarted}
            </p>
          </div>

          {/* Completed - Span full width */}
          <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-[#10B981] col-span-2">
            <div className="flex items-center">
              <FiCheckCircle className="text-[#10B981] text-xl mr-2" />
              <h3 className="font-medium text-gray-700">Selesai</h3>
            </div>
            <p className="text-3xl font-bold mt-2 text-[#10B981]">
              {workData.completed}
            </p>
          </div>

          <button
            className="border-1 text-left rounded-md py-2 px-1"
            onClick={() => router.push("/beranda")}
          >
            Beranda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pekerjaan;
