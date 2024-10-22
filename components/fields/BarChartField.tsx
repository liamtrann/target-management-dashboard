import { Bar } from "react-chartjs-2";
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
  labels: string[];
  datasetLabel: string;
  data: number[];
  backgroundColor: string[];
  chartTitle: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChartField({
  labels,
  datasetLabel,
  data,
  backgroundColor,
  chartTitle,
}: BarChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data,
        backgroundColor,
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
        text: chartTitle,
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md shadow-md mx-auto w-full max-w-screen-md h-64 md:h-80 lg:h-96">
      <Bar data={chartData} options={options} />
    </div>
  );
}
