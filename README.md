# Chatbot de Atención Clínica

Este proyecto es un chatbot de atención primaria desarrollado con Next.js y React. El asistente guía a los pacientes según sus síntomas o consultas, recomendando el especialista adecuado o los pasos a seguir antes de agendar una cita. Además, detecta posibles emergencias y sugiere acudir a una unidad de salud.

## Descripción general

El chatbot simula un primer nivel de orientación clínica para ayudar al usuario a identificar a qué especialista acudir o qué acción tomar, sin emitir diagnósticos ni recetas médicas.

El sistema está compuesto por:
- Frontend en Next.js (React)
- API interna en `/api/chat`
- Servidor backend en Express
- Integración opcional con modelos NLP de Hugging Face
- Interfaz de chat responsive y accesible

## Requisitos previos

- Node.js 18 o superior  
- Gestor de paquetes: npm, yarn, pnpm o bun  
- Git  
- Clave de API de Hugging Face (opcional)

## Instalación y configuración

Clonar el repositorio:

```bash
git clone https://github.com/usuario/chatbot-clinico.git
cd chatbot-clinico
```

Crear archivo de variables de entorno en la raíz:

```env
HF_API_KEY=tu_clave_de_huggingface
HF_MODEL=nombre_del_modelo
```

## Dependencias principales

- next — framework principal  
- react y react-dom — interfaz  
- express — servidor backend  
- cors — comunicación frontend/backend  
- dotenv — variables de entorno  
- node-fetch — peticiones a Hugging Face  

## Ejecución en desarrollo

Iniciar Next.js:

```bash
npm run dev
```

Disponible en: http://localhost:3000

Si se usa servidor Express separado:

```bash
node server/index.js
```

## Estructura del proyecto

```
src/
  app/
    components/
      ChatWindow.jsx
      MessageList.jsx
      MessageInput.jsx
    hooks/
      useChat.js
    api/
      chat/
        route.js
server/
  index.js
  services/
    huggingface.js
public/
.env.example
package.json
README.md
```

- components: interfaz del chat  
- hooks: lógica y comunicación  
- api/chat: endpoint entre frontend y backend  
- server: Express e integración con Hugging Face  
- public: recursos estáticos  

## API `/api/chat`

POST `/api/chat`

Request:

```json
{
  "sessionId": "usuario-123",
  "message": "Me duele la cabeza",
  "metadata": { "locale": "es", "ageRange": "30-39" }
}
```

Response:

```json
{
  "sessionId": "usuario-123",
  "reply": "Podría ser migraña. Consulta con un neurólogo o médico general.",
  "intent": "orientacion_general",
  "specialist": "neurología",
  "emergency": false,
  "confidence": 0.87
}
```

Error:

```json
{ "error": "Descripción del error" }
```

Prueba rápida:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test-1","message":"Me duele la cabeza"}'
```

## Funcionalidades

- Mensaje de bienvenida automático  
- Envío y recepción de mensajes en tiempo real  
- Respuestas breves (máximo dos frases)  
- Orientación a especialistas (general, ginecología, cardiología, dermatología, psicología)  
- Detección de posibles emergencias  
- Información administrativa (horarios, seguros, documentos)  
- Interfaz responsive y accesible  
- Registro mínimo de sesión para contexto conversacional  

## Ejemplos de interacción

Usuario: Me duele la cabeza constantemente.  
Bot: Podría ser migraña. Consulta con un neurólogo o médico general.

Usuario: Tengo fiebre alta por más de tres días.  
Bot: Eso es una urgencia, acude de inmediato a una unidad de salud.

Usuario: ¿Cuándo debo consultar a un dermatólogo?  
Bot: Cuando tengas problemas en la piel como manchas o irritaciones.

Usuario: ¿Cuáles son los horarios de atención?  
Bot: De lunes a viernes de 8:00 a 17:00.

Usuario: Me siento muy estresado últimamente.  
Bot: Puedes hablar con un psicólogo para apoyo emocional.

Usuario: ¿La clínica acepta seguros médicos privados?  
Bot: Sí, aceptamos seguros médicos privados.

## Uso de GitHub Copilot

Se utilizó GitHub Copilot para acelerar la creación de componentes React, hooks y funciones de comunicación con la API. Sus sugerencias se adaptaron manualmente para cumplir requisitos clínicos como respuestas breves, orientación sin diagnóstico y detección de emergencias.

Ejemplo:

```jsx
const sendUserMessage = async (text) => {
  const userMsg = { id: Date.now(), sender: "user", text };
  setMessages((m) => [...m, userMsg]);

  const reply = await sendMessageToAI(text);

  const botMsg = { id: Date.now() + 1, sender: "bot", text: reply };
  setMessages((m) => [...m, botMsg]);
};
```

## Manejo de errores y límites

El backend debe implementar timeouts y reintentos limitados al llamar a servicios externos, registrar errores con un logger configurable y no exponer trazas al cliente. También se recomienda rate limiting y manejo adecuado de códigos HTTP.

## Pruebas realizadas

Se realizaron pruebas manuales con síntomas comunes, persistentes, posibles urgencias, consultas administrativas y orientación psicológica. Se verificó que el chatbot responda en máximo dos frases, sugiera el especialista adecuado, detecte palabras clave de emergencia y mantenga coherencia.

## Privacidad y limitaciones médicas

El chatbot ofrece orientación informativa y no sustituye la consulta médica profesional. No almacenar datos sensibles sin consentimiento. Si se registran conversaciones, anonimizar identificadores y cumplir normativa de protección de datos. Incluir aviso legal y consentimiento en la interfaz.

## Despliegue

Despliegue recomendado en Vercel: importar repositorio desde GitHub, configurar variables HF_API_KEY y HF_MODEL y desplegar. Cada actualización en la rama principal genera despliegue automático.

## Tecnologías utilizadas

Next.js  
React  
Node.js  
Express  
Hugging Face Inference API  
GitHub Copilot  

## Recursos

https://nextjs.org/docs  
https://nextjs.org/learn  
https://github.com/features/copilot  
https://huggingface.co/docs/api-inference