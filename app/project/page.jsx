import { client, urlFor } from '@/sanity/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Cpu, Github, ExternalLink, Terminal } from 'lucide-react';

async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc)`;
  return await client.fetch(query, {}, { next: { revalidate: 10 } });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-ers-black text-white p-6 md:p-20 font-body">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-tech text-transparent bg-clip-text bg-gradient-to-r from-ers-yellow to-white mb-4">
          PROJECT LABS
        </h1>
        <p className="text-gray-400 font-mono text-sm tracking-widest">// INNOVATION_STATUS: ACTIVE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((proj) => (
          <div key={proj._id} className="group relative bg-ers-dark border border-white/10 hover:border-ers-yellow transition-all duration-300 flex flex-col h-full">
            
            {/* Image Header */}
            <div className="relative h-48 w-full overflow-hidden border-b border-white/10">
              {proj.image ? (
                <Image 
                  src={urlFor(proj.image).width(600).url()} 
                  alt={proj.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center text-gray-700">
                  <Terminal size={40} />
                </div>
              )}
              {/* Status Badge */}
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-ers-yellow text-xs font-mono px-2 py-1 border border-ers-yellow/30">
                {proj.status || 'Prototype'}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-tech text-white mb-2 group-hover:text-ers-yellow transition-colors">{proj.title}</h2>
              <p className="text-gray-400 text-sm mb-6 flex-grow">{proj.description}</p>

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
                <Link href={proj.githubLink} target="_blank" className="mt-auto flex items-center gap-2 text-white hover:text-ers-yellow transition-colors text-sm font-bold border-t border-white/10 pt-4">
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