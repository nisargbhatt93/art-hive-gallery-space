
import Navbar from "@/components/layout/Navbar";
import UploadForm from "@/components/upload/UploadForm";
import { AuthGuard } from "@/components/AuthGuard";

const UploadPage = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        
        <main className="flex-1 container max-w-7xl mx-auto py-8 px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Upload Artwork</h1>
            <p className="text-muted-foreground">Share your creations with the world</p>
          </div>
          
          <UploadForm />
        </main>
      </div>
    </AuthGuard>
  );
};

export default UploadPage;
