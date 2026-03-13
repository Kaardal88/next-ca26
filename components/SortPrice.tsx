type SortProps = {
  setSortOrder: (order: string) => void;
};

export function SortPrice({ setSortOrder }: SortProps) {
  return (
    <select
      onChange={(e) => setSortOrder(e.target.value)}
      className="mb-4 p-2 border rounded"
    >
      <option value="default" className="text-gray-500">
        Sort by Price
      </option>
      <option value="asc" className="text-gray-500">
        Low to High
      </option>
      <option value="desc" className="text-gray-500">
        High to Low
      </option>
    </select>
  );
}
