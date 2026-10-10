type CategoryFilterProps = {
  categories: string[];
  selected: string;
  setSelected: (category: string) => void;
};

export function CategoryFilter({
  categories,
  selected,
  setSelected,
}: CategoryFilterProps) {
  const options = ["all", ...categories];

  return (
    <div>
      <h4 className="text-white font-semibold mb-2">Categories</h4>
      <ul className="flex flex-wrap lg:flex-col gap-2">
        {options.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => setSelected(category)}
              className={`w-full text-left capitalize text-sm py-1 px-3 rounded hover:cursor-pointer ${
                selected === category
                  ? "bg-orange-500/50 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
