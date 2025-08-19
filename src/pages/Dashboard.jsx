import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import DonorDashboard from "./DonorDashboard";
import VolunteerDashboard from "../components/VolunteerDashboard";

export default function Dashboard() {
  const { role, loading } = useRole();

  if (loading) {
    return <h1 className="text-center"><span className="loading loading-spinner loading-xl"></span></h1>;
  }

  if (role === "donor") {
    return <DonorDashboard></DonorDashboard>
  }
  if (role === "volunteer") {
    return <VolunteerDashboard></VolunteerDashboard>;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <Navigate to={"/"} />;
}
