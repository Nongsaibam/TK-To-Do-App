import { FiClipboard } from 'react-icons/fi';

function Ring({ color, value }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center gap-4">
      <svg viewBox="0 0 120 120" className="h-[92px] w-[92px] -rotate-90 sm:h-[110px] sm:w-[110px]">
        <circle cx="60" cy="60" r={radius} stroke="#e5e7eb" strokeWidth="12" fill="transparent" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[92px] items-center justify-center text-sm font-semibold text-[#111827] sm:h-[110px]">
        {value}%
      </div>
    </div>
  );
}

export default function TaskStatusChart({ analytics }) {
  const total = analytics?.total || 0;
  const percent = (count) => (total ? Math.round((count / total) * 100) : 0);
  const items = [
    { label: 'Completed', value: percent(analytics?.completed || 0), color: '#166534' },
    { label: 'In Progress', value: percent(analytics?.inProgress || 0), color: '#374151' },
    { label: 'Not Started', value: percent(analytics?.notStarted || 0), color: '#991b1b' },
  ];

  return (
    <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-6">
      <div className="mb-5 flex items-center gap-3 sm:mb-8">
        <FiClipboard className="text-lg text-[#6b7280]" />
        <h3 className="text-lg font-semibold text-[#111827]">Task Status</h3>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-3 sm:gap-6">
        {items.map((item) => (
          <div key={item.label} className="relative flex flex-col items-center">
            <Ring color={item.color} value={item.value} />
            <div className="mt-1 flex items-center gap-2 text-sm text-[#374151]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
