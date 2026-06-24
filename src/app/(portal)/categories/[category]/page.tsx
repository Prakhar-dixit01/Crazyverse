import { PRO_GAMES_DATA } from "@/lib/data";
import { notFound } from "next/navigation";
import NeoListCard from "@/components/NeoListCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { use } from "react";

export default function CategoryDetailPage({ params }: { params: Promise<{ category: string }> }) {
  const unwrappedParams = use(params);
  const decodedCategory = decodeURIComponent(unwrappedParams.category);
  
  // Filter items
  const categoryItems = PRO_GAMES_DATA.filter(item => item.category === decodedCategory);

  // If category doesn't exist, just show empty state
  if (categoryItems.length === 0) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <h2 className="text-4xl font-black text-black">Category Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/categories" className="bg-black text-white p-2 hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-black">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="border-b-4 border-black flex-1 pb-4">
          <h2 className="text-4xl font-black text-black tracking-tight uppercase">
            {decodedCategory} Directory
          </h2>
          <p className="text-xl text-gray-500 font-bold uppercase tracking-widest mt-2">
            Showing all {categoryItems.length} entries
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <NeoListCard 
          title={`All ${decodedCategory}`}
          subtitle={`Full list of ${categoryItems[0].type}s`}
          count={categoryItems.length}
          items={categoryItems}
          viewAllLink="/categories"
        />
      </div>
    </div>
  );
}
