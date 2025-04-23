
import { useState, useEffect } from "react";
import ArtCard, { ArtItem } from "./ArtCard";

interface ArtworkGridProps {
  artworks: ArtItem[];
  loading?: boolean;
}

const ArtworkGrid = ({ artworks, loading = false }: ArtworkGridProps) => {
  const [items, setItems] = useState<ArtItem[]>([]);
  
  useEffect(() => {
    setItems(artworks);
  }, [artworks]);
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-md"></div>
        ))}
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h3 className="text-2xl font-medium text-gray-700">No Artwork Found</h3>
        <p className="text-muted-foreground mt-2">Be the first to upload your masterpiece!</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <ArtCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ArtworkGrid;
