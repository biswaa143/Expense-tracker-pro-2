import Container from "@mui/material/Container";
import AddExpense from "../modals/AddExpense";
import AddedExpenses from "./AddedExpenses";
import Cards from "./Cards";
import Charts from "./charts/Charts";
import { useSelector } from "react-redux";
import NoItem from "./NoItem";

const Home = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  let addedExpenseData;

  if (Object.keys(expenses).length) {
    addedExpenseData = (
      <>
        <Charts />
        <AddedExpenses />
      </>
    );
  } else {
    addedExpenseData = <NoItem />;
  }

  return (
    <Container maxWidth="lg">
      <AddExpense />
      <Cards />
      {addedExpenseData}
    </Container>
  );
};

export default Home;
