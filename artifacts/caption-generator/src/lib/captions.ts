export type Platform = "Instagram" | "Facebook" | "Twitter" | "LinkedIn";
export type Tone = "Liturgical" | "Reflective" | "Communal" | "Proclamatory" | "Prayerful";

export const PLATFORM_LIMITS: Record<Platform, number> = {
  Instagram: 2200,
  Facebook: 63206,
  Twitter: 280,
  LinkedIn: 3000,
};

export const TONE_DESCRIPTIONS: Record<Tone, string> = {
  Liturgical: "Formal, rooted in the Divine Liturgy and Ge'ez tradition",
  Reflective: "Contemplative, patristic, drawing on the Holy Fathers",
  Communal: "Warm, gathered-people focus — announcements and fellowship",
  Proclamatory: "Confident Orthodox proclamation, solemn and clear",
  Prayerful: "Intercession, fasting, and the life of prayer",
};

const HASHTAG_BASE = [
  "#EthiopianOrthodox",
  "#SPOTChurch",
  "#TempleHills",
  "#Tewahedo",
  "#OrthodoxChristian",
  "#HolyTewahedo",
  "#EthiopianOrthodoxTewahedo",
];

const HASHTAG_EXTENDED = [
  "#OrthodoxFaith",
  "#DiasporaFaith",
  "#Habesha",
  "#GeezLiturgy",
  "#SundayLiturgy",
  "#FeastDay",
  "#HolyFathers",
  "#OrthodoxyInAmerica",
  "#ChristianCommunity",
  "#OrthodoxLife",
  "#TempleHillsMaryland",
  "#FaithAndFamily",
  "#OrthodoxWorship",
  "#AncientFaith",
  "#ChurchOfEthiopia",
  "#LiturgicalLife",
  "#SaintsOfTheTewahedo",
  "#OrthodoxPrayer",
];

function getHashtags(count: number): string {
  const base = [...HASHTAG_BASE];
  const extended = [...HASHTAG_EXTENDED].sort(() => 0.5 - Math.random());
  const combined = [...base, ...extended].slice(0, count);
  return combined.join(" ");
}

function truncateToPlatform(text: string, platform: Platform): string {
  const limit = PLATFORM_LIMITS[platform];
  if (text.length <= limit) return text;
  return text.slice(0, limit - 3) + "...";
}

function extractScripture(input: string): string | null {
  const regex = /\b(?:[1-3]\s)?[A-Za-z]+\s\d{1,3}:\d{1,3}\b/i;
  const match = input.match(regex);
  return match ? match[0] : null;
}

