
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import CommentSection, { Comment } from "@/components/detail/CommentSection";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { ArtItem } from "@/components/gallery/ArtCard";

const ArtDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [artwork, setArtwork] = useState<ArtItem | null>(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Mock fetch from database - would be Supabase in a real app
    setTimeout(() => {
      // Find artwork by ID
      const mockArtworks = [
        {
          id: "1",
          title: "Abstract Harmony",
          artist: "Elena Morris",
          imageUrl: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
          likes: 24,
          comments: 3,
          description: "A vibrant exploration of color and form, expressing the harmony found in chaos."
        },
        {
          id: "2",
          title: "Urban Symphony",
          artist: "Marcus Chen",
          imageUrl: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a",
          likes: 18,
          comments: 5,
          description: "Capturing the rhythm and energy of city life through architectural forms."
        },
        {
          id: "3",
          title: "Ethereal Dreams",
          artist: "Sarah Johnson",
          imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
          likes: 42,
          comments: 7,
          description: "An otherworldly landscape that invites viewers to explore the subconscious mind."
        },
        {
          id: "4",
          title: "Geometric Fusion",
          artist: "David Park",
          imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
          likes: 15,
          comments: 2,
          description: "A study in precision and mathematical beauty, inspired by architectural forms."
        },
        {
          id: "5",
          title: "Serenity Falls",
          artist: "Maya Williams",
          imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
          likes: 37,
          comments: 9,
          description: "A meditation on the tranquil power of nature and the peace found in wild places."
        },
        {
          id: "6",
          title: "Digital Renaissance",
          artist: "Thomas Lang",
          imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
          likes: 29,
          comments: 4,
          description: "Merging classical aesthetics with digital techniques to create a new visual language."
        },
      ];

      const found = mockArtworks.find(art => art.id === id);
      if (found) {
        setArtwork(found);
        
        // Mock comments
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
      
      setIsLoading(false);
    }, 1000);
  }, [id]);

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
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Artwork not found</div>
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
