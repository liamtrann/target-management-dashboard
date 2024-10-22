import { Bar } from "react-chartjs-2";
import { StatusCounts, Target } from "@/lib/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface BarChartProps {
  targets: Target[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ targets }: BarChartProps) {
  const statusCounts: StatusCounts = targets.reduce(
    (counts: StatusCounts, target: Target) => {
      const status = target.pipelineStatus ?? "Null";
      if (status in counts) {
        counts[status as keyof StatusCounts]++;
      }
      return counts;
    },
    { Hot: 0, Active: 0, Passed: 0, Cold: 0, Closed: 0, Null: 0 } // initialize counts
  );

  const data = {
    labels: ["Hot", "Active", "Passed", "Cold", "Closed", "Null"],
    datasets: [
      {
        label: "Number of Acquisition Targets",
        data: [
          statusCounts.Hot,
          statusCounts.Active,
          statusCounts.Passed,
          statusCounts.Cold,
          statusCounts.Closed,
          statusCounts.Null,
        ],
        backgroundColor: ["red", "blue", "yellow", "green", "pink", "gray"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Acquisition Targets by Pipeline Status",
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md shadow-md mx-auto w-full max-w-screen-md h-64 md:h-80 lg:h-96">
      <Bar data={data} options={options} />
    </div>
  );
}
