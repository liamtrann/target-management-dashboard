"use client";
import { useState, useEffect } from "react";
import BarChart from "@/components/BarChart";
import TargetTable from "@/components/TargetTable";
import { Target } from "@/lib/types";
import SelectOption from "@/components/fields/SelectOption";
import { statusOptions } from "@/lib/utils";

export default function Dashboard() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchTargets = async () => {
      const response = await fetch("/api/targets");
      const data = await response.json();
      setTargets(data);
    };
    fetchTargets();
  }, []);

  const handleStatusChange = (status: string | null) => {
    setFilteredStatus(status);
  };

  const filteredTargets =
    filteredStatus === "Null"
      ? targets.filter((target) => target.pipelineStatus === null)
      : filteredStatus
      ? targets.filter((target) => target.pipelineStatus === filteredStatus)
      : targets;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Target Management Dashboard
      </h1>
      <div className=" flex justify-end mb-4">
        <label className="mr-2">Filter by Pipeline Status:</label>
        <SelectOption
          options={statusOptions}
          onChange={handleStatusChange}
          value={filteredStatus || ""}
          defaultAll={true}
        />
      </div>
      <BarChart targets={filteredTargets} />
      <div className="mb-8" />
      <TargetTable targets={filteredTargets} setTargets={setTargets} />
    </div>
  );
}
