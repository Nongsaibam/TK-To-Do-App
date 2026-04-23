import CardContainer from '../common/CardContainer';
import SearchBar from '../common/SearchBar';
import StatusBadge from '../common/StatusBadge';

export default function TaskListPanel({ title, tasks, query, onQueryChange }) {
  return (
    <CardContainer className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold text-slateInk">{title}</h3>
        <div className="w-full sm:max-w-xs">
          <SearchBar value={query} onChange={onQueryChange} />
        </div>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-2xl bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold text-slateInk">{task.title}</h4>
                <p className="mt-1 text-sm text-muted">{task.description}</p>
              </div>
              <StatusBadge label={task.status} />
            </div>
          </div>
        ))}
      </div>
    </CardContainer>
  );
}
