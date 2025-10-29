import AssistantPane from "../AssistantPane";
import "./AssistantPage.css";

export default function AssistantPage() {
  return (
    <div className="assistant-page">
      <h1 className="assistant-title">💬 Chat Assistant</h1>
      <p className="assistant-subtitle">
        Ask anything and get instant AI-driven guidance.
      </p>
      <AssistantPane />
    </div>
  );
}
