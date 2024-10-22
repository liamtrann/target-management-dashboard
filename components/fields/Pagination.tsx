// components/fields/Pagination.tsx
import React from "react";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages === 0) return null;

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          onClick={() => onPageChange(index + 1)}
          variant={index + 1 === currentPage ? "primary" : "secondary"}
          disabled={index + 1 === currentPage}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
