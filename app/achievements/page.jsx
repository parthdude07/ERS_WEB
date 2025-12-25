import { client, urlFor } from '@/sanity/lib/sanity';
import Image from 'next/image';
import { Trophy, Calendar, Users } from 'lucide-react';

async function getAchievements() {
  const query = `*[_type == "achievement"] | order(date desc)`;
  return await client.fetch(query, {}, { next: { revalidate: 10 } });
}

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="min-h-screen bg-ers-black text-white p-6 md:p-20 font-body">
      <div className="text-center mb-16 animate-fade-in opacity-0 [animation-delay:100ms]">
        <h1 className="text-5xl md:text-7xl font-tech text-white mb-4">
          HALL OF FAME
        </h1>
        <div className="h-1 w-32 bg-ers-yellow mx-auto skew-x-[-20deg]" />
      </div>

      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in opacity-0 [animation-delay:300ms]">
        {achievements.map((item) => (
          <div key={item._id} className="relative flex flex-col md:flex-row bg-ers-dark border border-white/10 hover:border-ers-yellow/50 transition-all p-6 md:p-8 gap-6 group">

            {/* Trophy Icon Decoration */}
            <div className="absolute -top-3 -left-3 bg-ers-yellow text-black p-2 skew-x-[-10deg] shadow-lg shadow-ers-yellow/20">
              <Trophy size={20} />
            </div>

            {/* Image */}
            <div className="w-full md:w-1/3 relative h-48 md:h-auto overflow-hidden border border-white/5">
              {item.image && (
                <Image
                  src={urlFor(item.image).width(500).url()}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              )}
            </div>

            {/* Text Content */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-ers-yellow font-tech text-xl tracking-wider uppercase">{item.event}</span>
                <span className="h-px flex-1 bg-white/10"></span>
                <div className="flex items-center gap-1 text-gray-500 text-xs font-mono">
                  <Calendar size={12} /> {item.date}
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4 font-tech">{item.title}</h2>

              {item.teamMembers && (
                <div className="flex items-start gap-2 text-gray-400 text-sm mt-auto bg-black/30 p-3 rounded-sm">
                  <Users size={16} className="mt-1 text-ers-yellow" />
                  <div>
                    <span className="block text-xs uppercase text-gray-500 mb-1">Squad</span>
                    {item.teamMembers}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}