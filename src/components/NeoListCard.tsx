import Link from "next/link";

interface NeoListCardProps {
  title: string;
  subtitle: string;
  count: number;
  items: { slug: string; title: string; thumbnail?: string }[];
  viewAllLink?: string;
}

export default function NeoListCard({ title, subtitle, count, items, viewAllLink = "/categories" }: NeoListCardProps) {
  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b-2 border-black bg-gray-50">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-black text-black tracking-tight uppercase">{title}</h2>
          <span className="bg-black text-white text-xs font-black px-2 py-1 uppercase tracking-widest">
            {count}
          </span>
        </div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{subtitle}</p>
      </div>

      {/* List */}
      <div className="flex-1 p-2 bg-white">
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={item.slug}>
              <Link 
                href={`/play/${item.slug}`}
                className="flex items-center p-2 hover:bg-black hover:text-white group transition-colors border border-transparent hover:border-black"
              >
                <span className="w-6 text-gray-400 group-hover:text-gray-300 font-bold text-xs">
                  {index + 1}.
                </span>
                
                {item.thumbnail ? (
                  <div className="w-8 h-8 overflow-hidden mr-3 flex-shrink-0 bg-white border border-gray-200 group-hover:border-gray-700">
                    <img src={item.thumbnail} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                ) : (
                  <div className="w-8 h-8 mr-3 flex-shrink-0 bg-gray-200 group-hover:bg-gray-800 transition-colors" />
                )}

                <span className="font-bold text-sm flex-1 truncate transition-colors">
                  {item.title}
                </span>

                <span className="text-gray-300 group-hover:text-white font-bold ml-2">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-3 border-t-2 border-black text-center bg-gray-50 flex">
        <Link href={viewAllLink} className="flex-1 text-black font-black text-xs hover:bg-black hover:text-white px-4 py-2 border-2 border-black transition-colors uppercase tracking-widest block text-center cursor-pointer">
          View all {title}
        </Link>
      </div>
    </div>
  );
}
