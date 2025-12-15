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
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-tech text-transparent bg-clip-text bg-gradient-to-r from-ers-yellow to-white mb-4">
          CLUB EVENTS
        </h1>
        <div className="h-1 w-32 bg-ers-yellow skew-x-[-20deg]" />
      </div>

      {/* --- UPCOMING EVENTS SECTION --- */}
      {upcomingEvents.length > 0 && (
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-8 bg-ers-yellow" />
            <h2 className="text-3xl md:text-4xl font-tech tracking-wide text-white">
              INCOMING SIGNALS <span className="text-ers-yellow text-lg animate-pulse">(UPCOMING)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} isUpcoming={true} />
            ))}
          </div>
        </section>
      )}

      {/* --- PAST EVENTS SECTION --- */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-3 h-8 bg-gray-600" />
          <h2 className="text-3xl md:text-4xl font-tech tracking-wide text-gray-400">
            ARCHIVED LOGS <span className="text-gray-600 text-lg">(PAST)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((event) => (
            <EventCard key={event._id} event={event} isUpcoming={false} />
          ))}
        </div>
      </section>
    </div>
  );
}

// --- REUSABLE CARD COMPONENT ---
function EventCard({ event, isUpcoming }: { event: Event; isUpcoming: boolean }) {
  const dateObj = new Date(event.date);
  
  // Formatting the date nicely
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
  const formattedTime = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className={`
      group relative flex flex-col bg-ers-dark border border-white/10 overflow-hidden
      ${isUpcoming ? 'hover:border-ers-yellow/50 shadow-[0_0_30px_rgba(255,204,0,0.1)]' : 'opacity-80 hover:opacity-100'}
      transition-all duration-300
    `}>
      
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        {event.coverImage ? (
          <Image
            src={urlFor(event.coverImage).width(800).height(500).url()}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-ers-black flex items-center justify-center border-b border-white/10">
            <span className="text-gray-600 font-tech">NO SIGNAL</span>
          </div>
        )}
        
        {/* Date Overlay Badge */}
        <div className="absolute top-0 right-0 bg-ers-yellow text-black px-4 py-2 font-bold font-tech text-sm skew-x-[-10deg] translate-x-2 -translate-y-1">
          <div className="skew-x-[10deg]">{formattedDate}</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className={`text-2xl font-bold font-tech mb-3 ${isUpcoming ? 'text-white' : 'text-gray-400'}`}>
          {event.title}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow font-mono">
          {event.description}
        </p>

        {/* Metadata Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-white/10 pt-4 mt-auto">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-ers-yellow" />
            <span>{formattedTime}</span>
          </div>
          
          {/* Only show 'Register' arrow if upcoming */}
          {isUpcoming && (
            <div className="text-ers-yellow flex items-center gap-2 group-hover:translate-x-1 transition-transform">
               DETAILS <ArrowRight size={16} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}