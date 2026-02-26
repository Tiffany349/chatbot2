import ChatWindow from "./components/ChatWindows";

console.log("TOKEN:", process.env.HF_API_KEY);

export default function Page() {
  return (
    <main>
  <div className="app-container">
    <h1>Asistente Clínica</h1>
    <ChatWindow />
  </div>
</main>
  );
};