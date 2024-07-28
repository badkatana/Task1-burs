import { AppBar, Typography, Button, Toolbar, Grid } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getCatFact, getVariants } from "../http/functions";
import IVariant from "./lib/VariantInterface";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CardWell } from "../components/cardWell";

// TODO: when info will be from axios, make a normal functions

function VariantPage() {
  const [menuItems, setMenuItems] = useState<IVariant[]>([]);
  const [textPage, setTextPage] = useState({ fact: "No one cares", length: 0 });

  useEffect(() => {
    getVariants().then((data) => {
      setMenuItems(data);
    });
    getCatFact().then((data) => setTextPage(data));
  }, []);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const StyledToolBar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    order: 2,
  }));

  const StyledContainerDiv = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
  }));

  return (
    <div className="firstcomp">
      <AppBar position="static">
        <StyledToolBar>
          <Box>
            {menuItems.map((page) => (
              <Button key={page.projectId}>
                <Typography textAlign="center" style={{ color: "white" }}>
                  {page.projectName}
                </Typography>
              </Button>
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </StyledToolBar>
      </AppBar>
      <StyledContainerDiv>
        <div>{textPage.fact}</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </StyledContainerDiv>

      <Grid container spacing={4}>
        <Grid item xs={3}>
          <CardWell wellsId={1} kustId={2077} projectId={1} />
        </Grid>
        <Grid item xs={3}>
          <CardWell wellsId={1} kustId={2077} projectId={1} />
        </Grid>
        <Grid item xs={3}>
          <CardWell wellsId={1} kustId={2077} projectId={1} />
        </Grid>
      </Grid>
    </div>
  );
}

export default VariantPage;
