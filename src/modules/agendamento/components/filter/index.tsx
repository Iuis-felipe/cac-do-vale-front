import { Tooltip } from "react-tooltip";
import { FunnelIcon } from "@heroicons/react/24/outline";
import FilterCheckbox from "./checkbox";

interface IFilterProps {
  setSearch: (search: string | undefined) => void;
  setOrder: (order: string | undefined) => void;
  setPage: (page: number) => void;
  order: string | undefined;
  handleSearch: () => void;
}

const Filter: React.FC<IFilterProps> = ({ setSearch, setOrder, setPage, order, handleSearch }) => {
  const handleClear = () => {
    setSearch(undefined);
    setOrder(undefined);
    setPage(1);
    handleSearch();
  }

  return (
    <div className="h-10 flex flex-row items-center">
      <input 
        type="text" 
        placeholder="Buscar agendamento" 
        className="h-full w-[300px] px-4 rounded-l-md border border-gray-200"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="h-full px-4 cursor-pointer bg-blue-800 border-none text-white rounded-r-md" onClick={handleSearch}>
        <p className="text-sm font-semibold">Buscar</p>
      </button>
      <button className="border-none p-0 text-red-400 cursor-pointer flex flex-row items-center gap-2 ml-4" onClick={handleClear}>
        <p className="text-sm"> Limpar </p>
      </button>
      <button data-tooltip-id="order-tooltip" className="border-none p-0 text-blue-400 cursor-pointer flex flex-row items-center gap-2 ml-4">
        <FunnelIcon className="size-4"/>
        <p className="text-sm"> Ordenar </p>
      </button>
      <Tooltip
        clickable
        id="order-tooltip"
        place="bottom"
        offset={10}
        opacity={1}
        style={{ backgroundColor: "white", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex flex-col gap-2">
          <FilterCheckbox
            label="Status"
            checked={order === "status"}
            onChange={() => setOrder(order === "status" ? undefined : "status")}
          />
          <FilterCheckbox
            label="Data"
            checked={order === "dia"}
            onChange={() => setOrder(order === "dia" ? undefined : "dia")}
          />
          <FilterCheckbox
            label="Categoria"
            checked={order === "categoria"}
            onChange={() => setOrder(order === "categoria" ? undefined : "categoria")}
          />
          <FilterCheckbox
            label="Pagamento"
            checked={order === "forma_pagamento"}
            onChange={() => setOrder(order === "forma_pagamento" ? undefined : "forma_pagamento")}
          />
        </div>
      </Tooltip>
    </div>
  )
}

export default Filter;