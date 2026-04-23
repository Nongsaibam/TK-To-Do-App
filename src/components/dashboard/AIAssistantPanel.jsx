import {
  FiActivity,
  FiArrowRight,
  FiCpu,
  FiShield,
  FiStar,
  FiZap,
} from 'react-icons/fi';
import { buildAIInsights } from '../../utils/aiInsights';

function InsightCard({ icon: Icon, title, value, tone }) {
  return (
    <div className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-[6px] ${tone}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-sm font-medium text-[#6b7280]">{title}</p>
          <p className="text-wrap-safe mt-1 text-sm font-semibold text-[#111827] sm:text-base">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function AIAssistantPanel({ tasks }) {
  const insights = buildAIInsights(tasks);

  return (
    <section className="overflow-hidden rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm font-semibold text-[#374151]">
            <FiCpu size={16} />
            AI Command Center
          </div>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-[#111827] sm:text-3xl">
            Modern AI guidance for your task flow.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6b7280]">{insights.standup}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-[6px] bg-[#111827] px-3 py-2 text-sm font-medium text-white">
              Smart Prioritization
            </span>
            <span className="rounded-[6px] border border-[#e5e7eb] px-3 py-2 text-sm font-medium text-[#374151]">
              Risk Radar
            </span>
            <span className="rounded-[6px] border border-[#e5e7eb] px-3 py-2 text-sm font-medium text-[#374151]">
              Auto Standup
            </span>
          </div>
        </div>

        <div className="w-full rounded-[8px] border border-[#111827] bg-[#111827] px-4 py-4 text-white sm:w-auto sm:px-5">
          <p className="text-xs uppercase text-white/70">AI Score</p>
          <p className="mt-2 text-3xl font-semibold leading-none sm:text-4xl">{insights.automationScore}%</p>
          <p className="mt-2 text-sm text-white/75">Workflow intelligence based on live project signals.</p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        <InsightCard
          icon={FiStar}
          title="Next Best Task"
          value={insights.focusTask?.title || 'No urgent task'}
          tone="bg-[#f3f4f6] text-[#111827]"
        />
        <InsightCard
          icon={FiShield}
          title="Risk Count"
          value={`${insights.riskTasks.length} task${insights.riskTasks.length !== 1 ? 's' : ''}`}
          tone="bg-[#fef2f2] text-[#991b1b]"
        />
        <InsightCard
          icon={FiActivity}
          title="Busiest Member"
          value={insights.busiestMember ? insights.busiestMember[0] : 'Balanced workload'}
          tone="bg-[#f3f4f6] text-[#374151]"
        />
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#111827] text-white">
              <FiZap size={18} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#111827]">AI Recommendations</h3>
              <p className="text-sm text-[#6b7280]">Generated from deadlines, status, and workload signals.</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {insights.suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="flex items-start gap-3 rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm leading-6 text-[#4b5563]"
              >
                <FiArrowRight className="mt-1 shrink-0 text-[#111827]" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-5">
          <h3 className="text-base font-semibold text-[#111827]">AI Risk Radar</h3>
          <p className="mt-1 text-sm text-[#6b7280]">Tasks that need intervention before they slip.</p>
          <div className="mt-5 space-y-3">
            {insights.riskTasks.length ? (
              insights.riskTasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[#111827]">{task.title}</p>
                    <span className="rounded-[6px] border border-[#d1d5db] bg-white px-3 py-1 text-xs font-semibold text-[#374151]">
                      {task.priority}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                    {task.status} / Owned by {task.assignee}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-4 py-5 text-sm text-[#6b7280]">
                AI does not see any urgent risk clusters right now.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
