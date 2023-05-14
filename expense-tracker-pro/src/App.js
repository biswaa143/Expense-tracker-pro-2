import Auth from "./components/auth/Auth";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import PopUpAlert from "./components/modals/PopUpAlert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginOnLoad } from "./components/store/auth-thunks";
import { getData, putData } from "./components/store/expense-thunks";
import { Box } from "@mui/material";

let firstRender = true;

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isDarkThemeEnabled = useSelector((state) => state.theme.isDarkThemeEnabled);
  const expenses = useSelector((state) => state.expenses);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(loginOnLoad());
    dispatch(getData());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    const sendPutRequest = localStorage.getItem("sendPutRequest");
    if (sendPutRequest === "true") {
      dispatch(putData(expenses));
    }
    // eslint-disable-next-line
  }, [expenses]);

  let color = "initial";
  if (isDarkThemeEnabled) {
    color = "rgba(0, 0, 0, 0.8)";
  }

  return (
    <Box sx={{ bgcolor: color, paddingBottom: "1rem", minHeight: "100vh" }}>
      <PopUpAlert />
      <Header />
      <Routes>
        {isAuthenticated && <Route path="/" element={<Home />} />}
        {!isAuthenticated && <Route path="/" element={<Navigate replace to="/auth" />} />}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Box>
  );
}

export default App;
