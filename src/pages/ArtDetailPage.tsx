
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import CommentSection, { Comment } from "@/components/detail/CommentSection";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { ArtItem } from "@/components/gallery/ArtCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const ArtDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [artwork, setArtwork] = useState<ArtItem | null>(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        setIsLoading(true);
        
        if (!id) {
          toast.error("Artwork ID is missing");
          navigate("/");
          return;
        }
        
        const { data, error } = await supabase
          .from('artworks')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error("Error fetching artwork:", error);
          setArtwork(null);
          return;
        }
        
        if (data) {
          const formattedArtwork: ArtItem = {
            id: data.id,
            title: data.title,
            artist: "Artist", // Using placeholder for now
            imageUrl: data.image_url,
            description: data.description || "",
            likes: 0, // Placeholder for now
            comments: 0 // Placeholder for now
          };
          
          setArtwork(formattedArtwork);
          
          // For now, we'll use mock comments
          const mockComments = [
            {
              id: "c1",
              username: "ArtLover42",
              content: "This piece really speaks to me. The use of color is breathtaking!",
              createdAt: "2023-05-15T14:23:00Z",
            },
            {
              id: "c2",
              username: "GalleryVisitor",
              content: "I'm curious about the technique used here. Is this acrylic or oil?",
              createdAt: "2023-05-14T09:45:00Z",
            },
            {
              id: "c3",
              username: "ArtHistorian",
              content: "The composition reminds me of early 20th century abstract expressionism, yet with a contemporary digital twist.",
              createdAt: "2023-05-13T18:12:00Z",
            },
          ];
          
          setComments(mockComments);
        }
      } catch (error) {
        console.error("Error in fetchArtworkDetails:", error);
        toast.error("Failed to load artwork details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworkDetails();
  }, [id, navigate]);

  const handleLike = () => {
    setLiked(!liked);
    if (artwork) {
      // Toggle like count
      setArtwork({
        ...artwork,
        likes: liked ? artwork.likes - 1 : artwork.likes + 1
      });
      
      // In a real app, we would update this in Supabase
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <div className="text-xl">Artwork not found</div>
          <Button onClick={() => navigate("/")}>Back to Gallery</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 container max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Artwork image */}
          <div className="bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              className="max-h-[80vh] object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          
          {/* Artwork details and comments */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
              <p className="text-xl mb-4">by {artwork.artist}</p>
              <p className="text-gray-700">{artwork.description}</p>
              
              <div className="mt-6 flex items-center space-x-4">
                <Button 
                  variant={liked ? "default" : "outline"} 
                  onClick={handleLike}
                  className="flex items-center space-x-2"
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-white' : ''}`} />
                  <span>{artwork.likes} likes</span>
                </Button>
              </div>
            </div>
            
            <div className="pt-4">
              <CommentSection comments={comments} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtDetailPage;
