import { client, urlFor } from '@/sanity/lib/sanity';
import Image from 'next/image';

// Interface for type safety
interface Member {
  _id: string;
  name: string;
  role: string;
  photo: any;
  linkedin?: string;
}

// Fetch data function
async function getTeam() {
  const query = `*[_type == "teamMember"] | order(name asc)`;
  return await client.fetch(query);
}

export default async function TeamPage() {
  const members: Member[] = await getTeam();

  // Filter logic: Separate FICs from Students
  const fics = members.filter((m) => m.role === 'FIC');
  const coordinators = members.filter((m) => m.role === 'Coordinator');
  const team = members.filter((m) => m.role === 'Member' || m.role === 'Co-Coordinator');

  return (
    <div className="min-h-screen bg-ers-black text-white p-8 md:p-24 font-body">
      <h1 className="text-5xl font-tech text-ers-yellow mb-16 text-center">OUR TEAM</h1>

      {/* Section 1: FICs (Highlighted) */}
      <section className="mb-20">
        <h2 className="text-3xl font-tech border-l-4 border-ers-yellow pl-4 mb-8">FACULTY IN-CHARGE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {fics.map((fic) => (
            <div key={fic._id} className="bg-ers-dark border border-ers-yellow/30 p-6 flex items-center gap-6 rounded-lg hover:border-ers-yellow transition-all">
              {fic.photo && (
                <Image 
                  src={urlFor(fic.photo).width(200).height(200).url()} 
                  alt={fic.name} 
                  width={100} 
                  height={100} 
                  className="rounded-full object-cover border-2 border-ers-yellow"
                />
              )}
              <div>
                <h3 className="text-2xl font-bold font-tech">{fic.name}</h3>
                <p className="text-ers-yellow">Faculty In-Charge</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Coordinators */}
      <section className="mb-20">
        <h2 className="text-3xl font-tech border-l-4 border-white pl-4 mb-8">COORDINATORS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coordinators.map((coord) => (
            <div key={coord._id} className="group relative overflow-hidden bg-ers-dark h-80">
              {coord.photo && (
                <Image 
                  src={urlFor(coord.photo).width(400).height(500).url()} 
                  alt={coord.name} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
              )}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-xl font-bold font-tech text-white">{coord.name}</h3>
                <p className="text-ers-yellow text-sm">{coord.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Section 3: Members (Simple Grid) */}
      <section>
        <h2 className="text-2xl font-tech text-gray-400 mb-8">CORE MEMBERS</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {team.map((mem) => (
            <div key={mem._id} className="bg-ers-dark p-4 text-center border border-white/10">
              <div className="w-20 h-20 mx-auto bg-gray-700 rounded-full mb-3 overflow-hidden">
                 {mem.photo && <Image src={urlFor(mem.photo).width(100).url()} width={80} height={80} alt={mem.name} />}
              </div>
              <p className="font-bold text-sm">{mem.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}