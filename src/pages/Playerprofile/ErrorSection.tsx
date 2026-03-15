import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { useNavigate } from "react-router-dom";

const ErrorSection = ({ error }: { error: string }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <h3 className="font-bold">Error</h3>
          <p>{error || "No athlete data available"}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/athletes")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Athletes
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorSection;
