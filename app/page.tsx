import Link from "next/link";
import HeroRobot from "@/components/HeroRobot";
import { urlFor } from "@/sanity/lib/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import Image from "next/image";

async function getGalleryImages() {
  const query = `
    *[_type == "gallery" && defined(images)]{
      images
    }
  `;
  const { data: collections } = await sanityFetch({ query });
  return collections.flatMap((c: any) => c.images || []);
}


/* -------------------------------
   Page Component (Server)
--------------------------------*/

export default async function Home() {
  const images = await getGalleryImages();

  return (
    <main className="min-h-screen bg-ers-black text-white selection:bg-ers-yellow selection:text-black font-body">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-ers-yellow/30">
        <div className="absolute inset-0 bg-gradient-to-br from-ers-dark via-black to-black opacity-90" />

        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,196,48,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,196,48,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative w-full grid min-h-[85vh] lg:min-h-[90vh] grid-cols-1 md:grid-cols-2 gap-8 px-6 py-20 items-center max-w-7xl mx-auto">

          {/* LEFT: ROBOT (Mobile: Order 1, Desktop: Order 2) Wait.. original was Mobile: Order 2, Desktop: Order 1.  */}
          {/* Let's keep the user's original layout preference but make it responsive. Original: order-2 md:order-1 for robot */}
          <div className="relative flex items-center justify-center overflow-visible order-2 md:order-1 animate-fade-in [animation-delay:200ms] opacity-0">

            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-64 h-64 md:w-[500px] md:h-[500px] bg-ers-yellow/10 rounded-full blur-[100px] -translate-x-10" />
            </div>

            {/* Canvas */}
            <div className="relative h-[50vh] md:h-[70vh] w-full z-10 transition-transform duration-700 hover:scale-[1.02]">
              <HeroRobot />
            </div>
          </div>

          {/* RIGHT: TEXT */}
          <div className="flex flex-col justify-center text-left md:pl-12 order-1 md:order-2 z-20">

            <h1 className="font-tech text-6xl md:text-8xl font-bold tracking-[0.05em] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-ers-yellow via-white to-ers-yellow drop-shadow-[0_0_25px_rgba(244,196,48,0.3)] animate-fade-in [animation-delay:100ms] opacity-0">
              ERS CLUB
            </h1>

            <p className="mt-6 max-w-xl text-lg md:text-xl text-[#c8c8c8] font-light leading-relaxed animate-fade-in [animation-delay:300ms] opacity-0">
              Industrial cyberpunk hub for makers, coders, and circuit-smiths.
              Building the future one solder joint at a time.
            </p>

            <div className="mt-10 flex flex-wrap gap-6 animate-fade-in [animation-delay:500ms] opacity-0">
              <Link href="/events" className="group relative px-8 py-3 bg-ers-yellow text-black font-bold font-tech skew-x-[-10deg] hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,196,48,0.6)]">
                <span className="block skew-x-[10deg]">VIEW EVENTS</span>
                <div className="absolute inset-0 border border-white opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
              </Link>

              <Link href="/team" className="group relative px-8 py-3 border border-ers-yellow text-ers-yellow font-bold font-tech skew-x-[-10deg] hover:bg-ers-yellow/10 transition-colors">
                <span className="block skew-x-[10deg]">MEET THE TEAM</span>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-ers-yellow group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section className="px-6 md:px-24 py-24">
        {/* Title */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-center font-tech text-4xl md:text-6xl tracking-widest text-ers-yellow drop-shadow-[0_0_10px_rgba(244,196,48,0.3)]">
            SIGNAL ARCHIVE
          </h2>
          <div className="h-1 w-24 bg-ers-yellow mt-4 rounded-full shadow-[0_0_10px_#f4c430]" />
        </div>


        {/* Collage */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
          {images.map((img: any, index: number) => (
            <div
              key={img._key || index}
              className="
                mb-4 break-inside-avoid group relative overflow-hidden bg-black border border-white/10
                transition-transform duration-500 hover:-translate-y-2 hover:z-10 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]
              "
            >
              <Image
                src={urlFor(img).width(600).url()}
                alt="ERS Gallery"
                width={600}
                height={800}
                className="
                  w-full h-auto object-cover
                  opacity-90
                  transition-all duration-700 ease-out
                  group-hover:opacity-100
                  group-hover:scale-110
                "
              />
              {/* Overlay Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="absolute inset-0 pointer-events-none border-2 border-ers-yellow/0 group-hover:border-ers-yellow/50 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
