
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface ResourceMetricProps {
  name: string;
  value: number;
  Icon: LucideIcon;
  color: string;
  change: number;
}

export const ResourceMetric = ({ name, value, Icon, color, change }: ResourceMetricProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate the value counter
      let startValue = 0;
      const duration = 1500;
      const increment = value / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= value) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(startValue));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <Card className="overflow-hidden card-hover-effect border-t-4 transition-all" style={{ borderTopColor: change > 0 ? '#2A9D8F' : '#F87171' }}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{name}</CardTitle>
          <div className={`p-2 rounded-full ${color} bg-opacity-20 animate-pulse-slow`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{animatedValue}%</span>
            <div className={`flex items-center gap-1 text-sm ${change > 0 ? 'text-emerald-600' : 'text-red-500'} transition-all animate-scale-in`}>
              {change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{Math.abs(change)}%</span>
            </div>
          </div>
          <div className="relative h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
            {isVisible && (
              <div 
                className="animated-progress-value" 
                style={{ '--value-percent': `${value}%` } as React.CSSProperties} 
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground pt-1">
            {change > 0 
              ? `Improved by ${change}% over last month` 
              : `Reduced by ${Math.abs(change)}% over last month`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
