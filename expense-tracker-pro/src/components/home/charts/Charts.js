import { useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";

const Charts = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  function getYearChange(yr) {
    setYear(yr);
  }

  return (
    <Container maxWidth="lg" sx={{ mt: "3rem" }}>
      <Grid container spacing={3}>
        <BarChart onYearChange={getYearChange} />
        <DoughnutChart year={year} />
      </Grid>
    </Container>
  );
};

export default Charts;
