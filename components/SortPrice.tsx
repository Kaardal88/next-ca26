type SortProps = {
  setSortOrder: (order: string) => void;
};

export function SortPrice({ setSortOrder }: SortProps) {
  return (
    <select
      onChange={(e) => setSortOrder(e.target.value)}
      className="mb-4 mt-8 p-2 border rounded text-white max-w-xs"
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
