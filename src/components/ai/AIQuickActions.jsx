import { useMemo, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { buildCopilotReply } from '../../utils/aiCopilot';

export default function AIQuickActions({ actions, tasks }) {
  const [activeAction, setActiveAction] = useState(actions[0] || '');
  const response = useMemo(
    () => (activeAction ? buildCopilotReply(tasks, activeAction) : ''),
    [activeAction, tasks]
  );

  return (
    <div className="rounded-[8px] border border-[#e5e7eb] bg-white p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#171717]">Quick AI Actions</h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-1.5 text-xs font-semibold text-[#374151]">
          <FiCheckCircle />
          Working
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => setActiveAction(action)}
            className={`rounded-[6px] border px-3 py-1.5 text-xs font-semibold transition ${
              activeAction === action
                ? 'border-[#111827] bg-[#111827] text-white'
                : 'border-[#e5e7eb] bg-[#f8fafc] text-[#111827] hover:border-[#111827]'
            }`}
          >
            {action}
          </button>
        ))}
      </div>

      {response ? (
        <div className="mt-3 rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
          <p className="text-xs font-semibold uppercase text-[#6b7280]">AI Response</p>
          <p className="mt-1 text-sm leading-6 text-[#374151]">{response}</p>
        </div>
      ) : null}
    </div>
  );
}
