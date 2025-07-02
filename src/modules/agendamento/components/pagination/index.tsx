import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";


interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex flex-row items-center justify-end gap-2 mt-10">
        <button 
          className="w-8 h-8 p-1 border-gray-200 border rounded-md flex items-center justify-center cursor-pointer"
          onClick={() => onPageChange(1)}
        >
          <ChevronDoubleLeftIcon className="size-6 text-slate-600"/>
        </button>
        {Array.from({length: totalPages}).map((_, index) => {
          let pageNumber;
          if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }
          
          return (
            <button 
              key={index} 
              className="w-8 h-8 p-1 border-gray-200 border rounded-md flex items-center justify-center cursor-pointer"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button 
          className="w-8 h-8 p-1 border-gray-200 border rounded-md flex items-center justify-center cursor-pointer"
          onClick={() => onPageChange(totalPages)}
        >
          <ChevronDoubleRightIcon className="size-6 text-slate-600"/>
        </button>
      </div>
  )
}

export default Pagination;