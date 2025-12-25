import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  imageUrl?: string;
  linkedin?: string;
}

export default function TeamCard({
  name,
  role,
  imageUrl,
  linkedin,
}: TeamCardProps) {
  return (
    <div className="group relative aspect-[3/4] w-full max-w-sm h-auto min-h-[28rem] bg-black border border-ers-yellow/40 hover:border-ers-yellow transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,196,48,0.15)] hover:-translate-y-2">

      {/* GLOW EFFECT BEHIND */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-ers-yellow/5 to-transparent pointer-events-none" />

      {/* TOP BAR */}
      <div className="h-2 bg-ers-yellow shadow-[0_0_10px_#f4c430]" />

      {/* IMAGE */}
      <div className="relative h-[65%] w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl text-ers-yellow font-tech bg-ers-gray/20">
            {name.charAt(0)}
          </div>
        )}

        {/* SCANLINE OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-40" />
      </div>

      {/* INFO */}
      <div className="p-5 flex flex-col gap-2 relative z-20">
        <h3 className="text-xl font-tech text-white tracking-wide group-hover:text-ers-yellow transition-colors duration-300">
          {name}
        </h3>

        <p className="text-sm uppercase tracking-widest text-ers-yellow/80 font-mono">
          {role}
        </p>

        <div className="mt-3 h-px bg-ers-yellow/30 group-hover:bg-ers-yellow group-hover:w-full w-10 transition-all duration-500" />
      </div>

      {/* LINKEDIN */}
      {linkedin && (
        <Link
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="
            absolute bottom-4 right-4
            flex items-center justify-center
            w-9 h-9
            border border-ers-yellow/40
            text-ers-yellow
            hover:bg-ers-yellow hover:text-black
            transition-all duration-300
            hover:scale-110
            z-30
          "
          aria-label={`${name} LinkedIn`}
        >
          <Linkedin size={18} />
        </Link>
      )}
    </div>
  );
}
