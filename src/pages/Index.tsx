
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ArtworkGrid from "@/components/gallery/ArtworkGrid";
import { ArtItem } from "@/components/gallery/ArtCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [artworks, setArtworks] = useState<ArtItem[]>([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('artworks')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        if (data) {
          const formattedArtworks: ArtItem[] = data.map(art => ({
            id: art.id,
            title: art.title,
            artist: art.artist_name, // Use the artist_name from the database
            imageUrl: art.image_url,
            description: art.description || "",
            likes: 0,
            comments: 0
          }));
          
          setArtworks(formattedArtworks);
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
        toast.error("Failed to load artworks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
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
