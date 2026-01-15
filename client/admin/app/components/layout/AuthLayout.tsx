import { Outlet } from "react-router";
import Sidebar from "~/components/common/SideBar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <div>
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="lg:ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
