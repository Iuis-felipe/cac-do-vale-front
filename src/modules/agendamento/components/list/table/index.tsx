import { Fragment } from "react/jsx-runtime";
import CellItem from "../cell";
import Pagination from "../../pagination";
import TableRow from "../row";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface ITableProps {
  schedules: any[];
  loading?: boolean;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  handleActions: (id: string) => void;
}

const Table: React.FC<ITableProps> = ({ schedules, loading = false, totalPages, page, setPage, handleActions }) => {

  if (loading) {
    return (
      <div className="flex flex-row items-center justify-center">
        <ArrowPathIcon className="size-6 text-slate-600 animate-spin"/>
      </div>
    )
  }

  if(!schedules || schedules.length === 0) {
    return null
  }

  return (
    <Fragment>
      <div id='table-header' className="grid grid-cols-9 mt-10 border border-gray-200">
        <CellItem text='Nome' colSpan={2}/>
        <CellItem text='Telefone' />
        <CellItem text='Documento' />
        <CellItem text='Categoria' />
        <CellItem text='Origem' />
        <CellItem text='Horário' />
        <CellItem text='Status' />
        <CellItem text='Ações' hasBar={false} textAlign="center"/>
      </div>
      <div id='table-body'>
        {schedules.map((schedule) => (
          <TableRow key={schedule.id} data={schedule} handleActions={handleActions} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
    </Fragment>
  )
}

export default Table;