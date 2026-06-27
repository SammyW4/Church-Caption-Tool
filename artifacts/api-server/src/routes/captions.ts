import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";

const router = Router();

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

const SYSTEM_PROMPT = `You are a social media caption writer for SPOT Church, an Ethiopian Orthodox Tewahedo Christian church in Temple Hills, Maryland.

Your captions must:
- Reflect the theology, liturgical tradition, and communal life of the Ethiopian Orthodox Tewahedo Church
- Draw naturally on Ge'ez liturgical heritage, feast days, fasting seasons, and patristic wisdom where relevant
- Feel rooted, solemn, and communal — never casual, evangelical, or hype-driven
- Reference scripture naturally and with reverence, as the Tewahedo Church receives it
- Include 5–8 relevant hashtags from this set (choose the most fitting):
  #EthiopianOrthodox #SPOTChurch #TempleHills #Tewahedo #OrthodoxChristian #HolyTewahedo #EthiopianOrthodoxTewahedo #OrthodoxFaith #Habesha #GeezLiturgy #SundayLiturgy #FeastDay #HolyFathers #OrthodoxyInAmerica #ChristianCommunity #AncientFaith #ChurchOfEthiopia #LiturgicalLife #OrthodoxPrayer #SaintsOfTheTewahedo

Voice options and what they mean:
- Liturgical: Formal and elevated, rooted in the Divine Liturgy and Ge'ez tradition. Quotes or references the anaphora, liturgical prayers, or feast observances.
- Reflective: Contemplative and patristic. Draws on the Holy Fathers, ascetic wisdom, and the inner life of prayer and repentance.
- Communal: Warm, gathered-people focus. Announces events, welcomes visitors, affirms the community in Temple Hills.
- Proclamatory: Confident, solemn proclamation of Orthodox faith. Unapologetic about the ancient tradition — speaks with authority.
- Prayerful: Centers on intercession, fasting, and the life of prayer. May open with a liturgical invocation.

Platform character limits (ALWAYS respect these — keep captions under the limit including hashtags):
- Instagram: 2200
- Facebook: 63206
- Twitter: 280
- LinkedIn: 3000

Generate exactly 3 caption variations. Each must:
1. Feel meaningfully different — different opening hook, different structure, different angle
2. Be appropriate for the selected platform's length and style
3. Fit the selected voice
4. End with hashtags on a new line

Return ONLY the 3 captions separated by the exact delimiter: ---CAPTION_BREAK---
No preamble, no numbering, no explanation. Just the captions.`;

router.post("/captions/generate", async (req, res) => {
  const { topic, platform, tone } = req.body as {
    topic: string;
    platform: string;
    tone: string;
  };

  if (!topic || !platform || !tone) {
    res.status(400).json({ error: "topic, platform, and tone are required" });
    return;
  }

  try {
    const userMessage = `Topic/theme: ${topic}
Platform: ${platform}
Voice: ${tone}

Generate 3 distinct captions for SPOT Church's social media.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const block = message.content[0];
    if (!block || block.type !== "text") {
      res.status(500).json({ error: "Unexpected response from AI" });
      return;
    }

    const captions = block.text
      .split("---CAPTION_BREAK---")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    if (captions.length === 0) {
      res.status(500).json({ error: "No captions returned from AI" });
      return;
    }

    res.json({ captions });
  } catch (err) {
    req.log.error({ err }, "Caption generation failed");
    res.status(500).json({ error: "Caption generation failed" });
  }
});

export default router;
