import { NavLink } from "react-router";
import useRole from "../hooks/useRole";

export default function DashboardSidebar() {
  const NavItem = ({ to, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg font-medium text-sm md:text-base ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      {label}
    </NavLink>
  );

  const { role, loading } = useRole();

  if (loading)
    return (
      <h1 className="text-center">
        <span className="loading loading-spinner loading-xl"></span>
      </h1>
    );

  // Admin Sidebar / Navbar
  if (role === "admin")
    return (
      <>
        {/* Desktop Sidebar */}
        <nav className="hidden md:flex flex-col gap-4">
          <NavItem to="/dashboard" label="Admin" />
          <NavItem to="/dashboard/AllUsers" label="All Users" />
          <NavItem to="/dashboard/AllDonationRequests" label="All Donation Requests" />
          <NavItem to="/dashboard/ContentManagementPage" label="Content Management" />
          <NavItem to="/dashboard/funding-money" label="Funding Page" />
          <NavItem to="/dashboard/profile" label="Profile" />
        </nav>

        {/* Mobile/Tablet Top Navbar */}
        <nav className="flex md:hidden gap-2 overflow-x-auto bg-white shadow p-2">
          <NavItem to="/dashboard" label="Admin" />
          <NavItem to="/dashboard/AllUsers" label="Users" />
          <NavItem to="/dashboard/AllDonationRequests" label="Requests" />
          <NavItem to="/dashboard/ContentManagementPage" label="Content" />
          <NavItem to="/dashboard/funding-money" label="Funding" />
          <NavItem to="/dashboard/profile" label="Profile" />
        </nav>
      </>
    );

  // Volunteer Sidebar / Navbar
  if (role === "volunteer")
    return (
      <>
        <nav className="hidden md:flex flex-col gap-4">
          <NavItem to="/dashboard" label="Volunteer" />
          <NavItem to="/dashboard/AllDonationRequests" label="All Donation Requests" />
          <NavItem to="/dashboard/ContentManagementPage" label="Content" />
          <NavItem to="/dashboard/funding-money" label="Funding Page" />
          <NavItem to="/dashboard/profile" label="Profile" />
        </nav>

        <nav className="flex md:hidden gap-2 overflow-x-auto bg-white shadow p-2">
          <NavItem to="/dashboard" label="Volunteer" />
          <NavItem to="/dashboard/AllDonationRequests" label="Requests" />
          <NavItem to="/dashboard/ContentManagementPage" label="Content" />
          <NavItem to="/dashboard/funding-money" label="Funding" />
          <NavItem to="/dashboard/profile" label="Profile" />
        </nav>
      </>
    );

  // Donor Sidebar / Navbar
  return (
    <>
      <nav className="hidden md:flex flex-col gap-4">
        <NavItem to="/dashboard" label="Donor" />
        <NavItem to="/dashboard/MyDonationRequests" label="My Requests" />
        <NavItem to="/dashboard/create-donation-request" label="Create Donation" />
        <NavItem to="/dashboard/profile" label="Profile" />
      </nav>

      <nav className="flex md:hidden gap-2 overflow-x-auto bg-white shadow p-2">
        <NavItem to="/dashboard" label="Donor" />
        <NavItem to="/dashboard/MyDonationRequests" label="My Requests" />
        <NavItem to="/dashboard/create-donation-request" label="Create" />
        <NavItem to="/dashboard/profile" label="Profile" />
      </nav>
    </>
  );
}
