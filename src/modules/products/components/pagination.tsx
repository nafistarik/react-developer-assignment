'use client';

interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
  onChange: (newOffset: number) => void;
}

export default function Pagination({ offset, limit, total, onChange }: PaginationProps) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page: number) => {
    onChange((page - 1) * limit);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-[var(--border)] rounded-[var(--radius)] text-[var(--foreground)] bg-[var(--background)] hover:bg-[var(--muted)] transition-base disabled:opacity-50 disabled:pointer-events-none"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let page;
        if (totalPages <= 5) {
          page = i + 1;
        } else if (currentPage <= 3) {
          page = i + 1;
        } else if (currentPage >= totalPages - 2) {
          page = totalPages - 4 + i;
        } else {
          page = currentPage - 2 + i;
        }

        const isActive = currentPage === page;

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border border-[var(--border)] rounded-[var(--radius)] transition-base ${
              isActive
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--muted)]"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-[var(--border)] rounded-[var(--radius)] text-[var(--foreground)] bg-[var(--background)] hover:bg-[var(--muted)] transition-base disabled:opacity-50 disabled:pointer-events-none"
      >
        Next
      </button>
    </div>
  );
}
