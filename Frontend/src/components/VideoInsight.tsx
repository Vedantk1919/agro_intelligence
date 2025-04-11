
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VideoInsightProps {
  title: string;
  description: string;
  videoSrc: string;
  duration: string;
  type: string;
}

export const VideoInsight = ({ title, description, videoSrc, duration, type }: VideoInsightProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <Card className={`overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-playfair">{title}</CardTitle>
          <Badge variant="outline" className="bg-[#F3DFC1] dark:bg-[#D9B08C]/30 text-[#116466] dark:text-[#F3DFC1]">
            {type}
          </Badge>
        </div>
        <CardDescription className="font-poppins">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative overflow-hidden">
        <div className="relative aspect-video bg-black/5 dark:bg-black/20 overflow-hidden">
          {isPlaying ? (
            <video 
              className="w-full h-full object-cover"
              src={videoSrc} 
              controls 
              autoPlay 
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FFCB9A]/90 to-[#D1E8E2]/90 dark:from-[#2C3531]/90 dark:to-[#116466]/90">
              <div className="text-center">
                <Video className="h-12 w-12 text-[#116466] dark:text-[#D1E8E2] mx-auto mb-4" />
                <Button 
                  onClick={handlePlay} 
                  className="bg-gradient-to-r from-[#116466] to-[#2C3531] hover:from-[#0d4f51] hover:to-[#1e2622] animate-pulse-slow"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play Video
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground font-poppins">
        <div className="flex justify-between w-full">
          <span>{duration}</span>
          <span>Tap to maximize</span>
        </div>
      </CardFooter>
    </Card>
  );
};
