import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateCaptions, Platform, Tone, PLATFORM_LIMITS, TONE_DESCRIPTIONS } from "@/lib/captions";
import { getUpcomingFeasts, formatFeastDate } from "@/lib/feasts";
import { Copy, RefreshCw, Send, BookOpen, CalendarDays, ChevronRight } from "lucide-react";

const upcomingFeasts = getUpcomingFeasts(7);

export default function Home() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [tone, setTone] = useState<Tone>("Communal");
  const [results, setResults] = useState<string[]>([]);
  const [selectedFeastIndex, setSelectedFeastIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Describe a feast, sermon theme, scripture, or community announcement.",
        variant: "destructive",
      });
      return;
    }
    const newCaptions = generateCaptions(topic, platform, tone);
    setResults(newCaptions);
  };

  const handleFeastSelect = (index: number) => {
    const feast = upcomingFeasts[index];
    setTopic(feast.suggestedTopic);
    setSelectedFeastIndex(index);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Caption copied to clipboard." });
    } catch {
      toast({ title: "Failed to copy", description: "Please try selecting the text manually.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header className="text-center space-y-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent">
            SPOT Church — Temple Hills, Maryland
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary font-serif">
            Caption Generator
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Craft social media captions rooted in the Ethiopian Orthodox Tewahedo tradition — for feast days, liturgical seasons, sermons, and community life.
          </p>
        </header>

        {/* Feast Calendar */}
        <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-muted/30">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Upcoming Feast Days</span>
            <span className="ml-auto text-xs text-muted-foreground">Click a feast to pre-fill the topic</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {upcomingFeasts.slice(0, 4).map((feast, i) => (
              <button
                key={feast.name + feast.date}
                data-testid={`feast-item-${i}`}
                onClick={() => handleFeastSelect(i)}
                className={`group flex flex-col gap-1 px-5 py-4 text-left transition-colors hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${selectedFeastIndex === i ? "bg-primary/8 border-l-2 border-primary" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 flex-1">
                    {feast.geezName && feast.geezName !== feast.name && (
                      <p className="text-xs text-accent font-semibold tracking-wide">{feast.geezName}</p>
                    )}
                    <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {feast.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFeastDate(feast.nextDate)}
                      <span className="ml-2 inline-block text-accent font-medium">
                        {feast.daysUntil === 0 ? "Today" : feast.daysUntil === 1 ? "Tomorrow" : `In ${feast.daysUntil} days`}
                      </span>
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors mt-0.5 shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{feast.description}</p>
              </button>
            ))}
          </div>
          {upcomingFeasts.length > 4 && (
            <div className="border-t border-border px-5 py-2 bg-muted/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {upcomingFeasts.slice(4, 7).map((feast, i) => (
                <button
                  key={feast.name + feast.date}
                  data-testid={`feast-item-${i + 4}`}
                  onClick={() => handleFeastSelect(i + 4)}
                  className={`group flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${selectedFeastIndex === i + 4 ? "bg-primary/8" : ""}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {feast.geezName && feast.geezName !== feast.name ? feast.geezName : feast.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatFeastDate(feast.nextDate)}</p>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left: inputs */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="shadow-sm border-border">
              <CardContent className="pt-6 space-y-5">

                <div className="space-y-2">
                  <label htmlFor="topic" className="text-sm font-semibold text-foreground">
                    Topic, Feast, or Scripture
                  </label>
                  <Textarea
                    id="topic"
                    placeholder="e.g. Timkat celebration, Matthew 3:13–17, fasting season reflection, Kidist Mariam feast day..."
                    value={topic}
                    onChange={(e) => {
                      setTopic(e.target.value);
                      setSelectedFeastIndex(null);
                    }}
                    className="min-h-[130px] resize-none bg-white focus-visible:ring-primary"
                    data-testid="input-topic"
                  />
                  {selectedFeastIndex !== null && (
                    <p className="text-xs text-accent font-medium">
                      Pre-filled from: {upcomingFeasts[selectedFeastIndex].geezName ?? upcomingFeasts[selectedFeastIndex].name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Platform</label>
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
                  <label className="text-sm font-semibold text-foreground">Voice</label>
                  <Select value={tone} onValueChange={(v: Tone) => setTone(v)}>
                    <SelectTrigger data-testid="select-tone" className="bg-white">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Liturgical">Liturgical</SelectItem>
                      <SelectItem value="Reflective">Reflective</SelectItem>
                      <SelectItem value="Communal">Communal</SelectItem>
                      <SelectItem value="Proclamatory">Proclamatory</SelectItem>
                      <SelectItem value="Prayerful">Prayerful</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground italic">
                    {TONE_DESCRIPTIONS[tone]}
                  </p>
                </div>

                <Button
                  onClick={handleGenerate}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base shadow-sm transition-all"
                  data-testid="button-generate"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Generate Captions
                </Button>

              </CardContent>
            </Card>

            <div className="rounded-lg border border-border bg-muted/30 px-4 py-4 text-xs text-muted-foreground space-y-1 leading-relaxed">
              <p className="font-semibold text-foreground text-xs">Tips</p>
              <p>Name a specific feast (Timkat, Meskel, Enkutatash), a liturgical season (Tsome Filseta, Tsome Nenewe), or a Ge'ez scripture passage for the most rooted captions.</p>
            </div>
          </div>

          {/* Right: results */}
          <div className="lg:col-span-2 space-y-5">
            {results.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed bg-muted/20 min-h-[420px]">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-serif">Ready to serve your community</h3>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Select a feast day above or enter a topic on the left and choose a voice. Your captions will appear here, rooted in the ancient tradition of the Tewahedo Church.
                </p>
              </Card>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold font-serif text-foreground">Generated Captions</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerate}
                    className="text-primary hover:text-primary border-primary/30 hover:bg-primary/5"
                    data-testid="button-regenerate-top"
                  >
                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                    Regenerate
                  </Button>
                </div>

                <div className="grid gap-5">
                  {results.map((caption, index) => (
                    <Card key={index} className="shadow-sm border-border bg-white overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <p className="whitespace-pre-wrap text-foreground/85 text-sm leading-loose">
                          {caption}
                        </p>
                      </CardContent>
                      <CardFooter className="bg-muted/30 px-6 py-3 flex items-center justify-between border-t border-border/50">
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {caption.length} / {PLATFORM_LIMITS[platform].toLocaleString()} chars
                        </span>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleCopy(caption)}
                          className="bg-primary/10 text-primary hover:bg-primary/20 text-xs"
                          data-testid={`button-copy-${index}`}
                        >
                          <Copy className="mr-1.5 h-3.5 w-3.5" />
                          Copy
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center pt-2">
                  <Button
                    variant="outline"
                    onClick={handleGenerate}
                    className="border-border hover:bg-muted text-sm"
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
