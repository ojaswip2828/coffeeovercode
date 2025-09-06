import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-8">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <h1 className="text-6xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button asChild className="w-full btn-primary">
              <Link to="/dashboard">
                <Home className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/login">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
