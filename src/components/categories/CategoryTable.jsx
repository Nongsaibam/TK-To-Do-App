import CardContainer from '../common/CardContainer';

export default function CategoryTable({ categories }) {
  return (
    <CardContainer>
      <h3 className="mb-4 text-lg font-semibold text-slateInk">Categories</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Tasks</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-gray-100">
                <td className="py-3 font-medium text-slateInk">{category.name}</td>
                <td className="py-3 text-muted">{category.tasks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContainer>
  );
}
