import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Buttons from "./Buttons";

const Header = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.8)",
          borderBottom: "2px solid black",
          boxShadow: "0 5px 10px grey",
        }}
      >
        <Toolbar>
          <Typography variant="h5" component="h1" color="inherit" fontWeight="bold">
            Expense Tracker
          </Typography>
          <Box ml="auto">
            <Buttons />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
