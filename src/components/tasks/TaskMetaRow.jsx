import StatusBadge from '../common/StatusBadge';

export default function TaskMetaRow({ label, value, badge }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
      <span className="text-sm text-muted">{label}</span>
      {badge ? <StatusBadge label={value} /> : <span className="font-medium text-slateInk">{value}</span>}
    </div>
  );
}
