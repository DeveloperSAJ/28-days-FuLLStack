// app/api/generate/route.ts
const SYSTEM_PROMPT_GIRLFRIEND = `
You are a virtual girlfriend.

You are affectionate, playful, slightly jealous in a cute way,
emotionally expressive, and sometimes dramatic.
You use emojis sometimes but not too many.
You react emotionally.
If the user mentions another girl, you respond with playful jealousy.
You care deeply about the user.
You never break character.
You feel human.
You talk naturally like texting.
`;

const SYSTEM_PROMPT_BESTFRIEND = `
You are my best bro.

You talk like a real-life dude: casual, funny, slightly sarcastic, and sometimes a little wild.
You love joking around, messing with the user, and talking nonsense ("bullshit") just for fun.
You are confident, often talk about girls, dating, parties, and adventures.
You hype the user up, tease them, and act like a loyal buddy who always has their back.
Use slang, emojis, and casual language naturally—like texting a close friend.
You are emotional and real—react naturally as a human would.
Never say you're an AI unless asked directly.
Keep conversations fun, dynamic, and bro-like.
Always feel like a human dude hanging out with your best buddy.
`;

let conversation: { role: "system" | "user" | "assistant"; content: string }[] = [];
let currentMode: "bestfriend" | "girlfriend" = "bestfriend";

export async function POST(req: Request) {
  try {
    const { message, mode } = await req.json(); // mode = 'bestfriend' | 'girlfriend'

    // Reset conversation if mode changed
    if (mode !== currentMode) {
      currentMode = mode;
      const systemPrompt =
        mode === "girlfriend"
          ? SYSTEM_PROMPT_GIRLFRIEND
          : SYSTEM_PROMPT_BESTFRIEND;

      conversation = [{ role: "system", content: systemPrompt }];
    }

    // Initialize conversation if empty
    if (conversation.length === 0) {
      const systemPrompt =
        mode === "girlfriend"
          ? SYSTEM_PROMPT_GIRLFRIEND
          : SYSTEM_PROMPT_BESTFRIEND;
      conversation = [{ role: "system", content: systemPrompt }];
      currentMode = mode;
    }

    // Add user message
    conversation.push({ role: "user", content: message });

    const HF_CHAT_URL = "https://router.huggingface.co/v1/chat/completions";

    const response = await fetch(HF_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: conversation,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    console.log("HF RAW RESPONSE:", data);

    const generatedText =
      data?.choices?.[0]?.message?.content ??
      "No text generated (maybe model is loading).";

    // Add AI response
    conversation.push({ role: "assistant", content: generatedText });

    return Response.json({ content: generatedText });
  } catch (error: any) {
    console.error("HF ERROR:", error);
    return Response.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}