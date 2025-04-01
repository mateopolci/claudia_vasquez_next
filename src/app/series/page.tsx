"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function SeriesPage() {
  return (
    <main className={`min-h-screen ${montserrat.className}`}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-2xl font-bold mb-4">Series</h1>
          <p>Por favor, selecciona una serie específica desde el menú de navegación.</p>
        </div>
        
        <Footer />
      </div>
    </main>
  );
}