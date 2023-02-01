import { PaginationProps } from '../../interfaces';

export function Pagination({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationProps) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="container mx-auto flex flex-wrap justify-center pt-4 pb-8 text-gray-200">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            data-testid={`pagination-button-${index}`}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 
            font-semibold text-base
            mx-2.5 rounded-md cursor-pointer 
            duration-300 bg-transparent !bg-gray-400 border-2
            ${page === currentPage && 'text-black border-black'} `}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
