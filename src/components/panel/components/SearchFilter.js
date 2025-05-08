
export default function SearchFilter({value,onInputChange,filterValue,onFilterChange,searchClick}) {

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search Name..."
        value={value}
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
        className="p-2 border rounded w-full md:w-1/2"
      />
      <select
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value={null}>Slug Optional</option>
        <option value={false}>Slug Empty</option>
        <option value={true}>Slug Set</option>
      </select>

      <button onClick={()=>{
        searchClick()
      }} className="p-2 border rounded bg-blue-600 text-white">Search</button>
    </div>
  );
}
