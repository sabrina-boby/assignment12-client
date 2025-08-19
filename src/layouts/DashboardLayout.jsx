// DashboardLayout.jsx
import { Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar / Navbar */}
      <aside className=" w-full md:w-64 bg-white shadow-md p-4 md:p-5">
        <div className="text-2xl font-bold mb-4 md:mb-10 text-center text-blue-600">
          Dashboard
        </div>
        <DashboardSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
