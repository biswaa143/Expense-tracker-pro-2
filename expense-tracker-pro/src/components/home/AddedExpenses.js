import {
  Box,
  Card,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
} from "@mui/material";
import React from "react";
import Container from "@mui/material/Container";
import ExpenseDetail from "./ExpenseDetail";
import { useSelector } from "react-redux";

const AddedExpenses = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const isDarkThemeEnabled = useSelector((state) => state.theme.isDarkThemeEnabled);

  const expenseArray = [];

  for (const key in expenses) {
    expenseArray.push(expenses[key]);
  }

  let bgColor = "initial";
  let textColor = "initial";
  if (isDarkThemeEnabled) {
    bgColor = "rgba(0, 0, 0, 0.5)";
    textColor = "white";
  }

  return (
    <Box mt="2rem" mb="1rem">
      <Container maxWidth="lg">
        <Card
          sx={{
            borderRadius: "20px",
            boxShadow: "0 0 15px grey",
            p: "1rem",
            bgcolor: bgColor,
          }}
        >
          <TableContainer>
            <Table>
              <TableHead sx={{ th: { fontWeight: "bold", color: textColor } }}>
                <TableRow>
                  <TableCell>Expense Description</TableCell>
                  <TableCell>Expense Amount</TableCell>
                  <TableCell>Expense Category</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Edit / Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenseArray.map((expense) => {
                  return (
                    <ExpenseDetail
                      description={expense.description}
                      amount={expense.amount}
                      category={expense.category}
                      id={expense.id}
                      key={expense.id}
                      dateTime={expense.dateTime}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Box>
  );
};

export default AddedExpenses;
