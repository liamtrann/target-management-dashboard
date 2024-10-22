"use client";
import React, { useState } from "react";
import { Target } from "@/lib/types";
import Table from "./fields/Table";
import { headers, ITEMS_PER_PAGE_OPTIONS, statusOptions } from "@/lib/utils";
import { InputField, MotionWrapper, Pagination, SelectOption } from "./fields";

interface TargetTableProps {
  targets: Target[];
  setTargets: (targets: Target[]) => void;
}

export default function TargetTable({ targets, setTargets }: TargetTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = async (id: number, newStatus: any) => {
    const updatedTargets = targets.map((target) =>
      target.id === id ? { ...target, pipelineStatus: newStatus } : target
    );
    setTargets(updatedTargets);

    // do with backend
    // const response = await fetch(`/api/targets`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ id, newStatus }),
    // });

    // if (response.ok) {
    //   const updatedTargets = targets.map((target) =>
    //     target.id === id ? { ...target, pipelineStatus: newStatus } : target
    //   );
    //   setTargets(updatedTargets);
    // } else {
    //   const errorData = await response.json();
    //   console.error("Failed to update status:", errorData.message);
    // }
  };

  // Filter targets based on the search query
  const filteredTargets = targets.filter((target) =>
    target.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredTargets.length / itemsPerPage);

  // Get the current page's targets
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTargets = filteredTargets.slice(startIndex, endIndex);

  return (
    <div>
      {/* Search Input Field */}
      <InputField
        placeholder="Search by name"
        value={searchQuery}
        onChange={setSearchQuery}
        className="mb-4"
      />

      <MotionWrapper key={currentPage}>
        <Table
          headers={headers}
          rows={currentTargets}
          renderCell={(target, key) => {
            if (key === "lastUpdated") {
              return new Date(target.lastUpdated).toLocaleDateString();
            }
            if (key === "markets") {
              return target.markets.join(", ");
            }
            if (key === "pipelineStatus") {
              return (
                <SelectOption
                  options={statusOptions}
                  onChange={(value) => handleStatusChange(target.id, value)}
                  value={
                    target.pipelineStatus === null
                      ? "Null"
                      : target.pipelineStatus
                  }
                />
              );
            }
            return target[key];
          }}
        />
      </MotionWrapper>

      <div className="mt-4 flex justify-between items-center">
        <SelectOption
          options={ITEMS_PER_PAGE_OPTIONS.map((option) => ({
            value: option,
            label: `${option}`,
          }))}
          onChange={(value) => setItemsPerPage(Number(value))}
          value={itemsPerPage}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
