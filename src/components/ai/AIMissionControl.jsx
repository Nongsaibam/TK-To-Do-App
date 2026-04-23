import { useMemo, useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiClipboard, FiTarget, FiZap } from 'react-icons/fi';

function priorityScore(priority) {
  if (priority === 'Extreme') return 5;
  if (priority === 'High') return 4;
  if (priority === 'Moderate') return 2;
  return 1;
}

function daysUntil(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return Math.round((date.getTime() - today.getTime()) / 86400000);
}

function buildMissionPlan(tasks) {
  const activeTasks = tasks.filter((task) => task.status !== 'Completed');
  const rankedTasks = [...activeTasks]
    .map((task) => {
      const dueIn = daysUntil(task.dueDate);
      const urgency = dueIn < 0 ? 6 : dueIn <= 1 ? 5 : dueIn <= 3 ? 3 : 1;
      const stalled = task.status === 'Not Started' ? 2 : 0;
      return {
        ...task,
        dueIn,
        aiScore: priorityScore(task.priority) + urgency + stalled,
      };
    })
    .sort((left, right) => right.aiScore - left.aiScore);

  const riskTasks = rankedTasks.filter((task) => task.dueIn < 0 || task.dueIn <= 2 || task.priority === 'Extreme');
  const sprintTasks = rankedTasks.slice(0, 3);
  const blockedCount = rankedTasks.filter((task) => task.status === 'Not Started').length;
  const automationScore = Math.min(96, 55 + riskTasks.length * 7 + blockedCount * 4);

  const planLines = sprintTasks.map((task, index) => {
    const dueText = task.dueIn < 0 ? `${Math.abs(task.dueIn)} days late` : `due in ${task.dueIn} days`;
    return `${index + 1}. ${task.title} - ${task.priority} priority, ${dueText}, owner ${task.assignee}.`;
  });

  return {
    rankedTasks,
    riskTasks,
    sprintTasks,
    automationScore,
    planText: [
      'AI Mission Plan',
      ...planLines,
      riskTasks.length
        ? `Review ${riskTasks.length} risk item${riskTasks.length > 1 ? 's' : ''} before starting new work.`
        : 'No urgent risk item detected right now.',
      blockedCount
        ? `Move ${blockedCount} not-started item${blockedCount > 1 ? 's' : ''} into progress or reschedule them.`
        : 'All active tasks have visible momentum.',
    ].join('\n'),
  };
}

export default function AIMissionControl({ tasks }) {
  const [copied, setCopied] = useState(false);
  const mission = useMemo(() => buildMissionPlan(tasks), [tasks]);

  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(mission.planText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 text-[#111827]">
      <div className="flex flex-col gap-3 border-b border-[#e5e7eb] pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-1.5 text-xs font-semibold text-[#374151]">
            <FiZap />
            Mission Control
          </div>
          <h2 className="mt-2 text-lg font-semibold">Auto-prioritized execution plan</h2>
        </div>
        <button
          type="button"
          onClick={copyPlan}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-[6px] bg-[#111827] px-3 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
        >
          {copied ? <FiCheckCircle /> : <FiClipboard />}
          {copied ? 'Copied' : 'Copy Plan'}
        </button>
      </div>

      <div className="grid gap-3 py-4 md:grid-cols-3">
        <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-[#6b7280]">
            <FiTarget />
            Top Focus
          </div>
          <p className="mt-2 truncate text-base font-semibold">{mission.sprintTasks[0]?.title || 'No active task'}</p>
        </div>
        <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-[#6b7280]">
            <FiAlertTriangle />
            Risk Items
          </div>
          <p className="mt-2 text-2xl font-semibold">{mission.riskTasks.length}</p>
        </div>
        <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-[#6b7280]">
            <FiZap />
            Automation Power
          </div>
          <p className="mt-2 text-2xl font-semibold">{mission.automationScore}%</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[8px] border border-[#e5e7eb]">
          <div className="border-b border-[#e5e7eb] px-4 py-3 text-sm font-semibold">AI Sprint Queue</div>
          <div className="divide-y divide-[#e5e7eb]">
            {mission.sprintTasks.map((task, index) => (
              <div key={task.id} className="grid gap-3 px-4 py-3 sm:grid-cols-[30px_1fr_auto] sm:items-center">
                <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#111827] text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="truncate text-sm font-semibold">{task.title}</p>
                  <p className="mt-1 text-xs text-[#6b7280]">
                    {task.status} / {task.assignee} / {task.category}
                  </p>
                </div>
                <span className="rounded-[6px] border border-[#e5e7eb] px-2.5 py-1.5 text-xs font-semibold text-[#374151]">
                  Score {task.aiScore}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
          <h3 className="font-semibold">Recommended Automation</h3>
          <div className="mt-3 space-y-2 text-sm leading-6 text-[#4b5563]">
            <p>Reminder alerts for tasks due soon.</p>
            <p>Escalate not-started extreme tasks.</p>
            <p>Morning summary from top three tasks.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
