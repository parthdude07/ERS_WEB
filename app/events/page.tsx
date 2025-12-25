import { client, urlFor } from '@/sanity/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

// 1. Define what an Event looks like (Type Safety)
interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  coverImage: any;
  description: string;
}

// 2. Fetch data function
// We order by date descending (newest first)
async function getEvents() {
  const query = `*[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    coverImage,
    description
  }`;
  return await client.fetch(query);
}

export default async function EventsPage() {
  const allEvents: Event[] = await getEvents();

  // 3. Logic to split Upcoming vs Past
  const now = new Date();

  const upcomingEvents = allEvents.filter(event => new Date(event.date) >= now);
  // Reverse past events so the most recent "past" event is at the top of its section
  const pastEvents = allEvents.filter(event => new Date(event.date) < now);

  return (
    <div className="min-h-screen bg-ers-black text-white p-8 md:p-24 font-body">

      {/* Header */}
      <div className="flex flex-col items-center mb-16 text-center animate-fade-in opacity-0 [animation-delay:100ms]">
        <h1 className="text-5xl md:text-7xl font-tech text-transparent bg-clip-text bg-gradient-to-r from-ers-yellow to-white mb-4">
          CLUB EVENTS
        </h1>
        <div className="h-1 w-32 bg-ers-yellow skew-x-[-20deg]" />
      </div>

      {/* --- UPCOMING EVENTS SECTION --- */}
      {upcomingEvents.length > 0 && (
        <section className="mb-24 animate-fade-in opacity-0 [animation-delay:300ms]">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-8 bg-ers-yellow" />
            <h2 className="text-3xl md:text-4xl font-tech tracking-wide text-white">
              INCOMING SIGNALS <span className="text-ers-yellow text-lg animate-pulse">(UPCOMING)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} isUpcoming={true} />
            ))}
          </div>
        </section>
      )}

      {/* --- PAST EVENTS SECTION --- */}
      <section className="animate-fade-in opacity-0 [animation-delay:500ms]">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-3 h-8 bg-gray-600" />
          <h2 className="text-3xl md:text-4xl font-tech tracking-wide text-gray-400">
            ARCHIVED LOGS <span className="text-gray-600 text-lg">(PAST)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {pastEvents.map((event) => (
            <EventCard key={event._id} event={event} isUpcoming={false} />
          ))}
        </div>
      </section>
    </div>
  );
}

// --- REUSABLE CARD COMPONENT ---
function EventCard({
  event,
  isUpcoming,
}: {
  event: Event;
  isUpcoming: boolean;
}) {
  const dateObj = new Date(event.date);

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const CardContent = (
    <div
      className={`
        group relative flex flex-col bg-black overflow-hidden
        border transition-all duration-300 h-full
        ${isUpcoming
          ? "border-ers-yellow/40 hover:border-ers-yellow hover:shadow-[0_0_20px_rgba(244,196,48,0.15)] hover:-translate-y-2"
          : "border-white/10 hover:border-white/30 hover:-translate-y-1"
        }
      `}
    >
      {/* GLOW EFFECT BEHIND */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-ers-yellow/5 to-transparent pointer-events-none z-0" />

      {/* TOP BAR */}
      <div className={`
        absolute top-0 left-0 right-0 h-1 z-20 shadow-[0_0_10px_#f4c430]
        ${isUpcoming ? "bg-ers-yellow" : "bg-gray-600"}
      `} />

      {/* IMAGE */}
      <div className="relative h-64 w-full overflow-hidden">
        {event.coverImage ? (
          <Image
            src={urlFor(event.coverImage).width(800).height(500).url()}
            alt={event.title}
            fill
            className={`
              object-cover transition-transform duration-700 ease-out
              ${isUpcoming ? "group-hover:scale-110" : "opacity-80"}
            `}
          />
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <span className="text-gray-600 font-tech tracking-widest">
              NO SIGNAL
            </span>
          </div>
        )}

        {/* SCANLINE OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-40 ml-[1px]" />

        {/* DATE BADGE */}
        <div
          className={`
            absolute top-3 right-0 px-4 py-2 font-tech text-sm font-bold z-20
            skew-x-[-10deg] translate-x-2
            ${isUpcoming
              ? "bg-ers-yellow text-black"
              : "bg-gray-700 text-gray-300"
            }
          `}
        >
          <div className="skew-x-[10deg]">{formattedDate}</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow relative z-20">
        <h3
          className={`
            text-2xl font-tech mb-3 transition-colors duration-300
            ${isUpcoming ? "text-white group-hover:text-ers-yellow" : "text-gray-400"}
          `}
        >
          {event.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-3 mb-6 font-mono">
          {event.description}
        </p>

        {/* FOOTER */}
        <div className="mt-auto flex items-center justify-between text-sm border-t border-white/10 pt-4 group-hover:border-ers-yellow/30 transition-colors">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={16} className={isUpcoming ? "text-ers-yellow" : "text-gray-600"} />
            <span>{formattedTime}</span>
          </div>

          {isUpcoming ? (
            <div className="flex items-center gap-2 text-ers-yellow group-hover:translate-x-1 transition-transform font-bold">
              DETAILS <ArrowRight size={16} />
            </div>
          ) : (
            <span className="text-gray-500 font-tech tracking-widest">
              ARCHIVED
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (event.slug?.current) {
    return (
      <Link href={`/events/${event.slug.current}`} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
