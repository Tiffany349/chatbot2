export async function classifyMessage(text) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    return data.reply;
  } catch (err) {
    console.error("Error en classifier:", err);
    return "Error al generar respuesta.";
  }
}