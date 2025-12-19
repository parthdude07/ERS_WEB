import Link from "next/link";
import HeroRobot from "@/components/HeroRobot";

/* -------------------------------
   Page Component (Server)
--------------------------------*/

export default async function Home() {

  return (
    <main className="min-h-screen bg-ers-black text-white selection:bg-ers-yellow selection:text-black font-body">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-ers-yellow/30">
        <div className="absolute inset-0 bg-gradient-to-br from-ers-dark via-black to-black opacity-90" />
        {/* <div className="absolute inset-x-0 top-0 h-24 barcode-stripe opacity-80" /> */}

        <div className="relative w-full grid min-h-[80vh] grid-cols-1 md:grid-cols-2 gap-8 px-6 py-20 items-center">

          {/* LEFT: ROBOT */}
          <div className="relative flex items-center justify-center overflow-visible order-2 md:order-1">

            {/* Glow layer */}
            <div
              className="
                absolute
                inset-0
                flex items-center justify-center
                pointer-events-none
                z-0
              "
            >
            <div className="w-72 h-56 md:w-90 md:h-70 bg-ers-yellow/20 rounded-full blur-3xl -translate-x-20 md:-translate-x-20" />

            </div>

            {/* Canvas */}
            <div className="relative h-[60vh] md:h-[70vh] w-full z-10">
              <HeroRobot />
            </div>

          </div>


          {/* RIGHT: TEXT */}
          <div className="flex flex-col justify-center text-left md:pl-12 order-1 md:order-2">

            <h1 className="font-tech text-5xl md:text-7xl font-bold tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-ers-yellow via-white to-ers-yellow drop-shadow-[0_0_18px_rgba(244,196,48,0.45)]">
              ERS CLUB
            </h1>

            <p className="mt-6 max-w-xl text-lg md:text-xl text-[#c8c8c8] font-body">
              Industrial cyberpunk hub for makers, coders, and circuit-smiths.
              Building the future one solder joint at a time.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="px-8 py-3 bg-ers-yellow text-black font-bold font-tech skew-x-[-10deg] hover:bg-white transition-colors"
              >
                <span className="block skew-x-[10deg]">VIEW EVENTS</span>
              </Link>

              <Link
                href="/team"
                className="px-8 py-3 border border-ers-yellow text-ers-yellow font-bold font-tech skew-x-[-10deg] hover:bg-ers-yellow/10 transition-colors"
              >
                <span className="block skew-x-[10deg]">MEET THE TEAM</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
