
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, MessageSquare } from "lucide-react";

export interface ArtItem {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  likes: number;
  comments: number;
  description?: string;
}

interface ArtCardProps {
  item: ArtItem;
}

const ArtCard = ({ item }: ArtCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link to={`/art/${item.id}`}>
      <Card 
        className="overflow-hidden transition-all duration-300 h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-lg truncate">{item.title}</h3>
          <p className="text-sm text-muted-foreground">By {item.artist}</p>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between">
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">{item.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">{item.comments}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArtCard;
