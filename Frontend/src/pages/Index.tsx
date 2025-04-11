import { getRecommendation, getHistory, getChatResponse } from "@/lib/api";
import { useState, useEffect } from "react";
import {
  Leaf, BarChart, CloudRain, Sprout, LineChart, Settings, BellRing
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AgricultureDashboard } from "@/components/AgricultureDashboard";
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarHeader,
  SidebarFooter, SidebarGroup, SidebarGroupLabel,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton
} from "@/components/ui/sidebar";

const Index = () => {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [soilPH, setSoilPH] = useState("");
  const [moisture, setMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [demand, setDemand] = useState("");
  const [trend, setTrend] = useState("");
  const [recommendation, setRecommendation] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [chatLog, setChatLog] = useState<{ sender: string; message: string }[]>([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      if (res.status === "success") {
        setHistory(res.history);
      }
    } catch (e) {
      console.error("History fetch failed:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      Soil_pH: parseFloat(soilPH),
      Soil_Moisture: parseFloat(moisture),
      Temperature_C: parseFloat(temperature),
      Rainfall_mm: parseFloat(rainfall),
      Market_Price_per_ton: parseFloat(marketPrice),
      Demand_Index: parseFloat(demand),
      Consumer_Trend_Index: parseFloat(trend),
    };

    try {
      const res = await getRecommendation(payload);
      if (res.status === "success") {
        setRecommendation(res.recommendation);
        toast({
          title: "✅ Recommendation Successful",
          description: `Top Crop: ${res.recommendation.market_advice.most_profitable_crop}`,
        });
        fetchHistory();
      } else {
        toast({ title: "⚠️ Error", description: res.message });
      }
    } catch (e: any) {
      toast({ title: "❌ Request Failed", description: e.message });
    }
  };

  const sendToChatbot = async () => {
    if (!chatInput.trim()) return;

    setChatLog((prev) => [...prev, { sender: "user", message: chatInput }]);

    try {
      const res = await getChatResponse(chatInput);
      setChatLog((prev) => [...prev, { sender: "bot", message: res.reply }]);
      setChatInput("");
    } catch (err) {
      setChatLog((prev) => [...prev, { sender: "bot", message: "❌ Failed to get response." }]);
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex bg-gradient-to-br from-[#F0F5F5] to-[#D7F2ED] dark:from-[#243E3E] dark:to-[#2A9D8F]/70">
        <Sidebar variant="sidebar">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <Leaf className="h-5 w-5 text-[#2A9D8F]" />
              <h1 className="text-xl font-bold text-[#2A9D8F]">AgroIntelligence</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={true}><BarChart className="h-4 w-4" />Overview</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>AI Agents</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton><Sprout className="h-4 w-4" />Soil Assistant</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-4 py-2 text-xs text-muted-foreground">
              AgroIntelligence v1.2 • Multi-Agent System
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <header className={`transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl font-bold text-[#2A9D8F] mb-2">Multi-Agent Farm Intelligence</h1>
            <p className="text-muted-foreground">Integrated AI agents for optimal farming decisions</p>
          </header>

          {/* 💬 Chatbot Section */}
          <section className="mt-10 mb-8">
            <Card className="p-6 bg-[#e8fdf4] border-2 border-[#2A9D8F] rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-[#1d6a5e] mb-4">🤖 Ask the AgroIntelligence Chatbot</h2>
              <div className="max-h-64 overflow-y-auto mb-4 space-y-2 px-1">
                {chatLog.map((entry, idx) => (
                  <div key={idx} className={`text-sm ${entry.sender === "user" ? "text-right" : "text-left"}`}>
                    <span className={`inline-block px-3 py-2 rounded-lg ${
                      entry.sender === "user"
                        ? "bg-[#2A9D8F] text-white"
                        : "bg-[#d1f7ec] text-[#1b5249]"
                    }`}>
                      {entry.message}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <Button onClick={sendToChatbot} className="bg-[#2A9D8F] hover:bg-[#1d6a5e]">
                  Send
                </Button>
              </div>
            </Card>
          </section>

          {/* Recommendation Form */}
          <h2 className="text-2xl font-bold text-black mt-10 mb-2">🧠 Crop Recommendation Engine</h2>
<form onSubmit={handleSubmit} className="mt-6 grid md:grid-cols-2 gap-4">

            <Input placeholder="Farmer Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Soil pH" value={soilPH} onChange={(e) => setSoilPH(e.target.value)} />
            <Input placeholder="Soil Moisture (%)" value={moisture} onChange={(e) => setMoisture(e.target.value)} />
            <Input placeholder="Temperature (°C)" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
            <Input placeholder="Rainfall (mm)" value={rainfall} onChange={(e) => setRainfall(e.target.value)} />
            <Input placeholder="Market Price per ton" value={marketPrice} onChange={(e) => setMarketPrice(e.target.value)} />
            <Input placeholder="Demand Index" value={demand} onChange={(e) => setDemand(e.target.value)} />
            <Input placeholder="Consumer Trend Index" value={trend} onChange={(e) => setTrend(e.target.value)} />
            <Button type="submit" className="col-span-2 bg-gradient-to-r from-[#2A9D8F] to-[#243E3E]">Ask Agents</Button>
          </form>

          {/* Recommendation Output */}
          {recommendation && (
  <>
    <h2 className="text-2xl font-semibold text-[#2A9D8F] mb-4">🌾 Crop Recommendation Results</h2>
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4">
        <h2 className="text-xl font-semibold text-[#2A9D8F] mb-2">🌿 Environmental Advice</h2>
        <p><strong>Recommended Crop:</strong> {recommendation.environmental_advice?.recommended_crop}</p>
        <p><em>{recommendation.environmental_advice?.tip}</em></p>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-semibold text-[#2A9D8F] mb-2">💰 Market Advice</h2>
        <p><strong>Most Profitable Crop:</strong> {recommendation.market_advice?.most_profitable_crop}</p>
        <p><strong>Top 3 Crops:</strong> {recommendation.market_advice?.top_3_profitable_crops?.join(", ")}</p>
        <p><em>{recommendation.market_advice?.note}</em></p>
      </Card>
    </div>
  </>
)}

          {/* Toggle Button */}
          <div className="mt-10 mb-4">
            <Button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-[#2A9D8F] hover:bg-[#1d6a5e]"
            >
              {showHistory ? "Hide Past Recommendations" : "Show Past Recommendations"}
            </Button>
          </div>

          {/* Conditional Recommendation History */}
          {showHistory && (
            <div>
              <h2 className="text-2xl font-semibold text-[#2A9D8F] mb-4">📜 Past Recommendations</h2>
              {history.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {history.map((record, index) => (
                    <Card key={index} className="p-4">
                      <p><strong>👤 Farmer:</strong> {record.farmer_name}</p>
                      <p><strong>🗓 Date:</strong> {record.timestamp}</p>
                      {(() => {
  try {
    const rec = JSON.parse(record.recommendation);
    return (
      <div className="mt-2 text-sm space-y-1">
        <p><strong>🌿 Recommended Crop:</strong> {rec.environmental_advice?.recommended_crop}</p>
        <p><em>{rec.environmental_advice?.tip}</em></p>
        <p><strong>💰 Most Profitable Crop:</strong> {rec.market_advice?.most_profitable_crop}</p>
        {rec.market_advice?.top_3_profitable_crops && (
          <p><strong>📊 Top 3 Crops:</strong> {rec.market_advice.top_3_profitable_crops.join(", ")}</p>
        )}
        <p><em>{rec.market_advice?.note}</em></p>
      </div>
    );
  } catch {
    return <p className="text-red-500">⚠️ Failed to parse recommendation</p>;
  }
})()}

                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No past records available.</p>
              )}
            </div>
          )}

          {/* Dashboard */}
          <div className="mt-12">
            <AgricultureDashboard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
