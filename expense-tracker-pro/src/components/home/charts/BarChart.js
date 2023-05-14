import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { Box, Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid";

import { useSelector } from "react-redux";

import { useEffect, useState } from "react";

const LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const BarChart = (props) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  const isDarkThemeEnabled = useSelector((state) => state.theme.isDarkThemeEnabled);
  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    const monthlyExpenses = new Array(12).fill(0);

    for (const key in expenses) {
      const filterDate = new Date(expenses[key].dateTime);
      const filterMonth = filterDate.getMonth();
      const filterYear = filterDate.getFullYear();

      if (filterYear === year) {
        monthlyExpenses[filterMonth] += +expenses[key].amount;
      }
    }
    setMonthlyExpenses(monthlyExpenses);
  }, [year, expenses]);

  function handleYearChange(e) {
    setYear(e.target.value);
    props.onYearChange(e.target.value);
  }

  let bgColor = "initial";
  let textColor = "initial";
  if (isDarkThemeEnabled) {
    bgColor = "rgba(0, 0, 0, 0.5)";
    textColor = "white";
  }

  const barData = {
    labels: LABELS,
    datasets: [
      {
        label: "Expense Amount",
        data: monthlyExpenses,
        backgroundColor: "rgb(0, 0, 255, 1)",
        barThickness: 15,
        borderWidth: 1,
        borderColor: "grey",
        hoverBackgroundColor: "red",
      },
    ],
  };

  const barOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Your Monthly Expenses",
        color: textColor,
      },
    },

    scales: {
      x: { ticks: { color: "red" }, grid: { color: "lightgrey" } },
      y: { ticks: { color: "lime" }, grid: { color: "lightgrey" } },
    },
  };

  return (
    <Grid item xs={12} md={8}>
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 0 15px grey",
          p: "1rem",
          height: "18rem",
          bgcolor: bgColor,
          color: textColor,
        }}
      >
        <Box height="13rem">
          <Bar options={barOptions} data={barData} />
        </Box>
        <Box display="flex" justifyContent="center">
          <FormControl sx={{ mt: "0.8rem", minWidth: 200 }} size="small">
            <InputLabel id="filter-by-year" sx={{ color: "purple" }}>
              Filter by Year
            </InputLabel>
            <Select
              id="filter-by-year"
              label="Filter by Year"
              value={year}
              onChange={handleYearChange}
              sx={{ color: textColor }}
            >
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>
    </Grid>
  );
};

export default BarChart;
