export async function POST(req) {
  try {
    const { text } = await req.json();

    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Paciente: ${text}. Responde como asistente médico breve y claro.`,
        }),
      }
    );

    const data = await hfRes.json();
    console.log("HF RAW:", data);

    let reply = "";

    if (Array.isArray(data) && data.length > 0) {
      reply = data[0].generated_text;
    }

    return Response.json({
      reply: reply || "No pude generar respuesta médica.",
    });
  } catch (e) {
    console.error("API ERROR:", e);
    return Response.json({ reply: "Error del servidor IA." }, { status: 500 });
  }
}