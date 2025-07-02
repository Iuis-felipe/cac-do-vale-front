interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({ currentPage, setCurrentPage }: PaginationProps) => {
  return (
    <div className="w-fit h-fit flex flex-row gap-4 items-center">
      {Array.from({ length: 7 }, (_, index) => (
        <button 
          className={`
            cursor-pointer w-3 h-3 bg-gray-400 rounded-full flex flex-col justify-center items-center 
            ${currentPage === index + 1 ? "bg-blue-600" : "bg-gray-400"}
          `} 
          onClick={() => setCurrentPage(index + 1)}
        >
          {currentPage === index + 1 && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full " />}
        </button>
      ))}
    </div>
  );
};

export default Pagination;