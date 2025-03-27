
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6 inline-block">
          <div className="relative">
            <div className="text-[8rem] font-bold opacity-10">404</div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold">Page introuvable</div>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <Button asChild className="rounded-full">
          <a href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
