import Cursor from "@/component/cursor";
import { Nav } from "@/component/nav";
// import { Starfield } from "@/component/starfield";
import { Dossier } from "@/pages/dossier";
import { Hero } from "@/pages/hero";
import { Log } from "@/pages/log";
import { Pilot } from "@/pages/pilot";
import Reel from "@/pages/reel";
import { Signal } from "@/pages/signal";
import { Studio } from "@/pages/studio/indesx";
import { Systems } from "@/pages/system";
import Work from "@/pages/work";

import Image from "next/image";

export default function Home() {
  return (
<main className="relative">
      {/* <Starfield /> */}
      <Cursor />
      <Nav />
      <Hero />
      <Pilot />
      <Log />
      <Systems />
      <Reel />
      <Work />
      <Studio />
      <Dossier />
      <Signal />
    </main>
  );
}
