interface IFilterProps {
  search: string | undefined;
  setSearch: (search: string | undefined) => void;
  handleSearch: () => void;
  handleClear: () => void;
}

const ClinicFilter: React.FC<IFilterProps> = ({ search, setSearch, handleSearch, handleClear }) => {

  return (
    <div className="h-10 flex flex-row items-center">
      <input
        type="text"
        placeholder="Buscar clínica"
        value={search}
        className="h-full w-[300px] px-4 rounded-l-md border border-gray-200"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="h-full px-4 cursor-pointer bg-blue-700 hover:bg-blue-900 transition-colors text-white rounded-r-md" onClick={handleSearch}>
        <p className="text-sm font-semibold">Buscar</p>
      </button>
      <button className="border-none p-0 text-red-400 hover:text-red-500 transition-colors cursor-pointer flex flex-row items-center gap-2 ml-4" onClick={handleClear}>
        <p className="text-sm"> Limpar </p>
      </button>
    </div>
  )
}

export default ClinicFilter;