import Link from "next/link";

interface GameCardProps {
  slug: string;
  title: string;
  thumbnail: string;
  category: string;
  type: string;
}

export default function GameCard({ slug, title, thumbnail, category, type }: GameCardProps) {
  return (
    <Link href={`/play/${slug}`} className="group block h-full">
      <div className="bg-white border-4 border-black rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all duration-200 h-full flex flex-col relative">
        
        {/* Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-sm border-2 border-black ${type === 'game' ? 'bg-green-400 text-black' : 'bg-blue-400 text-black'}`}>
            {type}
          </span>
        </div>

        <div className="w-full aspect-square bg-gray-200 relative overflow-hidden border-b-4 border-black group-hover:bg-yellow-200 transition-colors flex items-center justify-center p-4">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
          />
        </div>
        
        <div className="p-3 flex-1 flex flex-col justify-between bg-white">
          <div>
            <p className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-wider">{category}</p>
            <h3 className="font-black text-black leading-tight group-hover:text-red-600 transition-colors line-clamp-2">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
