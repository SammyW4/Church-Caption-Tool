export type Platform = "Instagram" | "Facebook" | "Twitter" | "LinkedIn";
export type Tone = "Inspiring" | "Conversational" | "Devotional" | "Bold" | "Gentle";

export const PLATFORM_LIMITS: Record<Platform, number> = {
  Instagram: 2200,
  Facebook: 63206,
  Twitter: 280,
  LinkedIn: 3000,
};

const HASHTAG_BANK = [
  "#ChurchLife", "#Faith", "#SundayService", "#WordOfGod", "#GodIsGood",
  "#ChristianLiving", "#Ministry", "#Worship", "#Scripture", "#Community",
  "#Hope", "#Grace", "#Jesus", "#BibleStudy", "#SpiritualGrowth",
  "#Encouragement", "#PrayWithoutCeasing", "#LoveGodLovePeople", "#FaithJourney"
];

function getRandomHashtags(count: number): string {
  const shuffled = [...HASHTAG_BANK].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).join(" ");
}

function truncateToPlatform(text: string, platform: Platform): string {
  const limit = PLATFORM_LIMITS[platform];
  if (text.length <= limit) return text;
  return text.slice(0, limit - 3) + "...";
}

function extractScripture(input: string): string | null {
  // Very basic scripture detection (e.g., John 3:16)
  const regex = /\b(?:[1-3]\s)?[A-Za-z]+\s\d{1,3}:\d{1,3}\b/i;
  const match = input.match(regex);
  return match ? match[0] : null;
}

export function generateCaptions(topic: string, platform: Platform, tone: Tone): string[] {
  const scripture = extractScripture(topic);
  const baseTopic = topic.trim();
  
  const generateOne = (variation: number) => {
    let text = "";
    
    if (tone === "Inspiring") {
      if (variation === 1) {
        text = `Lift up your hearts! ${baseTopic}. May you be encouraged and strengthened today as we lean into His truth.\n\n${scripture ? `As we read in ${scripture}, there is always hope to be found. ` : ''}Let's walk this journey together.\n\n${getRandomHashtags(5)}`;
      } else if (variation === 2) {
        text = `A gentle reminder for your day: ${baseTopic}. God is working in ways we cannot always see, but we can always trust His heart.\n\nHave a blessed week ahead!\n\n${getRandomHashtags(6)}`;
      } else {
        text = `Today's focus: ${baseTopic}.\n\nWhen we align our perspective with His promises, everything changes. ${scripture ? `Take a moment to reflect on ${scripture} today.` : ''}\n\nJoin us as we dive deeper into this truth!\n\n${getRandomHashtags(5)}`;
      }
    } else if (tone === "Conversational") {
      if (variation === 1) {
        text = `Hey church family! Just wanted to share a quick thought on ${baseTopic}. Sometimes we just need a moment to pause and reflect on what really matters.\n\nHow is this showing up in your life right now? Drop a comment below!\n\n${getRandomHashtags(4)}`;
      } else if (variation === 2) {
        text = `We were just talking about ${baseTopic} the other day. It is amazing how relevant this is for the season we are in. ${scripture ? `Have you read ${scripture} lately? Highly recommend.` : ''}\n\nHope everyone is having a great week so far.\n\n${getRandomHashtags(5)}`;
      } else {
        text = `Checking in with you all! We are diving into ${baseTopic} and it has been so good. If you missed Sunday, you definitely want to catch up.\n\nWhat is your biggest takeaway on this topic?\n\n${getRandomHashtags(5)}`;
      }
    } else if (tone === "Devotional") {
      if (variation === 1) {
        text = `Take a deep breath and center your heart on ${baseTopic}.\n\nIn the quiet moments, His voice is clearest. Let this truth anchor your soul today.\n\n${scripture ? `Reflect: ${scripture}\n\n` : ''}${getRandomHashtags(4)}`;
      } else if (variation === 2) {
        text = `A moment of reflection: ${baseTopic}.\n\nMay we be a people who constantly seek His face and rest in His enduring grace. Peace be with you today.\n\n${getRandomHashtags(5)}`;
      } else {
        text = `Lord, we bring before You our thoughts on ${baseTopic}. Guide our steps and renew our minds.\n\nMay your day be filled with quiet assurance of His presence.\n\n${getRandomHashtags(5)}`;
      }
    } else if (tone === "Bold") {
      if (variation === 1) {
        text = `It is time to step up! ${baseTopic}. We are not called to live in fear, but in power and love. ${scripture ? `Read ${scripture} and let it sink in.` : ''}\n\nLet's get out there and be the church!\n\n${getRandomHashtags(6)}`;
      } else if (variation === 2) {
        text = `Do not miss this truth: ${baseTopic}. The world needs what God has placed inside of you. Stand firm, stay grounded, and keep moving forward.\n\n${getRandomHashtags(5)}`;
      } else {
        text = `The message is clear: ${baseTopic}.\n\nNo more holding back. Let's embrace the calling on our lives with everything we have today.\n\n${getRandomHashtags(5)}`;
      }
    } else {
      // Gentle
      if (variation === 1) {
        text = `Sending a little extra grace your way today as we think about ${baseTopic}. It is okay to take things one step at a time. He is with you.\n\n${scripture ? `Rest in ${scripture}. ` : ''}\n\n${getRandomHashtags(4)}`;
      } else if (variation === 2) {
        text = `If your heart feels heavy, remember this: ${baseTopic}. You are deeply loved and known by the Creator.\n\nBreathe out the worry, breathe in His peace.\n\n${getRandomHashtags(5)}`;
      } else {
        text = `A soft reminder for your spirit: ${baseTopic}. You do not have to have it all together. Just come as you are to the One who holds it all.\n\n${getRandomHashtags(4)}`;
      }
    }
    
    return truncateToPlatform(text, platform);
  };
  
  return [generateOne(1), generateOne(2), generateOne(3)];
}
