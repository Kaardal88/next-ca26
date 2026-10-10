export function SearchBar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  return (
    <>
    <label htmlFor="search" className="text-white">Search</label>
    <input
      type="text"
      placeholder="Search products..."
      className="w-full p-2 border rounded text-white bg-gray-800"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    </>
  );
}
