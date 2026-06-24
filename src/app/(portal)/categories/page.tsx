import { PRO_GAMES_DATA } from "@/lib/data";
import Link from "next/link";
import { Folder } from "lucide-react";

export default function CategoriesPage() {
  // Extract unique categories and their counts
  const categories = PRO_GAMES_DATA.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { count: 0, type: item.type };
    }
    acc[item.category].count += 1;
    return acc;
  }, {} as Record<string, { count: number, type: string }>);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12">
      <div className="mb-12 border-b-4 border-black pb-6">
        <h2 className="text-4xl font-black text-black tracking-tight uppercase">Directory</h2>
        <p className="text-xl text-gray-500 font-bold uppercase tracking-widest mt-2">
          Browse all categories across the CrazyVerse
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(Object.entries(categories) as [string, { count: number; type: string }][]).map(([category, { count, type }]) => (
          <Link 
            key={category} 
            href={type === 'game' ? '/games' : '/tools'}
            className="group bg-white border-2 border-black p-6 hover:bg-black hover:text-white hover:-translate-y-1 transition-all shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_rgba(0,0,0,1)]"
          >
            <div className="flex items-center justify-between mb-4">
              <Folder className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
              <span className="bg-black group-hover:bg-white group-hover:text-black text-white text-xs font-black px-2 py-1 uppercase tracking-widest transition-colors">
                {count}
              </span>
            </div>
            <h3 className="text-xl font-black tracking-tight uppercase">{category}</h3>
            <p className="text-sm font-bold text-gray-500 group-hover:text-gray-300 uppercase tracking-widest mt-1">
              {type}s
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
