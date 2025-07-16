import { Fragment, useMemo } from "react";
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
  orderBy?: string; // Nova prop para receber a chave de ordenação
}

const Table: React.FC<ITableProps> = ({
  schedules,
  loading = false,
  totalPages,
  page,
  setPage,
  handleActions,
  orderBy,
}) => {

  const sortedSchedules = useMemo(() => {
    if (!orderBy || !schedules) {
      return schedules;
    }

    const sortableSchedules = [...schedules];

    sortableSchedules.sort((a, b) => {
      const valA = a[orderBy];
      const valB = b[orderBy];

      if (orderBy === 'dia') {
        return new Date(valA).getTime() - new Date(valB).getTime();
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB, 'pt-BR', { sensitivity: 'base' });
      }

      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });

    return sortableSchedules;
  }, [schedules, orderBy]);

  if (loading) {
    return (
      <div className="flex flex-row items-center justify-center mt-10">
        <ArrowPathIcon className="size-6 text-slate-600 animate-spin" />
      </div>
    );
  }

  if (!sortedSchedules || sortedSchedules.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">Nenhum agendamento encontrado.</p>
    );
  }

  return (
    <Fragment>
      <div id='table-header' className="grid grid-cols-9 mt-10 border border-gray-200">
        <CellItem text='Nome' colSpan={2} />
        <CellItem text='Telefone' />
        <CellItem text='Documento' />
        <CellItem text='Categoria' />
        <CellItem text='Origem' />
        <CellItem text='Data e Horário' />
        <CellItem text='Status' />
        <CellItem text='Ações' hasBar={false} textAlign="center" />
      </div>
      <div id='table-body'>
        {sortedSchedules.map((schedule) => (
          <TableRow key={schedule.id} data={schedule} handleActions={handleActions} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
    </Fragment>
  );
}

export default Table;
