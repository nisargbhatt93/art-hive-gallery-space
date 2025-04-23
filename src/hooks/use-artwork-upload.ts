
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export const useArtworkUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadArtwork = async (
    file: File,
    title: string,
    description: string
  ) => {
    try {
      setIsUploading(true);

      // Upload image to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('artworks')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('artworks')
        .getPublicUrl(filePath);

      // Insert artwork data into the database
      const { error: insertError } = await supabase
        .from('artworks')
        .insert({
          title,
          description,
          image_url: publicUrl,
        });

      if (insertError) throw insertError;

      toast.success("Artwork uploaded successfully!");
      return true;
    } catch (error) {
      console.error('Error uploading artwork:', error);
      toast.error("Failed to upload artwork. Please try again.");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadArtwork,
    isUploading,
  };
};
