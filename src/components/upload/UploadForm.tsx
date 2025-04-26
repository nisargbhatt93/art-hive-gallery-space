
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useArtworkUpload } from "@/hooks/use-artwork-upload";

const UploadForm = () => {
  const navigate = useNavigate();
  const { uploadArtwork, isUploading } = useArtworkUpload();
  const [title, setTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !artistName) return;
    
    const success = await uploadArtwork(file, title, description, artistName);
    if (success) {
      navigate("/");
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Your Artwork</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of your artwork"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="artistName" className="text-sm font-medium">Artist Name</label>
            <Input
              id="artistName"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Enter the artist's name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your artwork..."
              className="min-h-32"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="artwork" className="text-sm font-medium">Artwork Image</label>
            <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              {!preview ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or GIF (Max 10MB)
                  </p>
                  <Input 
                    id="artwork" 
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-64 mx-auto rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setPreview(null);
                      setFile(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
            <Input 
              id="artwork-visible" 
              type="file" 
              accept="image/*" 
              className={preview ? "hidden" : ""}
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Artwork"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UploadForm;
