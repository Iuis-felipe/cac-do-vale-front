interface IFilterProps {
  search: string | undefined;
  setSearch: (search: string | undefined) => void;
  setPage: (page: number) => void;
  handleSearch: () => void;
}

const UserFilter: React.FC<IFilterProps> = ({ search, setSearch, setPage, handleSearch }) => {
  const handleClear = () => {
    setSearch(undefined);
    setPage(1);
    handleSearch();
  }

  return (
    <div className="h-10 flex flex-row items-center">
      <input 
        type="text" 
        placeholder="Buscar usuário" 
        value={search}
        className="h-full w-[300px] px-4 rounded-l-md border border-gray-200"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="h-full px-4 cursor-pointer bg-blue-800 border-none text-white rounded-r-md" onClick={handleSearch}>
        <p className="text-sm font-semibold">Buscar</p>
      </button>
      <button className="border-none p-0 text-red-400 cursor-pointer flex flex-row items-center gap-2 ml-4" onClick={handleClear}>
        <p className="text-sm"> Limpar </p>
      </button>
    </div>
  )
}

export default UserFilter;