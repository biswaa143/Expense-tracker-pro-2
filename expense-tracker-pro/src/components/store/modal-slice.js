import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAddExpense: false,
  showPopUpAlert: false,
  popUpDetails: {
    message: "",
    severity: "info",
  },
  expenseToBeEdited: {
    description: "",
    amount: "",
    category: "",
    dateTime: "",
  },
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    addExpenseHandler(state) {
      state.showAddExpense = !state.showAddExpense;
    },
    editExpenseHandler(state, actions) {
      state.expenseToBeEdited = {
        id: actions.payload.id,
        description: actions.payload.description,
        amount: actions.payload.amount,
        category: actions.payload.category,
        dateTime: actions.payload.dateTime,
      };
    },
    popUpAlertHandler(state, actions) {
      state.showPopUpAlert = !state.showPopUpAlert;
      state.popUpDetails = {
        message: actions.payload.message,
        severity: actions.payload.severity,
      };
    },
  },
});

export default modalSlice.reducer;
export const modalActions = modalSlice.actions;
