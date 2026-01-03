import { client, urlFor } from "@/sanity/lib/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ExternalLink } from 'lucide-react';

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getEvent(slug: string) {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    title,
    date,
    description,
    coverImage,
    gallery,
    button1,
    button2
  }`;
  
  const { data: event } = await sanityFetch({ query, params: { slug } });
  return event;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return notFound();
  }

  const dateObj = new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-ers-black text-white font-body selection:bg-ers-yellow selection:text-black">

      {/* HERO SECTION */}
      <div className="relative h-[50vh] w-full overflow-hidden border-b border-ers-yellow/30">
        {event.coverImage ? (
          <Image
            src={urlFor(event.coverImage).url()}
            alt={event.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <span className="text-gray-600 font-tech text-2xl">NO SIGNAL</span>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ers-black via-ers-black/50 to-transparent" />

        {/* Content Container */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-ers-yellow hover:text-white transition-colors mb-6 font-mono text-sm"
          >
            <ArrowLeft size={16} /> BACK TO LOGS
          </Link>

          <h1 className="text-4xl md:text-6xl font-tech font-bold text-white mb-4 leading-tight animate-fade-in opacity-0 [animation-delay:100ms]">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-300 font-mono text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-ers-yellow" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-ers-yellow" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in opacity-0 [animation-delay:300ms]">

        {/* ACTION BUTTONS */}
        {(event.button1 || event.button2) && (
          <div className="flex flex-wrap gap-4 mb-12">
            {event.button1?.url && (
              <a
                href={event.button1.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ers-yellow text-black font-bold rounded hover:bg-white transition-colors font-display"
              >
                {event.button1.label || "Link 1"} <ExternalLink size={18} />
              </a>
            )}
            {event.button2?.url && (
              <a
                href={event.button2.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-ers-yellow text-ers-yellow font-bold rounded hover:bg-ers-yellow hover:text-black transition-colors font-display"
              >
                {event.button2.label || "Link 2"} <ExternalLink size={18} />
              </a>
            )}
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-tech text-ers-yellow mb-6 border-l-4 border-ers-yellow pl-4">
            MISSION BRIEFING
          </h2>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line font-body text-lg">
            {event.description}
          </div>
        </div>

        {/* GALLERY SECTION (If exists) */}
        {event.gallery && event.gallery.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-tech text-ers-yellow mb-8 border-l-4 border-ers-yellow pl-4">
              VISUAL RECORDS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.gallery.map((image: any, index: number) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden border border-white/10 hover:border-ers-yellow/50 transition-colors group">
                  <Image
                    src={urlFor(image).url()}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
