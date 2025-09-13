import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";


interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePaginationPages = () => {
    if (totalPages <= 5) {
      return 1; // If total pages are 5 or less, always start from 1
    }
    
    if (currentPage <= 3) {
      return 1; // First 3 pages show 1-5
    }
    
    if (currentPage >= totalPages - 2) {
      return totalPages - 4; // Last 3 pages show (totalPages-4) to totalPages
    }
    
    return currentPage - 2; // Middle pages show 2 before and 2 after current
  };

  const pageNumber = () => {
    if (totalPages <= 5) {
      return totalPages
    }

    return 5
  }

  return (
    <div className="flex flex-row items-center justify-end gap-2 mt-10">
        <button 
          className="w-8 h-8 p-1 border-gray-200 border rounded-md flex items-center justify-center cursor-pointer"
          onClick={() => onPageChange(1)}
        >
          <ChevronDoubleLeftIcon className="size-6 text-slate-600"/>
        </button>
        {Array.from({ length: pageNumber() }).map((_, index) => {
          const modifier = handlePaginationPages()
          let pageNumber = index + modifier;
          
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