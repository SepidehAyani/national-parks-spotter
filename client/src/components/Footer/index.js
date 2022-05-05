import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const Footer = () => {
  const makeStyles = {};
  return (
    <AppBar
      id="app-bar"
      position="fixed"
      style={{ backgroundColor: "darkgreen" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                s: "flex",
                md: "flex",
                lg: "flex",
                xl: "flex",
              },
            }}
            style={{ color: "whitesmoke" }}
          >
            Developed by <a href="https://github.com/robel-codes"> Robel</a>, <a href="https://github.com/SepidehAyani">Sepideh</a>, and <a href="https://github.com/soundproofboot">Colin</a>
          </Typography>
          <Button variant="contained" style={{ backgroundColor: 'saddlebrown', color: 'white' }}>
            <a href="https://www.nps.gov/getinvolved/donate.htm" target='_blank' rel="noreferrer">DONATE</a>
          </Button>
          <p>to the Parks Service</p>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Footer;
