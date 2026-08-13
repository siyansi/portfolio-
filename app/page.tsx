"use client";

import { useState } from "react";
import { Nav } from "@/component/nav";
import { Hero } from "@/pages/hero";
import { Preloader } from "@/lib/Preloader";
import { Reviews, Skills, Contact } from "@/pages/system";
import { Photography, UiUx, Videos } from "@/pages/work";
import { Experience } from "@/pages/studio/indesx";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <main className="page-bg relative min-h-screen text-foreground overflow-clip" style={{ fontFamily: 'Poppins' }}>
        <Nav />

        {/* 1. Hero with Clip-Wipe & Collapsing Scroll */}
        <Hero />

        {/* 2. Experience Section */}
        <Experience />

        {/* 3. Photography Section */}
        <Photography />

        {/* 4. Portfolio & System Sections */}
        <div className="relative z-20 bg-background pt-8">
          <Videos />
          <UiUx />
          <Skills />
          <Reviews />
          <Contact />
        </div>
      </main>
    </>
  );
}