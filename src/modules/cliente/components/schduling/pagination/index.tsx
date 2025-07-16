import { CheckIcon } from '@heroicons/react/24/solid';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages?: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalPages = 7 }: PaginationProps) => {
  const progressWidth = ((currentPage - 1) / (totalPages - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="relative flex justify-between items-center">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />

        <div
          className="absolute top-1/2 left-0 h-1 bg-blue-800 -translate-y-1/2 transition-all duration-500 ease-out"
          style={{ width: `${progressWidth}%` }}
        />

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isCompleted = pageNumber < currentPage;
          const isCurrent = pageNumber === currentPage;

          const getStepClasses = () => {
            if (isCurrent) {
              return 'bg-white border-2 border-blue-800 text-blue-800 font-bold scale-110';
            }
            if (isCompleted) {
              return 'bg-blue-800 border-blue-800 text-white';
            }
            return 'bg-gray-200 border-gray-200 text-gray-500';
          };

          return (
            <div key={pageNumber} className="relative z-10">
              <button
                onClick={() => setCurrentPage(pageNumber)}
                className={`
                  size-8 sm:size-10 flex items-center justify-center rounded-full
                  font-semibold text-sm transition-all duration-300 ease-in-out
                  ${getStepClasses()}
                `}
              >
                {isCompleted ? <CheckIcon className="size-5" /> : pageNumber}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;