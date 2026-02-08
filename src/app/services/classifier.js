import specialties from "../data/specialties.json";
import faqs from "../data/faqs.json";

//Agregar respuestas  

function normalize(text) {
  return text.toLowerCase();
}

function detectAlarm(text) {
  const alarms = [
    "dolor intenso en el pecho",
    "dificultad para respirar",
    "pérdida de conciencia",
    "sangrado abundante"
  ];
  const n = normalize(text);
  return alarms.some(a => n.includes(a));
}

function findMatches(text) {
  const normalized = normalize(text);
  const matches = [];
  for (const spec of specialties) {
    for (const kw of spec.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        matches.push(spec);
        break;
      }
    }
  }
  return matches;
}

export async function classifyMessage(text) {
  if (!text) return "Por favor describe tus síntomas o pregunta.";
  const lower = normalize(text);

  // Responder a saludos
  const saludos = ["hola", "buenos días", "buenas tardes", "buenas noches", "qué tal", "Hola","Holi","holi","ola","buenas","buenas!","Buenas!","Buenas!"];
  if (saludos.some(s => lower.includes(s))) {
    return "¡Hola! Soy tu asistente de la clínica. ¿Cómo te encuentras hoy?";
  }



  // Responder FAQs simples
  for (const f of faqs) {
    if (lower.includes(f.question.toLowerCase().replace(/[¿?]/g, ""))) {
      return f.answer;
    }
  }

  // Detectar alarma
  if (detectAlarm(text)) {
    return "Detecto signos de alarma. Por favor acude a urgencias inmediatamente o llama a emergencias.";
  }

  const matches = findMatches(text);
  if (matches.length === 0) {
    return "No estoy seguro del especialista exacto. Recomiendo Medicina General para evaluación inicial. ¿Quieres que te haga preguntas para precisar?";
  }

  const primary = matches[0];
  let reply = `Según lo que describes, lo más indicado sería: ${primary.name}.\n\n${primary.description}\n\nPasos previos: - Anotar inicio y evolución de síntomas; - Registrar medicamentos y alergias; - Tomar fotos si aplica.`;
  if (matches.length > 1) {
    const others = matches.slice(1).map(s => s.name).join(", ");
    reply += `\nTambién podría estar relacionado con: ${others}.`;
  }
  return reply;
}