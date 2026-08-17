# Church Caption Tool

An AI-powered social media caption generator built for the digital media team at SPOT Church (Saint Paul Ethiopian Orthodox Tewahedo Church) in Temple Hills, MD.

**Live app:** https://church-caption-tool--woldegrimasammy.replit.app

## The problem

The church's digital media team is three people supporting an audience of 122,000+ Instagram followers and over 5 million TikTok likes. Every sermon clip, feast day post, and event announcement needed a caption written from scratch, across three platforms with different character limits and tone expectations.

That was one to two hours a week of repetitive writing, and it was usually the thing that delayed a post going out.

## What it does

Takes a sermon title, feast day, or event description and generates caption options tailored to Instagram, TikTok, and YouTube.

- Generates multiple caption options per submission so the team can pick rather than edit
- Respects platform-specific character limits and hashtag conventions
- Writes in the church's actual voice — the system prompt is grounded in the Tewahedo tradition, Ge'ez liturgy, and the specific tone the congregation responds to
- Includes a feast day calendar to suggest caption topics
- Regenerate produces genuinely different output each time rather than filling in a template

## How it works

Every generation calls the Anthropic Claude API with a detailed system prompt that carries the church's context, voice definitions, platform constraints, and hashtag rules. The API key is read from an environment variable and is never committed to the repo.

Built and deployed on Replit.

**Stack:** Node.js, TypeScript, Anthropic Claude API, Replit

## Result

Caption writing went from one to two hours a week down to under fifteen minutes. The tool is designed so a volunteer with no technical background can use it without training.

## What I'd do differently

The original scope included a scheduling calendar, an approval workflow, and a structured intake form for pastors and event coordinators to submit details. I cut all three and shipped only the caption generator, because that was the piece causing the most pain and the fastest thing to get into people's hands.

That was the right call, but it means the approval bottleneck the team had before still exists — drafts still get shared in group chats. If I picked this back up, the approval queue would be next.

I'd also add a history panel so the team can revisit and reuse past generations instead of losing them on refresh.

## Running locally

```bash
pnpm install
```

Set your Anthropic API key as an environment variable:

```bash
ANTHROPIC_API_KEY=your_key_here
```

Then start the app:

```bash
pnpm dev
```

## Author

Sammy Woldegrima
[github.com/SammyW4](https://github.com/SammyW4) · [linkedin.com/in/sammy-woldegrima](https://linkedin.com/in/sammy-woldegrima)
