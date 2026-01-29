// routes/layout.tsx
import { Navbar } from "@/components/Home/Navbar";
import { Footer } from "@/components/Home/Footer";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#0f00ff] selection:text-white">

      <Navbar />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />

    </div>
  );
}
