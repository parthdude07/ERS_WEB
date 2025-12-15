import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/sanity";
import { FolderOpen, Image as ImageIcon } from "lucide-react";

// --- 1. TYPES & DATA FETCHING ---

interface GalleryCollection {
  _id: string;
  title: string;
  images: any[];
  _updatedAt: string;
}

async function getAllGalleries() {
  // Fetch all collections, newest updated first
  const query = `*[_type == "gallery" && defined(images)] | order(_updatedAt desc)`;
  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

// --- 2. MAIN COMPONENT ---

export default async function GalleryPage() {
  const collections: GalleryCollection[] = await getAllGalleries();

  return (
    <main className="min-h-screen bg-ers-black text-white selection:bg-ers-yellow selection:text-black font-body">
      
      {/* --- NAVBAR (Consistent with Home) --- */}
      <header className="sticky top-0 z-50">
        <div className="bg-black border-b-4 border-ers-yellow shadow-[0_8px_0_0_#f4c430]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 uppercase font-tech text-sm tracking-[0.2em]">
            <div className="flex items-center gap-3">
              <Link href="/" className="h-10 w-14 bg-ers-yellow clip-corner flex items-center justify-center text-black font-bold text-lg hover:bg-white transition-colors">
                ERS
              </Link>
              <span className="text-ers-yellow/80 font-body text-xs hidden md:block">
                / IMAGE_DATABASE
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link className="hover:text-ers-yellow transition-colors" href="/">
                Home
              </Link>
              <Link className="hover:text-ers-yellow transition-colors" href="/events">
                Events
              </Link>
              <Link className="text-ers-yellow" href="/gallery">
                Gallery
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* --- HEADER SECTION --- */}
      <section className="relative py-20 px-6 border-b border-white/10 bg-ers-dark/30">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-tech text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-4 tracking-tighter">
            CLASSIFIED ARCHIVES
          </h1>
          <p className="text-ers-yellow font-mono text-sm tracking-[0.3em] uppercase opacity-80">
            // TOTAL_COLLECTIONS: {collections.length}
          </p>
          <div className="h-1 w-24 bg-ers-yellow mx-auto mt-8 skew-x-[-20deg]" />
        </div>
      </section>

      {/* --- GALLERY COLLECTIONS --- */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {collections.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-700 rounded-lg">
            <h2 className="text-2xl font-tech text-gray-500">NO DATA FOUND</h2>
            <p className="text-gray-600 mt-2">Upload images in the Studio to populate the database.</p>
          </div>
        ) : (
          collections.map((collection) => (
            <section key={collection._id} className="mb-24">
              
              {/* Collection Header */}
              <div className="flex items-end gap-4 mb-8 border-b border-ers-yellow/20 pb-2">
                <FolderOpen className="text-ers-yellow w-8 h-8" />
                <div>
                  <h2 className="text-3xl font-tech text-white leading-none">
                    {collection.title}
                  </h2>
                </div>
                <div className="ml-auto text-xs font-mono text-gray-500 hidden md:block">
                  ID: {collection._id.slice(0, 8)} // ITEMS: {collection.images?.length || 0}
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {collection.images?.map((img: any, index: number) => (
                  <div 
                    key={img._key || index} 
                    className="group relative aspect-square bg-black border border-white/5 overflow-hidden hover:border-ers-yellow transition-all duration-300"
                  >
                    <Image
                      src={urlFor(img).width(500).height(500).url()}
                      alt={collection.title}
                      fill
                      className="object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                    
                    {/* Hover Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <div className="flex items-center gap-2 text-ers-yellow text-xs font-mono">
                        <ImageIcon size={12} />
                        <span>IMG_{index + 1}.JPG</span>
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-ers-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-ers-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* --- FOOTER DECORATION --- */}
      <footer className="border-t border-ers-yellow/30 bg-black py-8 text-center">
        <p className="font-tech text-gray-600 text-sm">END OF ARCHIVE</p>
        <div className="w-full h-4 mt-4 barcode-stripe opacity-20" />
      </footer>
    </main>
  );
}