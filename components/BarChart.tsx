import { StatusCounts, Target } from "@/lib/types";
import { BarChartField } from "./fields";
interface BarChartProps {
  targets: Target[];
}

export default function BarChart({ targets }: BarChartProps) {
  const statusCounts: StatusCounts = targets.reduce(
    (counts: StatusCounts, target: Target) => {
      const status = target.pipelineStatus ?? "Null";
      if (status in counts) {
        counts[status as keyof StatusCounts]++;
      }
      return counts;
    },
    { Hot: 0, Active: 0, Passed: 0, Cold: 0, Closed: 0, Null: 0 }
  );

  // Prepare the data to pass to BarChartField
  const labels = ["Hot", "Active", "Passed", "Cold", "Closed", "Null"];
  const data = [
    statusCounts.Hot,
    statusCounts.Active,
    statusCounts.Passed,
    statusCounts.Cold,
    statusCounts.Closed,
    statusCounts.Null,
  ];
  const backgroundColor = ["red", "blue", "yellow", "green", "pink", "gray"];
  const datasetLabel = "Number of Acquisition Targets";
  const chartTitle = "Acquisition Targets by Pipeline Status";

  return (
    <BarChartField
      labels={labels}
      datasetLabel={datasetLabel}
      data={data}
      backgroundColor={backgroundColor}
      chartTitle={chartTitle}
    />
  );
}
