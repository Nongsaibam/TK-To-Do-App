import { cn } from '../../utils/helpers';

const toneMap = {
  Completed: 'bg-emerald-100 text-emerald-700',
  'In Progress': 'bg-amber-100 text-amber-700',
  Pending: 'bg-sky-100 text-sky-700',
  'On Hold': 'bg-rose-100 text-rose-700',
  High: 'bg-rose-100 text-rose-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700',
};

export default function StatusBadge({ label, className }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
        toneMap[label] || 'bg-gray-100 text-gray-700',
        className
      )}
    >
      {label}
    </span>
  );
}
