export interface Target {
  id: number;
  name: string;
  description: string;
  pipelineStatus: "Passed" | "Cold" | "Active" | "Hot" | "Closed" | null;
  markets: string[];
  lastUpdated: string;
}

export type StatusCounts = {
  Hot: number;
  Active: number;
  Passed: number;
  Cold: number;
  Closed: number;
  Null: number;
};
