import { Target } from "./types";

export const statusOptions = [
  { value: "Passed", label: "Passed" },
  { value: "Cold", label: "Cold" },
  { value: "Active", label: "Active" },
  { value: "Hot", label: "Hot" },
  { value: "Closed", label: "Closed" },
  { value: "Null", label: "Null" },
];

export const headers: { key: keyof Target; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "lastUpdated", label: "Last Updated" },
  { key: "markets", label: "Markets" },
  { key: "pipelineStatus", label: "Pipeline Status" },
];

export const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];
