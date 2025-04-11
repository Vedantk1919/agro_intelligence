
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, Loader2, Globe } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("english");
  
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const startListening = () => {
    setIsListening(true);
    setTranscript("");
    
    // In a real application, this would connect to your speech recognition API
    toast({
      title: "Listening...",
      description: `e-Kisaan is listening for your command in ${language}.`,
    });
    
    // Simulate receiving speech after 3 seconds
    setTimeout(() => {
      // Different sample questions based on selected language
      let sampleQuestion = "";
      switch(language) {
        case "hindi":
          sampleQuestion = "उत्तरी क्षेत्र में मिट्टी की नमी का स्तर क्या है?";
          break;
        case "marathi":
          sampleQuestion = "उत्तर क्षेत्रातील मातीच्या ओलाव्याची पातळी काय आहे?";
          break;
        default:
          sampleQuestion = "What's the soil moisture level in the north field?";
      }
      
      setTranscript(sampleQuestion);
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate processing and response
      setTimeout(() => {
        setIsProcessing(false);
        
        // Different sample responses based on selected language
        let sampleResponse = "";
        switch(language) {
          case "hindi":
            sampleResponse = "उत्तरी क्षेत्र में मिट्टी की नमी का स्तर 42% है। यह आपकी गेहूं की फसल के लिए अनुकूल सीमा के भीतर है। इस समय सिंचाई की आवश्यकता नहीं है।";
            break;
          case "marathi":
            sampleResponse = "उत्तर क्षेत्रातील मातीचा ओलावा 42% आहे. हे तुमच्या गहू पिकासाठी इष्टतम श्रेणीत आहे. या वेळी सिंचनाची आवश्यकता नाही.";
            break;
          default:
            sampleResponse = "The north field has a soil moisture level of 42%. This is within the optimal range for your wheat crop. No irrigation is needed at this time.";
        }
        
        setResponse(sampleResponse);
      }, 2000);
    }, 3000);
  };
  
  const stopListening = () => {
    setIsListening(false);
    toast({
      title: "Stopped Listening",
      description: "Voice input canceled.",
    });
  };
  
  const clearConversation = () => {
    setTranscript("");
    setResponse("");
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language Changed",
      description: `Voice assistant language set to ${value.charAt(0).toUpperCase() + value.slice(1)}`,
    });
  };

  return (
    <Card className="overflow-hidden border-t-4 border-t-violet-500">
      <CardHeader className="bg-violet-50/50 dark:bg-violet-900/20 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-violet-100 dark:bg-violet-800">
              <Mic className="h-5 w-5 text-violet-600 dark:text-violet-300" />
            </div>
            e-Kisaan Voice Assistant
          </CardTitle>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <Globe className="h-3.5 w-3.5 mr-1" />
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
              <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <Button 
              onClick={toggleListening}
              size="lg"
              className={`rounded-full p-8 transition-all ${
                isListening 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-violet-600 hover:bg-violet-700"
              }`}
              disabled={isProcessing}
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : isProcessing ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </div>
          
          <div className="min-h-36">
            {transcript && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">You said:</h3>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                  <p>{transcript}</p>
                </div>
              </div>
            )}
            
            {response && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                  <Volume2 className="h-3 w-3" /> e-Kisaan response:
                </h3>
                <div className="bg-violet-50 dark:bg-violet-900/20 p-3 rounded-lg border border-violet-100 dark:border-violet-800">
                  <p>{response}</p>
                </div>
              </div>
            )}
            
            {!transcript && !response && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Click the microphone button and ask e-Kisaan a question about your farm.</p>
                <p className="text-xs mt-2">Try asking about soil conditions, weather forecasts, or market prices.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-violet-50/50 dark:bg-violet-900/20 flex justify-between">
        <div className="text-xs text-muted-foreground">
          Voice commands in English, हिंदी, मराठी
        </div>
        {(transcript || response) && (
          <Button variant="ghost" size="sm" onClick={clearConversation}>
            Clear conversation
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

