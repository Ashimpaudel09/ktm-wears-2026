import { Navbar } from "@/components/Home/Navbar";
import type { Route } from "./+types/home";
import { Categories } from "@/components/Home/Categories";
import { Hero } from "@/components/Home/Hero";
import { BrandLogos } from "@/components/Home/BrandLogos";
import { FeaturedCollection } from "@/components/Home/FeaturedCollection";
import { SocialMedia } from "@/components/Home/SocialMedia";
import { Benefits } from "@/components/Home/Benefits";
import { BrandHighlight } from "@/components/Home/BrandHighlight";
import { Footer } from "@/components/Home/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return(
     <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#0f00ff] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <BrandLogos />
        <Categories />
        <FeaturedCollection />
        <BrandHighlight />
        <SocialMedia />
        <Benefits />
      </main>
      <Footer />
    </div>
  );
}
