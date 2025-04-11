
import { useState, useEffect } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
} from "recharts";
import { Button } from "@/components/ui/button";
import { BarChart as BarChartIcon, LineChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const monthlyData = [
  {
    name: "Jan",
    waterUsage: 65,
    soilHealth: 50,
    cropYield: 40,
  },
  {
    name: "Feb",
    waterUsage: 59,
    soilHealth: 55,
    cropYield: 45,
  },
  {
    name: "Mar",
    waterUsage: 50,
    soilHealth: 62,
    cropYield: 48,
  },
  {
    name: "Apr",
    waterUsage: 47,
    soilHealth: 68,
    cropYield: 52,
  },
  {
    name: "May",
    waterUsage: 45,
    soilHealth: 74,
    cropYield: 56,
  },
  {
    name: "Jun",
    waterUsage: 42,
    soilHealth: 78,
    cropYield: 62,
  },
  {
    name: "Jul",
    waterUsage: 40,
    soilHealth: 82,
    cropYield: 68,
  },
  {
    name: "Aug",
    waterUsage: 38,
    soilHealth: 85,
    cropYield: 72,
  },
  {
    name: "Sep",
    waterUsage: 37,
    soilHealth: 87,
    cropYield: 79,
  },
  {
    name: "Oct",
    waterUsage: 35,
    soilHealth: 90,
    cropYield: 85,
  },
  {
    name: "Nov",
    waterUsage: 32,
    soilHealth: 92,
    cropYield: 89,
  },
  {
    name: "Dec",
    waterUsage: 30,
    soilHealth: 95,
    cropYield: 92,
  },
];

type ChartType = "bar" | "area";

export const InsightsChart = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={`card-hover-effect overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-poppins">Sustainability Insights</CardTitle>
            <CardDescription>Annual farm performance metrics</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={chartType === "bar" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setChartType("bar")}
            >
              <BarChartIcon className="h-4 w-4 mr-1" />
              Bar
            </Button>
            <Button
              variant={chartType === "area" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setChartType("area")}
            >
              <LineChart className="h-4 w-4 mr-1" />
              Area
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="h-[300px] w-full">
          <ChartContainer 
            config={{
              waterUsage: {
                label: "Water Usage",
                theme: {
                  light: "#678B8B",
                  dark: "#8CABA8",
                },
              },
              soilHealth: {
                label: "Soil Health",
                theme: {
                  light: "#D9B08C",
                  dark: "#F3DFC1",
                },
              },
              cropYield: {
                label: "Crop Yield",
                theme: {
                  light: "#116466",
                  dark: "#2C3531",
                },
              },
            }}
            className="animate-fade-in-up"
          >
            {chartType === "bar" ? (
              <ResponsiveContainer>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip 
                    content={({active, payload}) => (
                      <ChartTooltipContent active={active} payload={payload} />
                    )}
                  />
                  <Legend />
                  <Bar
                    dataKey="waterUsage"
                    name="waterUsage"
                    fill="var(--color-waterUsage)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="soilHealth"
                    name="soilHealth"
                    fill="var(--color-soilHealth)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="cropYield"
                    name="cropYield"
                    fill="var(--color-cropYield)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <AreaChart
                data={monthlyData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip 
                  content={({active, payload}) => (
                    <ChartTooltipContent active={active} payload={payload} />
                  )}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="waterUsage"
                  name="waterUsage"
                  stroke="var(--color-waterUsage)"
                  fill="var(--color-waterUsage)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="soilHealth"
                  name="soilHealth"
                  stroke="var(--color-soilHealth)"
                  fill="var(--color-soilHealth)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="cropYield"
                  name="cropYield"
                  stroke="var(--color-cropYield)"
                  fill="var(--color-cropYield)"
                  fillOpacity={0.2}
                />
              </AreaChart>
            )}
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
