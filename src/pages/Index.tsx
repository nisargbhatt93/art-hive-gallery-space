
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ArtworkGrid from "@/components/gallery/ArtworkGrid";
import { ArtItem } from "@/components/gallery/ArtCard";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [artworks, setArtworks] = useState<ArtItem[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from Supabase
    setTimeout(() => {
      setArtworks([
        {
          id: "1",
          title: "Abstract Harmony",
          artist: "Elena Morris",
          imageUrl: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
          likes: 24,
          comments: 3,
        },
        {
          id: "2",
          title: "Urban Symphony",
          artist: "Marcus Chen",
          imageUrl: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a",
          likes: 18,
          comments: 5,
        },
        {
          id: "3",
          title: "Ethereal Dreams",
          artist: "Sarah Johnson",
          imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
          likes: 42,
          comments: 7,
        },
        {
          id: "4",
          title: "Geometric Fusion",
          artist: "David Park",
          imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
          likes: 15,
          comments: 2,
        },
        {
          id: "5",
          title: "Serenity Falls",
          artist: "Maya Williams",
          imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
          likes: 37,
          comments: 9,
        },
        {
          id: "6",
          title: "Digital Renaissance",
          artist: "Thomas Lang",
          imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
          likes: 29,
          comments: 4,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 container max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Artwork</h1>
          <p className="text-muted-foreground">Discover amazing creations from artists around the world</p>
        </div>
        
        <ArtworkGrid artworks={artworks} loading={isLoading} />
      </main>
    </div>
  );
};

export default Index;
