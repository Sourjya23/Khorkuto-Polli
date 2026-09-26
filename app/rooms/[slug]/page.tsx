import { Metadata } from 'next';
import { getRoomBySlug, getProductsByRoom } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const room = getRoomBySlug(resolvedParams.slug);
  if (!room) return { title: 'Room Not Found' };
  return {
    title: `Shop for ${room.name} | খড়কুটো পল্লী`,
    description: room.description,
  };
}

export default async function RoomPage({ params }: Props) {
  const resolvedParams = await params;
  const room = getRoomBySlug(resolvedParams.slug);
  
  if (!room) {
    notFound();
  }

  const products = getProductsByRoom(resolvedParams.slug);

  return (
    <div className="bg-paper min-h-screen py-10">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Banner */}
        <div className="relative w-full h-[40vh] min-h-[300px] rounded-2xl overflow-hidden mb-12 shadow-soft">
          <img 
            src={room.image}
            alt={room.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
            <span className="text-sm font-bold tracking-widest uppercase mb-2">Shop By Room</span>
            <h1 className="font-serif text-5xl md:text-6xl mb-4">{room.name}</h1>
            <p className="max-w-2xl text-lg opacity-90">{room.description}</p>
          </div>
        </div>

        {/* Filters/Sort */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-ink-muted/20">
          <p className="text-ink-soft">{products.length} products found</p>
          <div className="flex gap-4">
            <select className="bg-transparent border border-ink-muted/30 rounded-full px-4 py-2 text-sm text-ink outline-none focus:border-terracotta">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-ink-muted text-lg">No products found for this room yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
