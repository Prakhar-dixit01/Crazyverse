import { PRO_GAMES_DATA } from "@/lib/data";
import NeoListCard from "@/components/NeoListCard";
import Link from "next/link";

export default function ToolsPage() {
  const tools = PRO_GAMES_DATA.filter(item => item.type === "tool");

  const getCategoryTools = (category: string, limit: number = 10) => {
    return tools.filter(t => t.category === category).slice(0, limit);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12">
      <div className="mb-12">
        {/* Hot Reload Force */}
        <h2 className="text-4xl font-black text-black mb-2">Cool tools & utilities, never be stuck again</h2>
        <p className="text-xl text-gray-600 font-medium max-w-4xl">
          Hundreds of hand-picked web tools. Our curated collection of the internet's best utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="flex flex-col gap-8">
          <NeoListCard 
            title="Design Tools"
            subtitle="Make things pretty"
            count={tools.filter(t => t.category === 'Design').length}
            items={getCategoryTools('Design')}
            viewAllLink="/categories/Design"
          />
          <NeoListCard 
            title="Educational"
            subtitle="Learn something new"
            count={tools.filter(t => t.category === 'Educational').length}
            items={getCategoryTools('Educational')}
            viewAllLink="/categories/Educational"
          />
        </div>

        <div className="flex flex-col gap-8">
          <NeoListCard 
            title="Developer"
            subtitle="Code faster"
            count={tools.filter(t => t.category === 'Developer').length}
            items={getCategoryTools('Developer')}
            viewAllLink="/categories/Developer"
          />
          <NeoListCard 
            title="Generators"
            subtitle="Instant creation"
            count={tools.filter(t => t.category === 'Generators').length}
            items={getCategoryTools('Generators')}
            viewAllLink="/categories/Generators"
          />
        </div>

        <div className="flex flex-col gap-8">
          {tools.length > 0 && (
            <Link href={`/play/${tools[0].slug}`} className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0_rgba(0,0,0,1)] flex flex-col overflow-hidden p-6 text-center h-fit hover:-translate-y-1 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all cursor-pointer group">
              <h3 className="font-black text-xl uppercase mb-4 text-gray-500 tracking-widest border-b-2 border-black pb-2 border-dashed group-hover:text-black transition-colors">Featured Tool</h3>
              <div className="w-full aspect-square bg-blue-100 border-4 border-black rounded-lg mb-4 flex items-center justify-center p-4">
                 <div className="w-full h-full bg-white border-4 border-black rounded shadow-[4px_4px_0_rgba(0,0,0,0.2)] flex items-center justify-center relative overflow-hidden group-hover:bg-gray-50 transition-colors">
                   <img src={tools[0].thumbnail} className="w-full h-full object-cover" alt={tools[0].title} />
                 </div>
              </div>
              <div className="flex justify-between items-center bg-yellow-400 border-4 border-black p-2 rounded-lg font-black uppercase text-sm group-hover:bg-yellow-300 transition-colors">
                <span className="truncate flex-1 text-left mr-2">{tools[0].title}</span>
                <span className="text-black bg-white px-2 py-1 rounded border-2 border-black group-hover:bg-black group-hover:text-white transition-colors">Open</span>
              </div>
            </Link>
          )}
          
          <NeoListCard 
            title="Utility"
            subtitle="Everyday helpers"
            count={tools.filter(t => t.category === 'Utility').length}
            items={getCategoryTools('Utility')}
            viewAllLink="/categories/Utility"
          />
        </div>

        <div className="flex flex-col gap-8">
          <NeoListCard 
            title="Recently added"
            subtitle="Fresh out the oven"
            count={10}
            items={tools.slice(0, 10)}
            viewAllLink="/tools"
          />
        </div>

      </div>
    </div>
  );
}
