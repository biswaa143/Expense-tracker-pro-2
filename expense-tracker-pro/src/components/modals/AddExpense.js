import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import { Box, Dialog, DialogTitle, InputLabel, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { modalActions } from "../store/modal-slice";
import { expenseActions } from "../store/expense-slice";

import dayjs from "dayjs";

const AddExpense = () => {
  const showAddExpense = useSelector((state) => state.modals.showAddExpense);
  const expenseToBeEdited = useSelector((state) => state.modals.expenseToBeEdited);
  const dispatch = useDispatch();

  const initialFormData = {
    description: "",
    amount: "",
    category: "",
    dateTime: dayjs(""),
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(expenseToBeEdited);
  }, [expenseToBeEdited]);

  const formText = expenseToBeEdited.id ? "Edit Expense" : "Add Expense";

  function changeHandler(e) {
    let obj = {};

    if (e["$d"]) {
      obj = {
        ...formData,
        dateTime: e["$d"].toString(),
      };
    } else {
      obj = {
        ...formData,
        [e.target.name]: e.target.value,
      };
    }
    setFormData(obj);
  }

  function submitHandler(e) {
    e.preventDefault();

    if (!expenseToBeEdited.id) {
      dispatch(
        expenseActions.addExpense({
          ...formData,
          id: Math.random().toString().slice(2),
        })
      );
    } else {
      dispatch(
        expenseActions.editExpense({
          ...formData,
          id: expenseToBeEdited.id,
        })
      );
    }
    setFormData(initialFormData);
    dispatch(
      modalActions.editExpenseHandler({
        ...initialFormData,
        dateTime: "",
      })
    );
  }

  function onCloseHandler() {
    dispatch(modalActions.addExpenseHandler());
  }

  return (
    <>
      <Dialog
        open={showAddExpense}
        onClose={onCloseHandler}
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: "20px",
            backgroundColor: "rgb(255, 255, 255, 0.9)",
            boxShadow: "0 0 50px white",
          },
        }}
      >
        <DialogTitle>
          <Typography
            variant="h4"
            component="p"
            color="initial"
            fontWeight="bold"
            textAlign="center"
            mb="1.2rem"
          >
            {formText}
          </Typography>
        </DialogTitle>
        <Box component="form" onSubmit={submitHandler} mb="1.5rem">
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={11}>
              <TextField
                name="description"
                id="description"
                label="Expense Description"
                value={formData.description}
                onChange={changeHandler}
                type="text"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                name="amount"
                id="amount"
                label="Expense Amount"
                value={formData.amount}
                onChange={changeHandler}
                type="number"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={11}>
              <FormControl fullWidth>
                <InputLabel id="expense-category">Expense category</InputLabel>
                <Select
                  label="Expense Category"
                  name="category"
                  onChange={changeHandler}
                  value={formData.category}
                  id="expense-category"
                  labelId="expense-category"
                  required
                >
                  <MenuItem value="fuel">Fuel</MenuItem>
                  <MenuItem value="food">Food</MenuItem>
                  <MenuItem value="clothes">Clothes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDateTimePicker"]}>
                  <DemoItem label="Date">
                    <MobileDateTimePicker
                      onChange={changeHandler}
                      value={dayjs(formData.dateTime)}
                      name="dateTime"
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={11} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                sx={{ bgcolor: "#002333", p: "0.5rem 1.5rem" }}
              >
                {formText}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default AddExpense;
