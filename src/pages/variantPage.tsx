import { AppBar, CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getVariants } from "../http/functions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ListWells } from "../components/Well/listWells";
import { ListReports } from "../components/Reports/listReports";
import { AppBarMenuItems } from "../components/menu/AppBarMenuItems";
import {
  StyledToolBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledTypography,
  StyledContainerDiv,
} from "./variantPageStyles";
import { IVariant } from "../interfaces/IVariant";

function VariantPage() {
  const [menuItems, setMenuItems] = useState<IVariant[]>([]);
  const [selectedProject, setSelectedProject] = useState<IVariant>({
    projectId: "",
    projectName: "noData",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getVariants().then((data) => {
      setSelectedProject(data[0]);
      setMenuItems(data);
      setLoading(false);
    });
  }, []);

  const handleClick = (project: IVariant) => {
    setSelectedProject(project);
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
          <AppBarMenuItems menuItems={menuItems} handleClick={handleClick} />
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

      <StyledTypography variant="h6">
        {selectedProject.projectName}
      </StyledTypography>
      <StyledContainerDiv>
        <ListWells {...selectedProject}></ListWells>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar sx={{ marginLeft: "auto" }} />
        </LocalizationProvider>
      </StyledContainerDiv>

      <StyledTypography variant="h6">Отчёты</StyledTypography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ListReports />
      </Box>
    </div>
  );
}

export default VariantPage;
