import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BigNumber } from "mathjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = ({ data }) => {
  const foo = {
    labels: data.map((_, index) => `#${index + 1}`),
    datasets: [
      {
        label: "Odhad M1 + M2",
        data: data.map((result) => (result.M_guess as BigNumber).toNumber()),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
      {
        label: "Vypočtené M1 + M2",
        data: data.map((result) => (result.M_1_2 as BigNumber).toNumber()),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  };
  return <Line data={foo} />;
};
