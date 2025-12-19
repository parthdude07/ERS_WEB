import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  imageUrl?: string;
}

export default function TeamCard({ name, role, imageUrl }: TeamCardProps) {
  return (
    <div className="aspect-[3/4] w-[21rem] h-[28rem] bg-black border border-ers-yellow/40">

      {/* TOP BAR */}
      <div className="h-2 bg-ers-yellow" />

      {/* IMAGE */}
      <div className="relative h-[65%] w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl text-ers-yellow font-tech">
            {name.charAt(0)}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-xl font-tech text-white tracking-wide">
          {name}
        </h3>

        <p className="text-sm uppercase tracking-widest text-ers-yellow">
          {role}
        </p>

        {/* subtle divider */}
        <div className="mt-3 h-px bg-ers-yellow/30" />
      </div>
    </div>
  );
}
