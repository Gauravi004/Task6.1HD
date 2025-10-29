import React, { useState } from 'react';

import { callAssistant } from './api';

import './AssistantPane.css';

export default function AssistantPane() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!prompt.trim()) return;
    setLoading(true);
    setReply('');
    try {
      const { text } = await callAssistant(prompt);
      setReply(text);
    } catch (e) {
      console.error(e);
      setReply(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="assistant-pane">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        placeholder="Describe the bug or ask for help..."
        className="assistant-input"
      />

      <div className="assistant-actions">
        <button onClick={handleSend} disabled={loading} className="assistant-button">
          {loading ? 'Loading...' : 'Ask Assistant'}
        </button>
      </div>

      <div className="assistant-response">
        <strong>Response:</strong>
        <div className="assistant-reply">
          {loading ? 'Thinking...' : reply}
        </div>
      </div>
    </div>
  );
}
