import { Card, Grid } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DoughnutChart = ({ year }) => {
  const [categoryWiseExpenses, setCategoryWiseExpenses] = useState([]);
  const expenses = useSelector((state) => state.expenses.expenses);
  const isDarkThemeEnabled = useSelector((state) => state.theme.isDarkThemeEnabled);

  useEffect(() => {
    let food = 0,
      fuel = 0,
      clothes = 0;

    for (const key in expenses) {
      const filterYear = new Date(expenses[key].dateTime).getFullYear();

      if (filterYear === year) {
        switch (expenses[key].category) {
          case "food":
            food += +expenses[key].amount;
            break;
          case "fuel":
            fuel += +expenses[key].amount;
            break;
          case "clothes":
            clothes += +expenses[key].amount;
            break;
          default:
            break;
        }
      }
    }
    setCategoryWiseExpenses([food, clothes, fuel]);
  }, [expenses, year]);

  let bgColor = "initial";
  let textColor = "initial";
  if (isDarkThemeEnabled) {
    bgColor = "rgba(0, 0, 0, 0.5)";
    textColor = "white";
  }

  const doughnutData = {
    labels: ["food", "clothes", "fuel"],
    datasets: [
      {
        data: categoryWiseExpenses,
        backgroundColor: [
          "rgb(0, 255, 0, 0.7)",
          "rgba(99, 102, 241, 1)",
          "rgb(255, 0, 0, 0.85)",
        ],
        borderWidth: 1,
        borderColor: "grey",
        spacing: 4,
      },
    ],
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    cutout: 88,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Category wise Expenses",
        color: textColor,
      },
    },
  };

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 0 15px grey",
          p: "1rem",
          height: "18rem",
          display: "flex",
          justifyContent: "center",
          bgcolor: bgColor,
          color: textColor,
        }}
      >
        <Doughnut options={doughnutOptions} data={doughnutData} />
      </Card>
    </Grid>
  );
};

export default DoughnutChart;
