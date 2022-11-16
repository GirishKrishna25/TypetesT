import React from "react";
import { Line } from "react-chartjs-2"; // to create a line graph.
// we have to register these elements otherwise we'll get errors because we are using two modules to make a graph
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
import { useTheme } from "../context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ graphData }) => {
  const { theme } = useTheme();
  return (
    <div>
      <Line
        data={{
          // x-axis
          labels: graphData.map((i) => i[0] + 1),
          // y-axis
          datasets: [
            {
              data: graphData.map((i) => i[1]),
              label: "WPM",
              borderColor: theme.title,
            },
          ],
        }}
      ></Line>
    </div>
  );
};

export default Graph;
