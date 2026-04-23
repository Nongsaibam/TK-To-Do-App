import { FiCpu, FiMic, FiTarget, FiZap } from 'react-icons/fi';

export default function AIWorkspaceHero({ automationScore }) {
  return (
    <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-5 text-[#111827]">
      <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr] xl:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-1.5 text-xs font-semibold text-[#374151]">
            <FiCpu />
            AI Workspace 2.0
          </div>
          <h1 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight">
            Smart copilot for planning, risk checks, and daily task guidance.
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-[6px] bg-[#111827] px-2.5 py-1.5 text-xs font-semibold text-white">Voice</span>
            <span className="rounded-[6px] border border-[#e5e7eb] px-2.5 py-1.5 text-xs font-semibold text-[#374151]">Standup</span>
            <span className="rounded-[6px] border border-[#e5e7eb] px-2.5 py-1.5 text-xs font-semibold text-[#374151]">Risk</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#6b7280]"><FiZap /> Automation</div>
            <p className="mt-2 text-2xl font-semibold">{automationScore}%</p>
          </div>
          <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#6b7280]"><FiMic /> Voice</div>
            <p className="mt-2 text-lg font-semibold">Ready</p>
          </div>
          <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#6b7280]"><FiTarget /> Planning</div>
            <p className="mt-2 text-lg font-semibold">Risk-aware</p>
          </div>
        </div>
      </div>
    </section>
  );
}
