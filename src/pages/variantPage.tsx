import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getVariants } from "../http/functions";
import { IVariant } from "./lib/VariantInterface";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ListWells } from "../components/listWells";
import { redirect, useSearchParams } from "react-router-dom";
import { ListReports } from "../components/listReports";

function VariantPage() {
  const [menuItems, setMenuItems] = useState<IVariant[]>([]);
  const [choosenVar, setChoosenVar] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getVariants().then((data) => {
      setChoosenVar(data[0].projectId);
      setMenuItems(data);
      setLoading(false);
    });
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
    justifyContent: "center",
  }));

  const handleClick = (projectId: string) => {
    setChoosenVar(projectId);
    // todo: here provide params for ListEvents
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="firstcomp" style={{ margin: 0 }}>
      <AppBar position="static">
        <StyledToolBar>
          <Box>
            {menuItems.map((page) => (
              <Button
                key={page.projectId}
                onClick={(e) => handleClick(page.projectId)}
              >
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
        <ListWells projectId={choosenVar}></ListWells>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar sx={{ marginLeft: "auto" }} />
        </LocalizationProvider>
      </StyledContainerDiv>

      <ListReports></ListReports>
    </div>
  );
}

export default VariantPage;
