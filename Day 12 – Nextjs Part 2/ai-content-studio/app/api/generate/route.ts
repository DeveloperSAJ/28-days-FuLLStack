let conversation: { role: "system" | "user" | "assistant"; content: string }[] = [
  { role: "system", content: "You are a helpful AI assistant." },
];

export async function POST(req: Request) {
  try {
    const { message } = await req.json(); // message from user

    // Add user message to conversation
    conversation.push({ role: "user", content: message });

    const HF_CHAT_URL = "https://router.huggingface.co/v1/chat/completions";

    const response = await fetch(HF_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct", // can replace with any supported model
        messages: conversation,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    console.log("HF RAW RESPONSE:", data);

    const generatedText =
      data?.choices?.[0]?.message?.content ??
      "No text generated (maybe model loading).";

    // Add AI response to conversation for context
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