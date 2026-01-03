import { client, urlFor } from '@/sanity/lib/sanity';
import { sanityFetch } from '@/sanity/lib/live';
import Image from 'next/image';
import Link from 'next/link';
import { Cpu, Github, ExternalLink, Terminal } from 'lucide-react';

async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc)`;
  const { data } = await sanityFetch({ query });
  return data;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-ers-black text-white p-6 md:p-20 font-body">
      <div className="text-center mb-16 animate-fade-in opacity-0 [animation-delay:100ms]">
        <h1 className="text-5xl md:text-7xl font-tech text-transparent bg-clip-text bg-gradient-to-r from-ers-yellow to-white mb-4">
          PROJECT LABS
        </h1>
        <p className="text-gray-400 font-mono text-sm tracking-widest">// INNOVATION_STATUS: ACTIVE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fade-in opacity-0 [animation-delay:300ms]">
        {projects.map((proj) => (
          <div key={proj._id} className="group relative bg-black border border-ers-yellow/40 hover:border-ers-yellow transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_20px_rgba(244,196,48,0.15)] hover:-translate-y-2 overflow-hidden">

            {/* GLOW EFFECT BEHIND */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-ers-yellow/5 to-transparent pointer-events-none z-0" />

            {/* TOP BAR */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-ers-yellow shadow-[0_0_10px_#f4c430] z-20" />

            {/* Image Header */}
            <div className="relative h-48 w-full overflow-hidden border-b border-white/10">
              {proj.image ? (
                <Image
                  src={urlFor(proj.image).width(600).url()}
                  alt={proj.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center text-gray-700">
                  <Terminal size={40} />
                </div>
              )}

              {/* SCANLINE OVERLAY */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-40 ml-[1px]" />

              {/* Status Badge */}
              <div className="absolute top-3 right-2 bg-black/90 backdrop-blur text-ers-yellow text-xs font-mono px-2 py-1 border border-ers-yellow/30 z-20">
                {proj.status || 'Prototype'}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow relative z-20">
              <h2 className="text-2xl font-tech text-white mb-2 group-hover:text-ers-yellow transition-colors duration-300">{proj.title}</h2>
              <p className="text-gray-400 text-sm mb-6 flex-grow font-mono line-clamp-3">{proj.description}</p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.techStack?.map((tech) => (
                  <span key={tech} className="text-xs font-mono text-ers-yellow bg-ers-yellow/10 px-2 py-1 rounded-sm border border-ers-yellow/20">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer Link */}
              {proj.githubLink && (
                <Link href={proj.githubLink} target="_blank" className="mt-auto flex items-center gap-2 text-white hover:text-ers-yellow transition-colors text-sm font-bold border-t border-white/10 pt-4 group-hover:border-ers-yellow/30">
                  <Github size={16} /> VIEW SOURCE CODE <ExternalLink size={12} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}