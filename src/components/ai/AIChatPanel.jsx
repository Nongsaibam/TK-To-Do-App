import { useEffect, useMemo, useRef, useState } from 'react';
import { FiMic, FiSend, FiVolume2 } from 'react-icons/fi';
import { buildCopilotReply, buildQuickActions } from '../../utils/aiCopilot';
import { aiApi } from '../../services/api';

const starterMessages = [
  {
    id: 1,
    role: 'assistant',
    content: 'Hi, I am your AI Copilot. Ask me for a standup summary, priority check, workload advice, or risk review.',
  },
];

export default function AIChatPanel({ tasks }) {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const listRef = useRef(null);
  const quickActions = useMemo(() => buildQuickActions(tasks), [tasks]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text) {
    const value = text.trim();
    if (!value) return;

    const userMessage = { id: Date.now(), role: 'user', content: value };
    setMessages((current) => [...current, userMessage]);
    setInput('');

    try {
      const data = await aiApi.ask(value);
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: 'assistant', content: data.answer },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: 'assistant', content: buildCopilotReply(tasks, value) },
      ]);
    }
  }

  function handleVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      sendMessage('Give me a standup summary');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      setInput(transcript);
      sendMessage(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  }

  function speakLastAnswer() {
    const latestAssistant = [...messages].reverse().find((message) => message.role === 'assistant');
    if (!latestAssistant || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(latestAssistant.content));
  }

  return (
    <section className="grid gap-4 xl:grid-cols-[0.62fr_1.38fr]">
      <div className="rounded-[8px] border border-[#e5e7eb] bg-white p-4">
        <h3 className="text-base font-semibold text-[#171717]">Copilot Modes</h3>
        <div className="mt-3 space-y-2 text-sm text-[#6b7280]">
          <div className="rounded-[8px] bg-[#f8fafc] p-3"><strong className="text-[#111827]">Standup:</strong> daily updates.</div>
          <div className="rounded-[8px] bg-[#f8fafc] p-3"><strong className="text-[#111827]">Risk:</strong> delayed work.</div>
          <div className="rounded-[8px] bg-[#f8fafc] p-3"><strong className="text-[#111827]">Workload:</strong> team balance.</div>
          <div className="rounded-[8px] bg-[#f8fafc] p-3"><strong className="text-[#111827]">Automation:</strong> reminders.</div>
        </div>
      </div>

      <div className="rounded-[8px] border border-[#e5e7eb] bg-white p-4">
        <div ref={listRef} className="h-[280px] space-y-3 overflow-y-auto rounded-[8px] bg-[#f8fafc] p-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] rounded-[8px] px-3 py-2 text-sm leading-6 ${
                message.role === 'assistant'
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'ml-auto bg-[#111827] text-white'
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => sendMessage(action)}
              className="rounded-[6px] border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs font-semibold text-[#111827] transition hover:border-[#111827]"
            >
              {action}
            </button>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') sendMessage(input);
            }}
            placeholder="Ask AI Copilot anything about your tasks..."
            className="h-10 flex-1 rounded-[6px] border border-[#e5e7eb] bg-white px-3 text-sm outline-none transition focus:border-[#111827]"
          />
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`rounded-[6px] px-3 text-white transition ${isListening ? 'bg-[#dc2626]' : 'bg-[#111827]'}`}
            title="Voice input"
          >
            <FiMic />
          </button>
          <button type="button" onClick={speakLastAnswer} className="rounded-[6px] bg-[#2563eb] px-3 text-white">
            <FiVolume2 />
          </button>
          <button type="button" onClick={() => sendMessage(input)} className="rounded-[6px] bg-[#111827] px-3 text-white">
            <FiSend />
          </button>
        </div>
      </div>
    </section>
  );
}
