
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Leaf, TrendingUp, Droplets, CloudRain,
  ChevronRight, BarChart, Video, Mic, LineChart, Sprout 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AgentCard } from "@/components/AgentCard";
import { ResourceMetric } from "@/components/ResourceMetric";
import { InsightsChart } from "@/components/InsightsChart";
import { VideoInsight } from "@/components/VideoInsight";
import { Button } from "@/components/ui/button";
import { VoiceAssistant } from "@/components/VoiceAssistant";

export const AgricultureDashboard = () => {
  // This would be dynamic data from your system in a real application
  const resourceMetrics = [
    { name: "Water Usage", value: 65, icon: Droplets, color: "text-sky-600", change: -12 },
    { name: "Soil Health", value: 78, icon: Sprout, color: "text-emerald-600", change: 8 },
    { name: "Crop Yield", value: 92, icon: TrendingUp, color: "text-amber-600", change: 15 },
  ];

  // Sample video content - in a real application, these would be real URLs
  const videoInsights = [
    {
      title: "Sustainable Irrigation Techniques",
      description: "Learn how to reduce water usage by 30% with these advanced irrigation methods",
      videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      duration: "3:45",
      type: "Tutorial"
    },
    {
      title: "Soil Health Analysis",
      description: "Expert breakdown of soil composition and improvement strategies",
      videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      duration: "5:20",
      type: "Analysis"
    }
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-playfair font-semibold mb-4 flex items-center">
          <span className="bg-accent dark:bg-accent/30 p-1.5 rounded-lg mr-2">
            <TrendingUp className="h-5 w-5 text-primary" />
          </span>
          <span className="animate-fade-in-up">Sustainability Metrics</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resourceMetrics.map((metric, index) => (
            <div 
              key={metric.name} 
              className={`animate-fade-in-up opacity-0 stagger-${index + 1}`}
            >
              <ResourceMetric
                name={metric.name}
                value={metric.value}
                Icon={metric.icon}
                color={metric.color}
                change={metric.change}
              />
            </div>
          ))}
        </div>
      </section>

      <Separator className="animate-fade-in-up stagger-2 opacity-0" />
      
      <section className="animate-fade-in-up stagger-2 opacity-0">
        <h2 className="text-2xl font-playfair font-semibold mb-4 flex items-center">
          <span className="bg-secondary/50 dark:bg-secondary/20 p-1.5 rounded-lg mr-2">
            <BarChart className="h-5 w-5 text-primary" />
          </span>
          <span>Performance Insights</span>
        </h2>
        <InsightsChart />
      </section>

      <Separator className="animate-fade-in-up stagger-2 opacity-0" />

      <section className="animate-fade-in-up stagger-3 opacity-0">
        <h2 className="text-2xl font-playfair font-semibold mb-4 flex items-center">
          <span className="bg-accent dark:bg-accent/30 p-1.5 rounded-lg mr-2">
            <Mic className="h-5 w-5 text-primary" />
          </span>
          <span>e-Kisaan Voice Assistant</span>
        </h2>
        <VoiceAssistant />
      </section>

      <Separator className="animate-fade-in-up stagger-3 opacity-0" />

      <section>
        <h2 className="text-2xl font-playfair font-semibold mb-4 flex items-center">
          <span className="bg-accent dark:bg-accent/30 p-1.5 rounded-lg mr-2">
            <Leaf className="h-5 w-5 text-primary" />
          </span>
          <span className="animate-fade-in-up stagger-2 opacity-0">AI Agent Network</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="animate-fade-in-up stagger-2 opacity-0">
            <AgentCard 
              name="Soil Assistant"
              agentType="SCP"
              description="Monitors soil conditions using IoT sensors and predicts optimal planting times and nutrient needs."
              status="Active"
              lastUpdate="5 minutes ago"
              responseTime="~3 seconds"
              icon={Sprout}
              iconColor="text-emerald-600"
            />
          </div>
          
          <div className="animate-fade-in-up stagger-3 opacity-0">
            <AgentCard 
              name="Voice Assistant"
              agentType="VAA"
              description="Natural language interface for farm management, supports voice commands and queries in the field."
              status="Active"
              lastUpdate="Just now"
              responseTime="~1 second"
              icon={Mic}
              iconColor="text-violet-600"
            />
          </div>
          
          <div className="animate-fade-in-up stagger-3 opacity-0">
            <AgentCard 
              name="Weather Forecaster"
              agentType="WA"
              description="Provides hyperlocal weather forecasts and alerts for adverse conditions affecting crops."
              status="Active"
              lastUpdate="10 minutes ago"
              responseTime="~5 seconds"
              icon={CloudRain}
              iconColor="text-sky-600"
            />
          </div>
          
          <div className="animate-fade-in-up stagger-4 opacity-0">
            <AgentCard 
              name="Market Analyst"
              agentType="MIA"
              description="Tracks commodity prices, demand trends, and supply chain data to optimize selling strategies."
              status="Standby"
              lastUpdate="1 hour ago"
              responseTime="~10 seconds"
              icon={LineChart}
              iconColor="text-amber-600"
            />
          </div>
        </div>
      </section>

      <Separator className="animate-fade-in-up stagger-4 opacity-0" />

      <section className="animate-fade-in-up stagger-4 opacity-0">
        <h2 className="text-2xl font-playfair font-semibold mb-4 flex items-center">
          <span className="bg-accent dark:bg-accent/30 p-1.5 rounded-lg mr-2">
            <Video className="h-5 w-5 text-primary" />
          </span>
          <span>Video Insights</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoInsights.map((video, index) => (
            <div key={video.title} className={`animate-fade-in-up opacity-0 stagger-${index + 3}`}>
              <VideoInsight {...video} />
            </div>
          ))}
        </div>
      </section>

      <Separator className="animate-fade-in-up stagger-4 opacity-0" />

      <section className="animate-fade-in-up stagger-4 opacity-0">
        <h2 className="text-2xl font-playfair font-semibold mb-4 flex items-center">
          <span className="bg-secondary/50 dark:bg-secondary/20 p-1.5 rounded-lg mr-2">
            <Leaf className="h-5 w-5 text-primary" />
          </span>
          Agent Recommendations
        </h2>
        <Card className="card-hover-effect bg-gradient-green-blue bg-opacity-30">
          <CardHeader>
            <CardTitle className="font-playfair">Multi-Agent Analysis Results</CardTitle>
            <CardDescription>Collaborative recommendation from all four AI agents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 font-poppins">Based on combined analysis from our agent network:</p>
            <ul className="list-disc pl-5 space-y-2 font-poppins">
              <li className="animate-fade-in-up stagger-1 opacity-0">
                <span className="font-medium text-emerald-700 dark:text-emerald-400">Soil Assistant (SCP):</span> Soil moisture levels are 15% below optimal. Recommend irrigation within 24 hours.
              </li>
              <li className="animate-fade-in-up stagger-2 opacity-0">
                <span className="font-medium text-violet-700 dark:text-violet-400">Voice Assistant (VAA):</span> Scheduled voice reminder for irrigation set for tomorrow morning.
              </li>
              <li className="animate-fade-in-up stagger-3 opacity-0">
                <span className="font-medium text-sky-700 dark:text-sky-400">Weather Forecaster (WA):</span> Light rain (40% probability) expected in 48 hours. May be insufficient for crop needs.
              </li>
              <li className="animate-fade-in-up stagger-4 opacity-0">
                <span className="font-medium text-amber-700 dark:text-amber-400">Market Analyst (MIA):</span> Current crop development aligns with market demand forecasts. No action needed.
              </li>
            </ul>
            <p className="mt-4 animate-fade-in-up stagger-4 opacity-0 font-poppins">The coordinated recommendation is to proceed with scheduled irrigation and continue monitoring weather patterns.</p>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground justify-between">
            <div>Updated 15 minutes ago</div>
            <Button variant="ghost" size="sm" className="ml-auto">
              View Complete Analysis <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};
