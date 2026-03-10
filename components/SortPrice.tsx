type SortProps = {
  setSortOrder: (order: string) => void;
};

export function SortPrice({ setSortOrder }: SortProps) {
  return (
    <select
      onChange={(e) => setSortOrder(e.target.value)}
      className="mb-4 p-2 border rounded"
    >
      <option value="default">Sort by Price</option>
      <option value="asc">Low to High</option>
      <option value="desc">High to Low</option>
    </select>
  );
}
