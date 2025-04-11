
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface AgentCardProps {
  name: string;
  agentType: string;
  description: string;
  status: "Active" | "Standby" | "Offline";
  lastUpdate: string;
  responseTime: string;
  icon: LucideIcon;
  iconColor: string;
}

export const AgentCard = ({ 
  name, 
  agentType,
  description, 
  status, 
  lastUpdate, 
  responseTime, 
  icon: Icon,
  iconColor 
}: AgentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Status color mapping
  const statusColors = {
    "Active": "bg-green-500",
    "Standby": "bg-amber-500",
    "Offline": "bg-gray-500"
  };
  
  // Agent type badge color mapping
  const agentTypeColors = {
    "SCP": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
    "VAA": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100",
    "WA": "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100",
    "MIA": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
  };
  
  return (
    <Card 
      className="overflow-hidden border-t-4 transition-all card-hover-effect relative group"
      style={{ borderTopColor: status === "Active" ? "#2A9D8F" : status === "Standby" ? "#F8D49F" : "#94A3B8" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-green-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${iconColor} bg-opacity-20 transition-all duration-500 ${isHovered ? 'animate-pulse-slow' : ''}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <Badge variant="outline" className={`text-xs mt-1 ${agentTypeColors[agentType as keyof typeof agentTypeColors] || ""}`}>
                {agentType}
              </Badge>
            </div>
          </div>
          <Badge 
            variant={status === "Active" ? "default" : status === "Standby" ? "secondary" : "outline"}
            className="transition-all duration-300"
          >
            <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${statusColors[status]}`}></span>
            {status}
          </Badge>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Last Update</p>
            <p>{lastUpdate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Response Time</p>
            <p>{responseTime}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1 text-xs relative">
        <div className="flex items-center justify-center w-full transition-all duration-300 text-primary/80 font-medium">
          Click to interact with this agent
          <span className="inline-block ml-1 transition-all group-hover:translate-x-1">→</span>
        </div>
      </CardFooter>
    </Card>
  );
};
