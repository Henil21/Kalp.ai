import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/home/Hero";
import Philosophy from "../components/Home/Philosophy";
import Editorial from "../components/Home/Editorial";
import Architecture from "../components/Home/Architecture";

export default function Home() {
  return (
    <div className="bg-noise">
      <div className="content-layer flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <Philosophy />
        <Editorial />
        <Architecture />
        <Footer />
      </div>
    </div>
  );
}
