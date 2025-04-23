
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, Home, ImageIcon, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
    }
  };

  return (
    <nav className="border-b py-3 px-4 sm:px-6">
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <ImageIcon className="h-6 w-6" />
          <span className="font-semibold text-xl">Art Hive</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
            <Home className="h-5 w-5" />
            <span>Gallery</span>
          </Link>
          {user ? (
            <>
              <Link to="/upload">
                <Button className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Art</span>
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
