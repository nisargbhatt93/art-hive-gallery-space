
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export interface Comment {
  id: string;
  username: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection = ({ comments: initialComments }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // In a real app, we would send this to Supabase
    const comment: Comment = {
      id: Date.now().toString(),
      username: "Current User", // Would come from auth
      content: newComment,
      createdAt: new Date().toISOString(),
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      
      <div className="space-y-4">
        <Textarea
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-24"
        />
        <Button onClick={handleAddComment}>Post Comment</Button>
      </div>
      
      {comments.length > 0 && <Separator />}
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex justify-between">
              <p className="font-medium">{comment.username}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
      
      {comments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
