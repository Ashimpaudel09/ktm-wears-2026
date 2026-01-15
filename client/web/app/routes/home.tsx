import Navbar from "~/Components/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ktm Wears" },
    { name: "hello", content: "Ktm shades!" },
  ];
}

export default function Home() {
  return (
    <div>
      
  <Navbar/>
    </div>
  )
}
