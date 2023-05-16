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
import { ResultRecord } from "@/lib/types";
import { FC } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type ChartProps = {
  data: ResultRecord[];
};

export const Chart: FC<ChartProps> = ({ data }) => {
  return (
    <Line
      data={{
        labels: data.map((_, index) => `#${index + 1}`),
        datasets: [
          {
            label: "Odhad M1 + M2",
            data: data.map((result) =>
              (result.M_guess as BigNumber).toNumber()
            ),
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
      }}
    />
  );
};
