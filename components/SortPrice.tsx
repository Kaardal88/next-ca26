type SortProps = {
  setSortOrder: (order: string) => void;
};

export function SortPrice({ setSortOrder }: SortProps) {
  return (
    <>
    <label htmlFor="sort" className="text-white">Sort</label>
    <select
      onChange={(e) => setSortOrder(e.target.value)}
      className="w-full p-2 border rounded text-white"
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
    </>
  );
}
