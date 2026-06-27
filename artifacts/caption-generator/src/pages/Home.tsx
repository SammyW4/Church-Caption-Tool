import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateCaptions, Platform, Tone, PLATFORM_LIMITS } from "@/lib/captions";
import { Copy, RefreshCw, Send, Type } from "lucide-react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [tone, setTone] = useState<Tone>("Inspiring");
  const [results, setResults] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "We need a little context to generate your captions.",
        variant: "destructive",
      });
      return;
    }
    const newCaptions = generateCaptions(topic, platform, tone);
    setResults(newCaptions);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Caption copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try selecting the text manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary font-serif">
            Creative Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A warm, faith-filled companion for your church's social media. Enter your topic, sermon theme, or scripture, and let's craft the perfect message to share with your community.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-sm border-border">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Type className="h-5 w-5 text-primary" />
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-2">
                  <label htmlFor="topic" className="text-sm font-medium text-foreground">
                    Topic, Sermon, or Scripture
                  </label>
                  <Textarea
                    id="topic"
                    placeholder="e.g. John 3:16, Sunday sermon on hope, Easter service recap..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-[120px] resize-none bg-white focus-visible:ring-primary"
                    data-testid="input-topic"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Platform
                  </label>
                  <Select value={platform} onValueChange={(v: Platform) => setPlatform(v)}>
                    <SelectTrigger data-testid="select-platform" className="bg-white">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Twitter">X / Twitter</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {platform} limit: {PLATFORM_LIMITS[platform].toLocaleString()} characters
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Tone
                  </label>
                  <Select value={tone} onValueChange={(v: Tone) => setTone(v)}>
                    <SelectTrigger data-testid="select-tone" className="bg-white">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inspiring">Inspiring</SelectItem>
                      <SelectItem value="Conversational">Conversational</SelectItem>
                      <SelectItem value="Devotional">Devotional</SelectItem>
                      <SelectItem value="Bold">Bold</SelectItem>
                      <SelectItem value="Gentle">Gentle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleGenerate} 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-lg shadow-sm hover-elevate transition-all"
                  data-testid="button-generate"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Generate Captions
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {results.length === 0 ? (
              <Card className="h-full flex flex-col items-center justify-center p-12 text-center border-dashed bg-muted/30 min-h-[400px]">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Type className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">Ready to inspire</h3>
                <p className="text-muted-foreground max-w-sm">
                  Fill out the details on the left and click generate to see your custom captions appear here.
                </p>
              </Card>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-serif text-foreground">Your Captions</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleGenerate}
                    className="text-primary hover:text-primary border-primary/20 hover:bg-primary/5"
                    data-testid="button-regenerate-top"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
                
                <div className="grid gap-6">
                  {results.map((caption, index) => (
                    <Card key={index} className="shadow-sm border-border bg-white overflow-hidden transition-all hover:shadow-md">
                      <CardContent className="p-6">
                        <p className="whitespace-pre-wrap text-foreground/90 text-lg leading-relaxed">
                          {caption}
                        </p>
                      </CardContent>
                      <CardFooter className="bg-muted/30 px-6 py-4 flex items-center justify-between border-t border-border/50">
                        <span className="text-xs font-medium text-muted-foreground">
                          {caption.length} / {PLATFORM_LIMITS[platform]} chars
                        </span>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={() => handleCopy(caption)}
                          className="bg-primary/10 text-primary hover:bg-primary/20"
                          data-testid={`button-copy-${index}`}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleGenerate}
                    className="border-border hover:bg-muted"
                    data-testid="button-regenerate-bottom"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Get Fresh Variations
                  </Button>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
