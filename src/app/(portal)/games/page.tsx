import { PRO_GAMES_DATA } from "@/lib/data";
import NeoListCard from "@/components/NeoListCard";
import Link from "next/link";

export default function GamesPage() {
  const games = PRO_GAMES_DATA.filter(item => item.type === "game");

  // Helper to get top N items of a category
  const getCategoryGames = (category: string, limit: number = 10) => {
    return games.filter(g => g.category === category).slice(0, limit);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-12">
        {/* Hot Reload Force */}
        <h2 className="text-4xl font-black text-black mb-2">Fun, interesting & cool games, never be bored again</h2>
        <p className="text-xl text-gray-600 font-medium max-w-4xl">
          Hundreds of hand-picked browser games. Our curated collection of the internet's best time-killers.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Column 1 */}
        <div className="flex flex-col gap-8">
          <NeoListCard 
            title="Casual Fun"
            subtitle="Easy to play"
            count={games.filter(g => g.category === 'Casual').length}
            items={getCategoryGames('Casual')}
            viewAllLink="/categories/Casual"
          />
          <NeoListCard 
            title="Puzzle Time"
            subtitle="Brain teasers"
            count={games.filter(g => g.category === 'Puzzle').length}
            items={getCategoryGames('Puzzle')}
            viewAllLink="/categories/Puzzle"
          />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-8">
          <NeoListCard 
            title="Adventure"
            subtitle="Epic journeys"
            count={games.filter(g => g.category === 'Adventure').length}
            items={getCategoryGames('Adventure')}
            viewAllLink="/categories/Adventure"
          />
          <NeoListCard 
            title="Racing & Driving"
            subtitle="Need for speed"
            count={games.filter(g => g.category === 'Racing & Driving').length}
            items={getCategoryGames('Racing & Driving')}
            viewAllLink="/categories/Racing%20%26%20Driving"
          />
        </div>

        {/* Column 3 - Featured Widget */}
        <div className="flex flex-col gap-8">
          {games.length > 0 && (
            <Link href={`/play/${games[0].slug}`} className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0_rgba(0,0,0,1)] flex flex-col overflow-hidden p-6 text-center h-fit hover:-translate-y-1 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all cursor-pointer group">
              <h3 className="font-black text-xl uppercase mb-4 text-gray-500 tracking-widest border-b-2 border-black pb-2 border-dashed group-hover:text-black transition-colors">Featured Game</h3>
              <div className="w-full aspect-square bg-gray-200 border-4 border-black rounded-lg mb-4 flex items-center justify-center p-4">
                 <div className="w-full h-full bg-[#9bbc0f] border-4 border-black rounded shadow-inner flex items-center justify-center relative overflow-hidden group-hover:bg-[#8bac0e] transition-colors">
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                   <img src={games[0].thumbnail} className="w-full h-full object-cover mix-blend-multiply opacity-80" alt={games[0].title} />
                 </div>
              </div>
              <div className="flex justify-between items-center bg-gray-100 border-4 border-black p-2 rounded-lg font-black uppercase text-sm group-hover:bg-gray-200 transition-colors">
                <span className="truncate flex-1 text-left mr-2">{games[0].title}</span>
                <span className="text-green-600 bg-white px-2 py-1 rounded border-2 border-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">Play</span>
              </div>
            </Link>
          )}
          
          <NeoListCard 
            title="Multiplayer .IO"
            subtitle="Play with others"
            count={games.filter(g => g.category === '.IO').length}
            items={getCategoryGames('.IO')}
            viewAllLink="/categories/.IO"
          />
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-8">
          <NeoListCard 
            title="Recently added"
            subtitle="Fresh out the oven"
            count={10}
            items={games.slice(0, 10)}
            viewAllLink="/games"
          />
        </div>

      </div>
    </div>
  );
}
