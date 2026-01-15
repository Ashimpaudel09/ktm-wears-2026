import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Package,
  Folder,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../lib/store/authStore";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${
       isActive
         ? "bg-primary-foreground text-primary"
         : "text-primary-foreground/80 hover:bg-primary-foreground/10"
     }`;

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-primary-foreground/20 bg-primary text-primary-foreground">
        <button onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="font-bold">Admin</h1>
      </div>

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64
        bg-primary text-primary-foreground
        border-r border-primary-foreground/20
        z-50 transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-primary-foreground/20">
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4">
          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </NavLink>

          <NavLink to="/categories" className={linkClass}>
            <Folder className="h-5 w-5" />
            Categories
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            <Package className="h-5 w-5" />
            Products
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-primary-foreground/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
                       text-red-400 hover:bg-red-500/20 transition"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