export function generateCaptions(topic: string, platform: Platform, tone: Tone): string[] {
  const scripture = extractScripture(topic);
  const baseTopic = topic.trim();

  const generateOne = (variation: number): string => {
    let text = "";

    if (tone === "Liturgical") {
      if (variation === 1) {
        text = `Glory be to God in the highest. This Sunday at SPOT Church, we gather in the ancient tradition of our fathers to receive the Holy Mysteries and lift our hearts before the Lord.\n\n${baseTopic}.\n\n${scripture ? `The Church has always held fast to this word: ${scripture}. ` : ""}Come and stand with us in the faith of the Tewahedo.\n\n${getHashtags(7)}`;
      } else if (variation === 2) {
        text = `The Divine Liturgy is not a ceremony — it is heaven on earth. We gather as the Body of Christ, rooted in the Ge'ez liturgical tradition of the Ethiopian Orthodox Tewahedo Church, to offer our praise and receive grace.\n\n${baseTopic}.\n\nJoin us at SPOT Church, Temple Hills, Maryland.\n\n${getHashtags(8)}`;
      } else {
        text = `In the words of the ancient anaphora, we cry out: Holy, Holy, Holy.\n\n${baseTopic}.\n\n${scripture ? `"${scripture}" — as proclaimed in the Sacred Scriptures received and cherished by the Tewahedo Church. ` : ""}We remain steadfast in the faith once delivered to the saints.\n\n${getHashtags(7)}`;
      }
    } else if (tone === "Reflective") {
      if (variation === 1) {
        text = `The Holy Fathers teach us that the spiritual life is a lifelong pilgrimage — never complete, always deepening.\n\n${baseTopic}.\n\n${scripture ? `Let us sit with the word of ${scripture} and allow it to form us from the inside out. ` : ""}May we grow in humility, fasting, and prayer as the tradition of our Church calls us.\n\n${getHashtags(7)}`;
      } else if (variation === 2) {
        text = `Pause. Return to the center.\n\n${baseTopic}.\n\nThe Ethiopian Orthodox Tewahedo Church has preserved an unbroken stream of patristic wisdom for over sixteen centuries. In that tradition we find not rules, but a way of life — a path of repentance and renewal.\n\n${scripture ? `Reflect on ${scripture} today. ` : ""}${getHashtags(6)}`;
      } else {
        text = `There is a quietness in the Orthodox life that the world does not understand — a stillness that comes not from the absence of struggle, but from the presence of God.\n\n${baseTopic}.\n\n${scripture ? `${scripture} speaks to this. ` : ""}May your heart be still and know.\n\n${getHashtags(6)}`;
      }
    } else if (tone === "Communal") {
      if (variation === 1) {
        text = `Dear SPOT Church family — we are glad you are here.\n\n${baseTopic}.\n\nWhether you are a long-time member of our community or joining us for the first time, there is a place for you among us. We gather as one body, one faith, one baptism.\n\nTemple Hills, Maryland — come as you are.\n\n${getHashtags(7)}`;
      } else if (variation === 2) {
        text = `Community is not optional in the life of faith — it is essential. The Tewahedo tradition has always understood the Church as a family, not just an institution.\n\n${baseTopic}.\n\nWe are SPOT Church. We are your community in Temple Hills, Maryland. We welcome you.\n\n${getHashtags(7)}`;
      } else {
        text = `A reminder for our community: ${baseTopic}.\n\nOur doors are open. Our table is prepared. The people of SPOT Church walk this road together — across generations, across languages, in the unity of the ancient faith.\n\n${getHashtags(6)}`;
      }
    } else if (tone === "Proclamatory") {
      if (variation === 1) {
        text = `The Ethiopian Orthodox Tewahedo Church does not merely speak of the Resurrection — she lives from it.\n\n${baseTopic}.\n\n${scripture ? `"${scripture}" — this is not a suggestion. It is the testimony of the Scriptures, received and guarded by the Holy Church. ` : ""}We proclaim it without apology.\n\n${getHashtags(8)}`;
      } else if (variation === 2) {
        text = `The faith of the Tewahedo is ancient, tested, and unyielding.\n\n${baseTopic}.\n\nFor over sixteen hundred years, the Ethiopian Orthodox Church has maintained the deposit of faith — through kingdoms, through exile, through trial. That same faith is alive and present at SPOT Church in Temple Hills today.\n\n${getHashtags(7)}`;
      } else {
        text = `We do not diminish the Gospel to make it palatable. We receive it as the Holy Fathers handed it down — full, undivided, and life-giving.\n\n${baseTopic}.\n\n${scripture ? `${scripture}. This is the word of the Lord. ` : ""}Stand firm in what you have received.\n\n${getHashtags(7)}`;
      }
    } else {
      // Prayerful
      if (variation === 1) {
        text = `Lord, have mercy. Lord, have mercy. Lord, have mercy.\n\n${baseTopic}.\n\nIn this season, may the SPOT Church community be a people of earnest prayer — holding one another before the throne of grace, fasting with sincerity, seeking the face of God with all that we are.\n\n${scripture ? `We rest on ${scripture}. ` : ""}${getHashtags(6)}`;
      } else if (variation === 2) {
        text = `The Tewahedo tradition calls us to pray without ceasing — not as a burden, but as a breath.\n\n${baseTopic}.\n\nLet us bring this before God together. The Church prays as one body. Your intercession matters. Your fast is seen.\n\n${getHashtags(7)}`;
      } else {
        text = `A prayer for our community at SPOT Church:\n\nFather of lights, in the midst of ${baseTopic}, we look to You. Guide our steps. Sanctify our homes. Strengthen our elders and protect our children. Unite us in the bond of peace and the love of the Holy Spirit.\n\n${scripture ? `We stand on Your word: ${scripture}.\n\n` : ""}${getHashtags(6)}`;
      }
    }

    return truncateToPlatform(text, platform);
  };

  return [generateOne(1), generateOne(2), generateOne(3)];
}
