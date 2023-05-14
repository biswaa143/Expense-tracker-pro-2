import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalExpenses: 0,
  expenses: {},
  isProUser: false,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, actions) {
      state.expenses[actions.payload.id] = actions.payload;
      state.totalExpenses = totalExpenseCalulator(state.expenses);
      localStorage.setItem("sendPutRequest", true);
    },
    editExpense(state, actions) {
      state.expenses[actions.payload.id] = actions.payload;
      state.totalExpenses = totalExpenseCalulator(state.expenses);
      localStorage.setItem("sendPutRequest", true);
    },
    removeExpense(state, actions) {
      delete state.expenses[actions.payload];
      state.totalExpenses = totalExpenseCalulator(state.expenses);
      localStorage.setItem("sendPutRequest", true);
    },
    activatePro(state) {
      state.isProUser = true;
    },
    replaceExpense(state, actions) {
      state.expenses = actions.payload.expenses || {};
      state.isProUser = actions.payload.isProUser;
      state.totalExpenses = actions.payload.totalExpenses;
      localStorage.setItem("sendPutRequest", false);
    },
  },
});

function totalExpenseCalulator(expenses) {
  let totalExpense = 0;
  for (const key in expenses) {
    totalExpense += +expenses[key].amount;
  }

  return totalExpense;
}

export default expenseSlice.reducer;

export const expenseActions = expenseSlice.actions;
