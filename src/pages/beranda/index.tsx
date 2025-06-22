import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiCalendar,
  FiFileText,
  FiLogOut,
  FiGitPullRequest,
  FiSend,
  FiList,
  FiBriefcase,
  FiTarget,
} from "react-icons/fi";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/id";

const generateCode = (): string => {
  // Generate 3 random uppercase letters
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");

  // Generate 3 random digits
  const digits = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  return `${letters}${digits}`;
};

const currentMonthYear = dayjs().format("MMYY"); // "0624" (June 2024)

const Beranda = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Changed to start closed
  const [cardsVisible, setCardsVisible] = useState(false);
  const [dateNow, setDateNow] = useState();
  const router = useRouter();

  const primaryColor = "bg-[#211F60]";
  const primaryColorHover = "hover:bg-[#1A1850]";
  const primaryBorder = "border-[#1A1850]";
  const primaryText = "text-[#211F60]";

  const navItems = [
    { name: "Beranda", icon: <FiHome />, path: "/beranda" },
    { name: "Pekerjaan", icon: <FiList />, path: "/pekerjaan" },
    { name: "Work Order", icon: <FiBriefcase />, path: "/work-order" },
  ];

  useEffect(() => {
    // Trigger card animation after component mounts
    const timer = setTimeout(() => {
      setCardsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Starts closed */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } ${primaryColor} text-white transition-all duration-300 ease-in-out`}
      >
        <div
          className={`p-4 flex items-center justify-between border-b ${primaryBorder}`}
        >
          {sidebarOpen ? (
            <div
              className="flex gap-4 align-center"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiTarget className="text-3xl" />
              <h1 className="text-md font-bold">PAJM Work Management System</h1>
            </div>
          ) : (
            <div
              className="w-8 h-8 bg-[#1A1850] rounded-full"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            ></div>
          )}
          <button className="p-1 rounded-lg hover:bg-[#1A1850]">
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        <nav className="mt-6">
          {navItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div
                className={`flex items-center p-3 mx-2 rounded-lg transition-colors ${
                  router.pathname === item.path
                    ? "bg-[#1A1850]"
                    : `${primaryColorHover}`
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span className="ml-3">{item.name}</span>}
              </div>
            </Link>
          ))}
        </nav>

        <div className={`absolute bottom-0 w-full p-4 ${primaryBorder}`}>
          <button
            className={`flex items-center p-2 w-full rounded-lg ${primaryColorHover}`}
          >
            <FiLogOut />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto ">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className={`text-xl font-semibold ${primaryText}`}>Beranda</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  <FiSettings className={primaryText} />
                </button>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#211F60]"></div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:px-[20%]">
            {/* Profile Section */}
            <div
              className={`transition-all duration-500 ${
                cardsVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              } flex justify-between`}
            >
              <div>
                <h1 className="font-bold text-xl">Nama</h1>
                <p className="font-sm opacity-60">Staff Elektrik</p>
              </div>
              <div>
                <p className="text-sm">
                  {dayjs(new Date()).locale("id").format("dddd, DD-MM-YYYY")}
                </p>
              </div>
            </div>

            {/* Active Work Card */}
            <div
              className={`bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#211F60] transition-all duration-500 delay-100 ${
                cardsVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <h3 className="font-medium text-gray-700">Pekerjaan Aktif</h3>
              <p className={`text-3xl font-bold mt-2 ${primaryText}`}>12</p>
            </div>

            {/* Work in Progress Section - List Version */}
            <div
              className={`md:col-span-2 lg:col-span-3 bg-white p-4 rounded-lg shadow-sm border-t-4 border-[#211F60] transition-all duration-500 delay-200 ${
                cardsVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <h3 className="font-medium text-gray-700 mb-3 text-sm">
                Pekerjaan
              </h3>

              {/* Clickable List Items */}
              <div className="space-y-2">
                {[
                  {
                    id: `WO-RPR-ELK-${currentMonthYear}-AAA`,
                    date: "15 Nov 2023",
                    requester: "Budi Santoso",
                    location: "Workshop A",
                    priority: "Tinggi",
                    priorityColor: "bg-red-100 text-red-800",
                  },
                  {
                    id: "WO-2023-042",
                    date: "16 Nov 2023",
                    requester: "Ani Wijaya",
                    location: "Gudang Utama",
                    priority: "Sedang",
                    priorityColor: "bg-yellow-100 text-yellow-800",
                  },
                  {
                    id: "WO-2023-087",
                    date: "17 Nov 2023",
                    requester: "Joko Prasetyo",
                    location: "Area Produksi 2",
                    priority: "Rendah",
                    priorityColor: "bg-green-100 text-green-800",
                  },
                ].map((work, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      router.push(
                        `/pekerjaan/${
                          work.id.split("-")[1] === "RPR"
                            ? "repair"
                            : "maintenance"
                        }?wo-id=${work.id}`
                      )
                    } // Add your navigation logic
                    className="p-2 rounded-lg border border-gray-100 hover:border-[#211F60] hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex">
                        <span className="text-sm text-[#211F60]">
                          {work.id}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${work.priorityColor}`}
                      >
                        {work.priority}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-600 truncate">
                      <span className="font-medium">{work.requester}</span> •{" "}
                      {work.location}
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {work.date}
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="mt-3 text-right">
                <button
                  onClick={() => router.push("/work-orders")} // Add your navigation logic
                  className="text-xs text-[#211F60] font-medium hover:underline"
                >
                  Lihat Semua →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Beranda;
