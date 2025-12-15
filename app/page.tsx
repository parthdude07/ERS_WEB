import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/sanity";
import { ArrowUpRight } from "lucide-react";

// --- 1. UTILITY FUNCTIONS ---

// Shuffle array to randomize photos every time
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Fetch images from the 'gallery' schema
async function getRandomGalleryImages() {
  // 1. Get all gallery documents
  // 2. Return just the 'images' arrays from them
  const query = `*[_type == "gallery" && defined(images)].images[]`;
  
  const images = await client.fetch(query, {}, {
    next: { revalidate: 10 } // Update shuffle every 10 seconds
  });

  // Shuffle and keep only 12 photos
  return shuffleArray(images || []).slice(0, 12);
}

// --- 2. MAIN COMPONENT ---

export default async function Home() {
  const galleryImages = await getRandomGalleryImages();

  return (
    <main className="min-h-screen bg-ers-black text-white selection:bg-ers-yellow selection:text-black font-body">
      
      {/* --- NAV BAR --- */}
      <header className="sticky top-0 z-50">
        <div className="bg-black border-b-4 border-ers-yellow shadow-[0_8px_0_0_#f4c430]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 uppercase font-tech text-sm tracking-[0.2em]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-14 bg-ers-yellow clip-corner flex items-center justify-center text-black font-bold text-lg">
                ERS
              </div>
              <span className="text-ers-yellow/80 font-body text-xs hidden md:block">
                Electronics & Robotics Society
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link className="hover:text-ers-yellow transition-colors" href="/events">
                Events
              </Link>
              <Link className="hover:text-ers-yellow transition-colors" href="/team">
                Team
              </Link>
              <Link className="hover:text-ers-yellow transition-colors" href="/gallery">
                Gallery
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden border-b border-ers-yellow/30">
        <div className="absolute inset-0 bg-gradient-to-br from-ers-dark via-black to-black opacity-90" />
        <div className="absolute inset-x-0 top-0 h-24 barcode-stripe opacity-80" />
        
        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
          <h1 className="font-tech text-6xl md:text-8xl font-bold tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-ers-yellow via-white to-ers-yellow drop-shadow-[0_0_18px_rgba(244,196,48,0.45)]">
            ERS CLUB
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-[#c8c8c8] font-body">
            Industrial cyberpunk hub for makers, coders, and circuit-smiths.
            Building the future one solder joint at a time.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/events" className="px-8 py-3 bg-ers-yellow text-black font-bold font-tech skew-x-[-10deg] hover:bg-white transition-colors">
              <span className="block skew-x-[10deg]">VIEW EVENTS</span>
            </Link>
            <Link href="/team" className="px-8 py-3 border border-ers-yellow text-ers-yellow font-bold font-tech skew-x-[-10deg] hover:bg-ers-yellow/10 transition-colors">
              <span className="block skew-x-[10deg]">MEET THE TEAM</span>
            </Link>
          </div>
        </div>

        {/* Decorative Barcode Stripe */}
        <div className="relative h-16 bg-black border-t border-ers-yellow/30 flex items-center justify-center">
           {/* Add a simple repeating stripe pattern via CSS or SVG here if you have the class defined, or keep empty */}
           <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#ffcc00_2px,#ffcc00_4px)]" />
        </div>
      </section>

      {/* --- NEW GALLERY SECTION --- */}
      {galleryImages.length > 0 && (
        <section className="py-24 px-4 md:px-8 relative bg-ers-dark/50">
           
           {/* Section Header */}
           <div className="flex justify-between items-end mb-12 max-w-6xl mx-auto">
              <div>
                  <h2 className="text-4xl font-tech text-white mb-2 tracking-widest">VISUAL_LOGS</h2>
                  <div className="h-1 w-20 bg-ers-yellow skew-x-[-20deg]" />
              </div>
              <Link href="/gallery" className="hidden md:flex items-center gap-2 text-ers-yellow font-tech hover:underline tracking-widest text-sm">
                  FULL_DATABASE <ArrowUpRight size={18} />
              </Link>
          </div>

          {/* The Cyber-Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-2 md:gap-4 h-[600px] max-w-6xl mx-auto">
            {galleryImages.map((img: any, index: number) => {
              // Layout Logic: First image is Big (2x2), 6th image is Wide (2x1)
              let spanClasses = "";
              if (index === 0) spanClasses = "col-span-2 row-span-2"; 
              else if (index === 5) spanClasses = "md:col-span-2";

              return (
                <div 
                  key={img._key || index} 
                  className={`relative group overflow-hidden bg-black border border-white/10 hover:border-ers-yellow transition-all duration-500 ${spanClasses}`}
                >
                  <Image
                    src={urlFor(img).width(600).height(600).url()}
                    alt="Club gallery photo"
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                  />
                  
                  {/* Yellow Corner Accents */}
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-ers-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-ers-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )
            })}
          </div>

          <div className="mt-8 text-center md:hidden">
               <Link href="/gallery" className="inline-flex items-center gap-2 text-ers-yellow font-tech">
                  VIEW FULL GALLERY <ArrowUpRight size={18} />
              </Link>
          </div>
        </section>
      )}

    </main>
  );
}