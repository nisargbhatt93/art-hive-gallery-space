
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, Home, ImageIcon } from "lucide-react";

const Navbar = () => {
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
          <Link to="/upload">
            <Button className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Art</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
