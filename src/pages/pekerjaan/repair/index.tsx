import { FiDownload, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/router";

interface WorkOrderDetail {
  id: string;
  workType: "repair" | "maintenance";
  workOrderDate: string;
  requestor: {
    name: string;
    position: string;
  };
  assetDetails: {
    name: string;
    code: string;
    location: string;
  };
  problemDescription: string;
  priority: "low" | "medium" | "high";
  scope: "mechanic" | "electric";
  assignedTechnician: string;
  photos: string[];
  status: "pending" | "disetujui" | "ditolak";
  approvedBy?: {
    name: string;
    position: string;
  };
}

const WorkOrderDetailPage = () => {
  const router = useRouter();

  const query = router.query;

  const workOrder: WorkOrderDetail = {
    id: "TESTETSTES",
    workType: "repair",
    workOrderDate: "2023-06-25",
    requestor: {
      name: "Budi Santoso",
      position: "Supervisor Produksi",
    },
    assetDetails: {
      name: "Mesin CNC Router",
      code: "AST-CNC-002",
      location: "Workshop A",
    },
    problemDescription:
      "Mesin mengalami overheating setelah 2 jam operasi dan mengeluarkan suara tidak normal",
    priority: "high",
    scope: "mechanic",
    assignedTechnician: "Ahmad Fauzi",
    photos: ["/sample-photo-1.jpg", "/sample-photo-2.jpg"],
    status: "disetujui",
    approvedBy: {
      name: "Dewi Kurnia",
      position: "Maintenance Manager",
    },
  };

  // Priority styling
  const priorityStyles = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  // Status styling
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    disetujui: "bg-green-100 text-green-800",
    ditolak: "bg-red-100 text-red-800",
  };

  const statusIcons = {
    pending: <FiClock className="mr-1" />,
    disetujui: <FiCheckCircle className="mr-1" />,
    ditolak: <FiXCircle className="mr-1" />,
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#211F60] p-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Detail Work Order</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ml-1 ${
                statusStyles[workOrder.status]
              }`}
            >
              <div className="flex">
                {statusIcons[workOrder.status]}
                {workOrder.status.toUpperCase()}
              </div>
            </span>
          </div>
          <div className="mt-2">
            <span className="text-sm">ID: {workOrder.id}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Work Type & Date */}
            <div>
              <h2 className="text-lg font-semibold text-[#211F60] mb-2">
                Informasi Pekerjaan
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Jenis</p>
                  <p className="capitalize">{workOrder.workType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Permintaan</p>
                  <p>
                    {new Date(workOrder.workOrderDate).toLocaleDateString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Requestor */}
            <div>
              <h2 className="text-lg font-semibold text-[#211F60] mb-2">
                Informasi Pengaju
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nama</p>
                  <p>{workOrder.requestor.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Posisi</p>
                  <p>{workOrder.requestor.position}</p>
                </div>
              </div>
            </div>

            {/* Asset Details */}
            <div>
              <h2 className="text-lg font-semibold text-[#211F60] mb-2">
                Detail Aset
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Nama</p>
                  <p>{workOrder.assetDetails.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Kode</p>
                    <p>{workOrder.assetDetails.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Lokasi</p>
                    <p>{workOrder.assetDetails.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Problem Description */}
            <div>
              <h2 className="text-lg font-semibold text-[#211F60] mb-2">
                Deskripsi Permasalahan
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="whitespace-pre-line">
                  {workOrder.problemDescription}
                </p>
              </div>
            </div>

            {/* Work Details */}
            <div>
              <h2 className="text-lg font-semibold text-[#211F60] mb-2">
                Detail Pekerjaan
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tingkat Prioritas</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      priorityStyles[workOrder.priority]
                    }`}
                  >
                    {workOrder.priority.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cakupan</p>
                  <p className="capitalize">{workOrder.scope}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teknisi yang Ditugaskan</p>
              <p>{workOrder.assignedTechnician}</p>
              <p>{workOrder.assignedTechnician}</p>
              <p>{workOrder.assignedTechnician}</p>
            </div>

            {/* Photos */}
            <div>
              <h2 className="text-lg font-semibold text-[#211F60] mb-2">
                Dokumentasi
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {workOrder.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="relative h-40">
                      <Image
                        src={photo}
                        alt={`Work documentation ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 bg-gray-50 flex justify-end">
                      <button className="text-[#211F60] text-sm flex items-center">
                        <FiDownload className="mr-1" /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval Status */}
            {workOrder.status !== "pending" && (
              <div>
                <h2 className="text-lg font-semibold text-[#211F60] mb-2">
                  Detail{" "}
                  {workOrder.status === "disetujui"
                    ? "Persetujuan"
                    : "Penolakan"}{" "}
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg flex justify-between">
                  <div>
                    <p className="font-medium">{workOrder.approvedBy?.name}</p>
                    <p className="text-sm text-gray-600">
                      {workOrder.approvedBy?.position}
                    </p>
                  </div>
                  <FiCheckCircle className="text-2xl" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            Back to List
          </button>
          {workOrder.status === "pending" && (
            <>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Reject
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkOrderDetailPage;
